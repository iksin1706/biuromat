"use client";

import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SparklesCore } from "@/components/ui/sparkles";
import { Container } from "@/components/ui/container";
import { getSection } from "@/content/home";
import { numbersSection } from "@/content/numbers";
import { cn } from "@/lib/utils";

const fmt = new Intl.NumberFormat("pl-PL");

// HTML zawiera od razu wartości końcowe (SEO, brak JS, reduced motion).
// Przy dozwolonym ruchu GSAP zeruje liczby i odlicza je, gdy pas wejdzie w widok.
export function Numbers() {
  const meta = getSection("liczby");
  const root = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        });

        tl.from("[data-stat-line]", { scaleX: 0, duration: 0.9, ease: "power3.out", stagger: 0.12 }, 0);

        root.current?.querySelectorAll<HTMLElement>("[data-count]").forEach((el, i) => {
          const target = Number(el.dataset.count);
          const state = { v: 0 };
          el.textContent = fmt.format(0);
          tl.to(
            state,
            {
              v: target,
              duration: 2.2,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent = fmt.format(Math.round(state.v));
              },
            },
            0.1 + i * 0.12,
          );
        });

        tl.from("[data-stat-label]", { y: 10, opacity: 0, duration: 0.7, ease: "power2.out", stagger: 0.12 }, 0.35);
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id={meta.id}
      aria-labelledby={`${meta.id}-title`}
      className={cn(meta.tone, "relative bg-background pb-20 text-foreground sm:pb-24")}
    >
      <h2 id={`${meta.id}-title`} className="sr-only">
        {numbersSection.srTitle}
      </h2>
      {/* Drobne migoczące cząsteczki w tle — rzadkie i wolne, wygaszane ku krawędziom */}
      {!reduceMotion && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <SparklesCore
            id="numbers-sparkles"
            background="transparent"
            minSize={0.4}
            maxSize={1.1}
            particleDensity={70}
            speed={1.2}
            particleColor="#b4c3ee"
            className="h-full w-full mask-[radial-gradient(ellipse_70%_80%_at_50%_45%,white_30%,transparent)]"
          />
        </div>
      )}
      <Container className="relative">
        <dl className="grid gap-12 sm:grid-cols-3 sm:gap-8">
          {numbersSection.items.map((s) => (
            // dt przed dd (poprawny HTML), wizualnie liczba nad opisem — flex-col-reverse
            <div key={s.label} className="relative flex flex-col-reverse items-center justify-end pt-8 text-center sm:items-start sm:text-left">
              {/* Linia nad liczbą — rysuje się przy wejściu */}
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
              <span
                aria-hidden
                data-stat-line
                // Najjaśniejsza na środku, wygaszona ku końcom; rozjeżdża się od środka (origin-center)
                className="absolute top-0 left-0 h-px w-full origin-center bg-linear-to-r from-transparent via-blue-400 to-transparent"
              />
              <dt data-stat-label className="mt-4 max-w-[22ch] text-lead text-muted-foreground sm:max-w-[24ch]">
                {s.label}
              </dt>
              <dd className="text-[clamp(3rem,2rem+3.5vw,4.75rem)] leading-none font-bold tracking-[-0.045em]">
                <span data-count={s.value} className="text-metal tabular">
                  {fmt.format(s.value)}
                </span>
                {s.suffix && <span className="text-link">{s.suffix}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
