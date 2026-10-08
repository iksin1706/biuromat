import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Check, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { LOGO_MARK_PATH } from "@/components/brand/logo-paths";
import { getSection } from "@/content/home";
import { ctaSection } from "@/content/cta";
import { primaryCta } from "@/content/site";
import { ScrollScale } from "@/components/motion/reveal";

export function FinalCta() {
  const meta = getSection("start");
  const hasImage = fs.existsSync(path.join(process.cwd(), "public", ctaSection.image));

  return (
    // Ostatnia sekcja: zaokrąglony dół, spod którego wyjeżdża jasna stopka
    <Section
      id={meta.id}
      tone={meta.tone}
      aria-labelledby={`${meta.id}-title`}
      className="rounded-b-[2.5rem] sm:rounded-b-[3.5rem]"
    >
      <Container>
        <ScrollScale>
        <div className="relative overflow-hidden rounded-4xl bg-navy-900 px-6 py-14 ring-1 ring-inset ring-white/10 sm:px-12 lg:px-16 lg:py-20">
          <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-40 size-144 rounded-full bg-blue-500/25 blur-[120px]" />

          <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
            <div className="max-w-xl">
              <h2 id={`${meta.id}-title`} className="text-h1">
                {ctaSection.title}
              </h2>
              <p className="mt-5 text-lead text-muted-foreground">{ctaSection.text}</p>

              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {ctaSection.points.map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="grid size-4.5 place-items-center rounded-full bg-blue-500/30 text-blue-200">
                      <Check className="size-3" strokeWidth={3} aria-hidden />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
                <ButtonLink href={primaryCta.href} size="lg">
                  {primaryCta.label}
                </ButtonLink>
                <p className="text-sm text-muted-foreground">
                  {ctaSection.talk.label}
                  <a
                    href={`tel:${ctaSection.talk.phone.replace(/\s/g, "")}`}
                    className="mt-0.5 flex items-center gap-1.5 font-semibold text-foreground hover:text-link"
                  >
                    <Phone className="size-4 text-link" aria-hidden />
                    {ctaSection.talk.phone}
                  </a>
                </p>
              </div>
            </div>

            {/* Grafika: render 3D spinacza (gdy jest) albo znak z logo z gradientem; delikatnie się unosi */}
            <div aria-hidden className="relative hidden justify-center lg:flex">
              {hasImage ? (
                <Image
                  src={ctaSection.image}
                  alt=""
                  width={800}
                  height={800}
                  sizes="(min-width: 1024px) 460px, 1px"
                  // mix-blend-screen: czarne tło renderu znika, zostaje świecący spinacz na granacie panelu
                  className="w-[115%] max-w-none mix-blend-screen motion-safe:animate-[cta-float_7s_ease-in-out_infinite] mask-[radial-gradient(closest-side,black_70%,transparent)]"
                />
              ) : (
                <svg
                  viewBox="0 0 320 346"
                  className="h-80 w-auto drop-shadow-[0_30px_60px_rgb(58_91_196/0.45)] motion-safe:animate-[cta-float_7s_ease-in-out_infinite]"
                >
                  <defs>
                    <linearGradient id="cta-clip" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#b4c3ee" />
                      <stop offset="55%" stopColor="#5c7bd6" />
                      <stop offset="100%" stopColor="#203a8f" />
                    </linearGradient>
                  </defs>
                  <path d={LOGO_MARK_PATH} fill="url(#cta-clip)" />
                </svg>
              )}
            </div>
          </div>
        </div>
        </ScrollScale>
      </Container>
    </Section>
  );
}
