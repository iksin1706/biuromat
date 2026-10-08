import Link from "next/link";
import { ChevronRight, Mail, Phone, Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getSection } from "@/content/home";
import { faq, faqSection } from "@/content/faq";
import { company } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

// Komponent serwerowy na natywnym <details>: odpowiedzi są w HTML także zwinięte
// (wyszukiwarki i crawlery AI nie wykonują kliknięć), działa bez JS.
export function Faq() {
  const meta = getSection("faq");

  return (
    <Section id={meta.id} tone={meta.tone} aria-labelledby={`${meta.id}-title`}>
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 id={`${meta.id}-title`} className="text-h2">
            {faqSection.title}
          </h2>
          <p className="mt-4 text-lead text-muted-foreground">{faqSection.subtitle}</p>
          <ul className="mt-8 space-y-3 text-[0.9375rem]">
            <li>
              <a
                href={`tel:${company.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2.5 font-semibold hover:text-link"
              >
                <Phone className="size-4 text-link" aria-hidden />
                {company.phone}
                <span className="font-normal text-muted-foreground">· {company.supportHours}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2.5 font-semibold hover:text-link">
                <Mail className="size-4 text-link" aria-hidden />
                {company.email}
              </a>
            </li>
          </ul>
          <Link
            href={faqSection.all.href}
            className="group mt-8 inline-flex items-center gap-1 font-semibold text-link"
          >
            {faqSection.all.label}
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </Reveal>

        {/* Pytania wyłaniają się po kolei przy przewinięciu; linie podziału jadą razem z nimi */}
        <Stagger delay={0.1}>
          {faq.map((item) => (
            <StaggerItem key={item.q} className="border-b border-border first:border-t">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg leading-snug font-semibold transition-colors hover:text-link [&::-webkit-details-marker]:hidden">
                  <h3>{item.q}</h3>
                  <Plus
                    className="mt-0.5 size-5 shrink-0 text-link transition-transform duration-200 group-open:rotate-45"
                    aria-hidden
                  />
                </summary>
                <p className="max-w-[65ch] pb-6 text-[0.9375rem] leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
