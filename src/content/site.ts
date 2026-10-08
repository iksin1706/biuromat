// Dane globalne serwisu: nawigacja, CTA, firma, cennik.
// Zasada: tylko prawdziwe fakty o Biuromacie. Brakujące dane oznaczone TODO.

export const siteConfig = {
  name: "Biuromat",
  url: "https://biuromat.pl",
  appUrl: "https://app.biuromat.pl", // TODO: potwierdzić adres aplikacji
  description:
    "Program do faktur online z KSeF. Faktury, magazyn i produkcja w jednym miejscu.",
  locale: "pl_PL",
} as const;

/**
 * Indeksowanie przez wyszukiwarki i boty AI. Domyślnie WYŁĄCZONE (strona przed startem):
 * noindex w meta, nagłówek X-Robots-Tag i Disallow w robots.txt.
 * Włączenie: zmienna środowiskowa SITE_INDEXING=on (na Vercelu: Settings → Environment
 * Variables, potem redeploy). Ten sam warunek jest w next.config.ts.
 */
export const allowIndexing = process.env.SITE_INDEXING === "on";

/**
 * SEO strony głównej. Tytuł do ~60 znaków, opis do ~155 (dłuższe Google ucina).
 * Fraza główna „program do faktur online” + „KSeF” + „darmowy” — tak szuka się w Polsce
 * (konkurencja: Fakturownia, inFakt, iFirma, wFirma celują w te same frazy).
 */
export const seo = {
  title: "Program do faktur online z KSeF – darmowy start | Biuromat",
  description:
    "Darmowy program do faktur online z KSeF. Fakturę wystawisz w 30 sekund i wyślesz do KSeF jednym kliknięciem. Magazyn i produkcja w tym samym programie.",
  /** Profile firmy w sieci (LinkedIn, Facebook, YouTube…) — trafiają do JSON-LD `sameAs`. */
  sameAs: ["https://www.facebook.com/biuromat/", "https://www.linkedin.com/showcase/biuromat/"],
} as const;

/** Jeden główny CTA na każdej stronie — zawsze ta sama etykieta. */
export const primaryCta = {
  label: "Załóż darmowe konto",
  href: `${siteConfig.appUrl}/rejestracja`, // TODO: właściwa ścieżka rejestracji
  microcopy: ["Bez karty płatniczej", "10 faktur miesięcznie za 0 zł"],
} as const;

export const loginLink = {
  label: "Zaloguj",
  href: `${siteConfig.appUrl}/logowanie`, // TODO
} as const;

// Dane rejestrowe ze stopki i FAQ obecnej strony biuromat.pl.
export const company = {
  legalName: "Solvsoft sp. z o.o.",
  krs: "0000869057",
  nip: "8133846970",
  regon: "387492546",
  city: "Rzeszów",
  street: "ul. Klementyny Hoffmanowej 19/34",
  postalCode: "35-116",
  address: "ul. Klementyny Hoffmanowej 19/34, 35-116 Rzeszów",
  email: "kontakt@biuromat.pl",
  phone: "+48 17 77 96 301",
  supportHours: "pn–pt 9–17",
} as const;

export type NavLink = { label: string; href: string };

/** Nawigacja — kotwice do sekcji strony głównej (bez osobnych podstron). */
export const mainNav: NavLink[] = [
  { label: "Funkcje", href: "/#moduly" },
  { label: "Dla kogo", href: "/#dla-kogo" },
  { label: "Jak to działa", href: "/#jak-to-dziala" },
  { label: "KSeF", href: "/#ksef" },
  { label: "Cennik", href: "/#cennik" },
  { label: "FAQ", href: "/#faq" },
];

/** Dokumenty prawne — istniejące strony serwisu. */
export const legalLinks: NavLink[] = [
  { label: "Regulamin", href: "/regulamin/" },
  { label: "Polityka prywatności", href: "/polityka-prywatnosci/" },
  { label: "Regulamin powierzenia", href: "/regulamin-powierzenia/" },
];

export type Plan = {
  id: "free" | "premium" | "enterprise";
  name: string;
  priceMonthly: number | null; // netto, zł
  priceYearly: number | null;
  note: string;
  featured?: boolean;
};

export const plans: Plan[] = [
  { id: "free", name: "FREE", priceMonthly: 0, priceYearly: 0, note: "10 faktur miesięcznie" },
  {
    id: "premium",
    name: "Premium",
    priceMonthly: 5,
    priceYearly: 50,
    note: "netto / mies.",
    featured: true,
  },
  { id: "enterprise", name: "Enterprise", priceMonthly: null, priceYearly: null, note: "wycena indywidualna" },
];
