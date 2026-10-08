// JSON-LD (schema.org) strony głównej — jeden @graph z encjami połączonymi przez @id.
// Wszystko liczone z content/, żeby dane strukturalne nie rozjechały się z treścią strony.
// Bez AggregateRating: dodać dopiero przy prawdziwych, weryfikowalnych opiniach.
import { appModules } from "@/content/modules";
import { faq } from "@/content/faq";
import { company, plans, seo, siteConfig } from "@/content/site";

const url = siteConfig.url;
const id = (name: string) => `${url}/#${name}`;

export function homeJsonLd() {
  const premium = plans.find((p) => p.id === "premium")!;

  const organization = {
    "@type": "Organization",
    "@id": id("organization"),
    name: siteConfig.name,
    legalName: company.legalName,
    url,
    logo: { "@type": "ImageObject", url: `${url}/brand/biuromat-logo.svg` },
    email: company.email,
    telephone: company.phone,
    taxID: company.nip,
    vatID: `PL${company.nip}`,
    identifier: [
      { "@type": "PropertyValue", propertyID: "KRS", value: company.krs },
      { "@type": "PropertyValue", propertyID: "REGON", value: company.regon },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: company.street,
      postalCode: company.postalCode,
      addressLocality: company.city,
      addressCountry: "PL",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: company.phone,
      email: company.email,
      areaServed: "PL",
      availableLanguage: "pl",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    },
    ...(seo.sameAs.length > 0 && { sameAs: seo.sameAs }),
  };

  const website = {
    "@type": "WebSite",
    "@id": id("website"),
    url,
    name: siteConfig.name,
    inLanguage: "pl-PL",
    publisher: { "@id": id("organization") },
  };

  const webpage = {
    "@type": "WebPage",
    "@id": id("webpage"),
    url: `${url}/`,
    name: seo.title,
    description: seo.description,
    inLanguage: "pl-PL",
    isPartOf: { "@id": id("website") },
    about: { "@id": id("software") },
    primaryImageOfPage: { "@type": "ImageObject", url: `${url}/opengraph-image.png` },
  };

  const software = {
    "@type": "SoftwareApplication",
    "@id": id("software"),
    name: siteConfig.name,
    url,
    description: seo.description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Program do fakturowania",
    // Aplikacja w przeglądarce (także na telefonie), bez aplikacji natywnych
    operatingSystem: "Web",
    browserRequirements: "Aktualna przeglądarka z włączonym JavaScript",
    inLanguage: "pl-PL",
    publisher: { "@id": id("organization") },
    // Tylko funkcje potwierdzone (bez `verify`)
    featureList: appModules.flatMap((m) => m.chips.filter((c) => !c.verify).map((c) => c.label)),
    offers: [
      {
        "@type": "Offer",
        name: "FREE",
        price: 0,
        priceCurrency: "PLN",
        description: "10 faktur miesięcznie, integracja z KSeF",
      },
      {
        "@type": "Offer",
        name: premium.name,
        price: premium.priceMonthly,
        priceCurrency: "PLN",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: premium.priceMonthly,
          priceCurrency: "PLN",
          unitCode: "MON",
          valueAddedTaxIncluded: false,
        },
      },
      {
        "@type": "Offer",
        name: `${premium.name} (rocznie)`,
        price: premium.priceYearly,
        priceCurrency: "PLN",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: premium.priceYearly,
          priceCurrency: "PLN",
          unitCode: "ANN",
          valueAddedTaxIncluded: false,
        },
      },
    ],
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": id("faq"),
    isPartOf: { "@id": id("webpage") },
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, webpage, software, faqPage],
  };
}

/** Bezpieczne osadzenie w <script> (zalecenie z dokumentacji Next: `<` → <). */
export const jsonLdHtml = (data: object) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
