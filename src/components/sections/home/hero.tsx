"use client";

import { useRef } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { INTRO_END } from "@/components/brand/intro-loader";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { BrowserFrame } from "@/components/mockups/browser-frame";
import { PhoneFrame } from "@/components/mockups/phone-frame";
import { ScreenGlow } from "@/components/mockups/screen-glow";
import { FitCanvas } from "@/components/mockups/fit-canvas";
import { KsefStatusCard } from "@/components/ksef/ksef-status-card";
import { SparklesCore } from "@/components/ui/sparkles";
import { useReducedMotion } from "motion/react";
import { hero } from "@/content/hero";
import { primaryCta } from "@/content/site";
import screenDesktop from "@/assets/screens/faktury-desktop.jpg";
import screenMobile from "@/assets/screens/faktury-mobile.png";

// Stany początkowe animacji są w globals.css (sekcja „Hero”) — tylko przy
// prefers-reduced-motion: no-preference. Bez animacji widać od razu stan końcowy.

const step = (n: number, part: "spin" | "check" | "label") => `[data-step="${n}"] [data-step-${part}]`;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Gdy gra intro (pierwsze wejście w sesji), hero startuje tuż przed jego końcem
        const intro = !document.documentElement.classList.contains("intro-seen");
        const delay = intro ? Math.max(0, INTRO_END - 0.25 - performance.now() / 1000) : 0;
        const tl = gsap.timeline({ delay, defaults: { ease: "expo.out" } });

        // 1. Wejście: słowa nagłówka wyłaniają się z rozmycia, potem treść, zrzuty i karta KSeF
        tl.to("[data-hero-word]", {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          stagger: 0.06,
        })
          .to("[data-hero-beams]", { scaleX: 1, opacity: 1, duration: 1.4, ease: "power3.out" }, 0.35)
          .to("[data-hero-fade]", { y: 0, opacity: 1, duration: 0.9, stagger: 0.07 }, 0.45)
          .to("[data-hero-stage]", { y: 0, opacity: 1, duration: 1.6 }, 0.55)
          .to("[data-hero-phone]", { y: 0, opacity: 1, duration: 1.4 }, 0.85)
          .to("[data-ksef-card]", { y: 0, opacity: 1, scale: 1, duration: 1.2 }, 1.2);

        // 2. Jeden moment: faktura przechodzi przez KSeF krok po kroku
        const fade = { duration: 0.3, ease: "power1.out" };
        const pop = { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2.2)" };
        tl.addLabel("ksef", 2.1)
          .to([step(2, "label"), step(2, "spin")], { opacity: 1, ...fade }, "ksef")
          .to(step(2, "spin"), { opacity: 0, ...fade }, "ksef+=1.1")
          .to(step(2, "check"), pop, "ksef+=1.15")
          .to("[data-ksef-progress]", { scaleY: 0.5, duration: 0.5, ease: "power2.inOut" }, "ksef+=1.15")
          .to([step(3, "label"), step(3, "spin")], { opacity: 1, ...fade }, "ksef+=1.45")
          .to(step(3, "spin"), { opacity: 0, ...fade }, "ksef+=2.1")
          .to(step(3, "check"), pop, "ksef+=2.15")
          .to("[data-ksef-progress]", { scaleY: 1, duration: 0.5, ease: "power2.inOut" }, "ksef+=2.15")
          .to("[data-ksef-number]", { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "steps(24)" }, "ksef+=2.2")
          .to("[data-ksef-pill-sending]", { opacity: 0, ...fade }, "ksef+=3.1")
          .to("[data-ksef-pill-done]", pop, "ksef+=3.15");
      });

      // 3. Przewijanie: zrzuty prostują się z lekkiego przechyłu
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-hero-tilt]",
          { rotateX: 22, scale: 0.93, transformOrigin: "50% 0%" },
          {
            rotateX: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-hero-tilt]", start: "top bottom", end: "top 20%", scrub: 0.6 },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="hero"
      data-hero
      aria-labelledby="hero-title"
      className="night relative overflow-hidden bg-background pt-16 pb-20 sm:pt-24 lg:pb-28"
    >
      {/* Światło za produktem */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[45%] mx-auto h-140 max-w-275 rounded-full bg-blue-600/25 blur-[140px]"
      />

      <Container className="relative flex flex-col items-center text-center">
        <h1
          id="hero-title"
          className="max-w-[18ch] text-[clamp(2.75rem,1rem+5.4vw,5.5rem)] leading-[0.98] tracking-[-0.045em] sm:max-w-none"
        >
          {hero.titleLines.map((line) => (
            <span key={line} className="block">
              {line.split(" ").map((word, i) => (
                <span key={i}>
                  {i > 0 && " "}
                  <span data-hero-word className="hero-word">
                    {word}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Iskry pod nagłówkiem: świetliste linie + cząsteczki, maska w kolorze tła wygasza krawędzie */}
        <div aria-hidden className="pointer-events-none relative mt-1 h-32 w-full max-w-240">
          <div data-hero-beams className="absolute inset-x-0 top-0 h-1.5">
            <div className="absolute top-0 left-1/2 h-0.5 w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-blue-400 to-transparent blur-sm" />
            <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-blue-300 to-transparent" />
            <div className="absolute top-0 left-1/2 h-1.25 w-1/4 -translate-x-1/2 bg-linear-to-r from-transparent via-blue-300 to-transparent blur-sm" />
            <div className="absolute top-0 left-1/2 h-px w-1/4 -translate-x-1/2 bg-linear-to-r from-transparent via-blue-200 to-transparent" />
          </div>
          {!reduceMotion && (
            <SparklesCore
              id="hero-sparkles"
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              particleColor="#FFFFFF"
              // Maska na samych iskrach (nie malowana warstwa) — tło hero z poświatą zostaje nietknięte
              className="h-full w-full mask-[radial-gradient(480px_92px_at_top,white_20%,transparent)]"
            />
          )}
        </div>

        <p data-hero-fade className="relative -mt-10 max-w-136 text-lead text-muted-foreground">
          {hero.subtitle}
        </p>

        <div data-hero-fade className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href={primaryCta.href} size="lg">
            {primaryCta.label}
          </ButtonLink>
          <ButtonLink href={hero.secondaryCta.href} size="lg" variant="secondary">
            {hero.secondaryCta.label}
          </ButtonLink>
        </div>

        <ul data-hero-fade className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
          {primaryCta.microcopy.map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <Check className="size-3.5 text-link" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      </Container>

      {/* Desktop/tablet: zrzut aplikacji + telefon + karta KSeF */}
      <Container className="relative mt-10 hidden md:block lg:mt-12">
        <div data-hero-stage className="perspective-[1800px]">
          <div data-hero-tilt>
            {/* Współrzędne w px płótna 1240×560. Okno mieści się w kontenerze;
                telefon i karta KSeF nachodzą na jego krawędzie. */}
            <FitCanvas width={1240} height={560}>
              <div className="absolute" style={{ top: 0, left: 110, width: 1000 }}>
                <ScreenGlow />
                <BrowserFrame className="relative">
                  <Image
                    src={screenDesktop}
                    alt={hero.screens.desktop.alt}
                    sizes="(min-width: 1280px) 1000px, 80vw"
                    priority
                    className="block h-auto w-full"
                  />
                </BrowserFrame>
              </div>
              <div data-hero-phone className="absolute" style={{ top: 40, left: 1000, width: 230 }}>
                <ScreenGlow variant="phone" />
                <PhoneFrame className="relative">
                  <Image
                    src={screenMobile}
                    alt={hero.screens.mobile.alt}
                    sizes="214px"
                    className="block h-auto w-full"
                  />
                </PhoneFrame>
              </div>
              <div className="absolute" style={{ top: 150, left: 0 }}>
                <KsefStatusCard />
              </div>
            </FitCanvas>
          </div>
        </div>
      </Container>

      {/* Mobile: telefon + karta KSeF */}
      <div data-hero-stage className="relative mt-10 flex flex-col items-center px-4 md:hidden">
        <div className="relative">
          <ScreenGlow variant="phone" />
          <PhoneFrame className="relative w-[260px]">
            <Image src={screenMobile} alt={hero.screens.mobile.alt} sizes="244px" className="block h-auto w-full" />
          </PhoneFrame>
        </div>
        <KsefStatusCard className="-mt-40 w-full max-w-[350px]" />
      </div>

      <noscript>
        <style>{`[data-hero] [data-hero-word],[data-hero] [data-hero-beams],[data-hero] [data-hero-fade],[data-hero] [data-hero-stage],[data-hero] [data-hero-phone],[data-hero] [data-ksef-card],[data-hero] [data-step-check],[data-hero] [data-step-label],[data-hero] [data-ksef-pill-done],[data-hero] [data-ksef-progress]{opacity:1!important;transform:none!important;filter:none!important}[data-hero] [data-ksef-pill-sending]{opacity:0!important}[data-hero] [data-ksef-number]{clip-path:none!important}`}</style>
      </noscript>
    </section>
  );
}
