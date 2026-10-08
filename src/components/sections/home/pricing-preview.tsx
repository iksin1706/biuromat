"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronRight, Building2, Sparkles, type LucideIcon } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { getSection } from "@/content/home";
import { pricingSection } from "@/content/pricing";
import { primaryCta } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

const tierIcons: Record<string, LucideIcon> = { premium: Sparkles, enterprise: Building2 };

export function PricingPreview() {
  const meta = getSection("cennik");
  const root = useRef<HTMLElement>(null);

  // Gag: cena „spada” z 199 zł do zera, gdy sekcja wejdzie w widok (raz). HTML ma od razu „0”.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = root.current?.querySelector<HTMLElement>("[data-price]");
        if (!el) return;
        const state = { v: pricingSection.priceFrom };
        el.textContent = String(state.v);
        gsap.to(state, {
          v: 0,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(state.v));
          },
        });
        gsap.from("[data-price-note]", {
          opacity: 0,
          y: 8,
          duration: 0.6,
          delay: 1.1,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <Section ref={root} id={meta.id} tone={meta.tone} aria-labelledby={`${meta.id}-title`}>
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id={`${meta.id}-title`} className="text-h2">
            {pricingSection.title}
          </h2>
          <p className="mt-4 text-lead text-muted-foreground">{pricingSection.subtitle}</p>
        </Reveal>

        {/* Cena */}
        <div className="mt-10 flex flex-col items-center">
          <p className="flex items-start font-bold tracking-[-0.06em] text-blue-600" aria-label="0 zł">
            <span data-price className="tabular text-[clamp(7rem,4rem+12vw,12rem)] leading-[0.85]">
              0
            </span>
            <span className="mt-[0.35em] ml-2 text-[clamp(2rem,1.4rem+2.5vw,3.25rem)] leading-none">zł</span>
          </p>
          <p data-price-note className="mt-4 text-lead text-muted-foreground">
            {pricingSection.priceNote}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href={primaryCta.href} size="lg">
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href={pricingSection.fullPricing.href} size="lg" variant="secondary">
              {pricingSection.fullPricing.label}
            </ButtonLink>
          </div>
        </div>

        {/* Gdy darmowy plan nie wystarcza */}
        <Reveal className="mx-auto mt-16 grid max-w-4xl gap-4 md:grid-cols-2">
          {pricingSection.tiers.map((t) => {
            const Icon = tierIcons[t.id];
            return (
              <article key={t.id} className="flex flex-col rounded-2xl bg-card p-7 ring-1 ring-inset ring-border">
                <div className="flex items-center gap-3">
                  <span className="icon-tile grid size-10 place-items-center" style={{ borderRadius: 12 }}>
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="text-lg font-bold">{t.name}</h3>
                </div>
                <p className="mt-5">
                  <span className="text-2xl font-bold tracking-[-0.02em]">{t.price}</span>
                  <span className="ml-2 text-sm text-muted-foreground">{t.unit}</span>
                </p>
                <p className="mt-2 flex-1 text-[0.9375rem] text-muted-foreground">{t.text}</p>
                <Link
                  href={t.link.href}
                  className="mt-5 inline-flex items-center gap-0.5 self-start text-sm font-semibold text-link hover:underline"
                >
                  {t.link.label}
                  <ChevronRight className="size-4" aria-hidden />
                </Link>
              </article>
            );
          })}
        </Reveal>
      </Container>
    </Section>
  );
}
