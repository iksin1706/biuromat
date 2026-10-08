"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, KeyRound, Send, UserPlus, type LucideIcon } from "lucide-react";
import { PhoneFrame } from "@/components/mockups/phone-frame";
import { cn } from "@/lib/utils";
import type { HowStep } from "@/content/how-it-works";
import { Reveal } from "@/components/motion/reveal";

type Step = HowStep & { hasVideo: boolean; hasPoster: boolean };

const placeholderIcons: LucideIcon[] = [UserPlus, KeyRound, Send];

/**
 * Jeden telefon, trzy nagrania. Aktywny krok odtwarza się, a po zakończeniu przechodzi
 * do następnego (w pętli). Odtwarzanie tylko gdy sekcja jest widoczna. Przy
 * prefers-reduced-motion nic nie startuje samo — dopiero po kliknięciu kroku.
 */
export function HowItWorksPlayer({
  title,
  subtitle,
  steps,
  titleId,
}: {
  title: string;
  subtitle: string;
  steps: Step[];
  titleId: string;
}) {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [userStarted, setUserStarted] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const elapsed = useRef(0); // sekundy — dla kroków bez nagrania

  const playing = inView && (autoplay || userStarted);

  const next = useCallback(() => setActive((i) => (i + 1) % steps.length), [steps.length]);

  // Reduced motion → bez autoodtwarzania
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAutoplay(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Widoczność sekcji
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Zmiana kroku: zatrzymaj pozostałe nagrania, aktywne od początku
  useEffect(() => {
    elapsed.current = 0;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i !== active) v.pause();
      v.currentTime = 0;
    });
  }, [active]);

  // Start/stop aktywnego nagrania
  useEffect(() => {
    const v = videoRefs.current[active];
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [active, playing]);

  // Pasek postępu (bez re-renderów) + przejście dalej dla kroków bez nagrania
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const step = steps[active];
      const v = videoRefs.current[active];
      let progress = 0;
      if (step.hasVideo && v) {
        progress = v.duration ? v.currentTime / v.duration : 0;
      } else {
        if (playing) elapsed.current += dt;
        progress = Math.min(1, elapsed.current / step.fallbackDuration);
        if (progress >= 1) {
          next();
          return;
        }
      }
      fillRefs.current.forEach((f, i) => {
        if (f) f.style.transform = `scaleX(${i < active ? 1 : i === active ? progress : 0})`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, playing, steps, next]);

  const select = (i: number) => {
    setUserStarted(true);
    if (i === active) {
      const v = videoRefs.current[i];
      if (v) v.currentTime = 0;
      elapsed.current = 0;
    }
    setActive(i);
  };

  return (
    <div
      ref={rootRef}
      className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-[auto_1fr] lg:gap-x-24 lg:gap-y-12"
    >
      <Reveal className="max-w-xl lg:col-start-1 lg:row-start-1">
        <h2 id={titleId} className="text-h2">
          {title}
        </h2>
        <p className="mt-4 text-lead text-muted-foreground">{subtitle}</p>
      </Reveal>

      {/* Telefon z nagraniami */}
      <div className="relative mx-auto lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[-20%] top-[15%] bottom-[10%] rounded-full bg-blue-400/25 blur-[90px]"
        />
        <PhoneFrame statusBar={false} className="relative w-[272px] sm:w-[300px]">
          <div className="relative aspect-[390/844] bg-[#f1f4fb]">
            {steps.map((s, i) => {
              const Icon = placeholderIcons[i] ?? Send;
              return (
                <div
                  key={s.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-300 ease-apple",
                    i === active ? "opacity-100" : "opacity-0",
                  )}
                  aria-hidden={i !== active}
                >
                  {s.hasVideo ? (
                    <video
                      ref={(el) => {
                        videoRefs.current[i] = el;
                      }}
                      className="size-full object-cover"
                      src={s.video}
                      poster={s.hasPoster ? s.poster : undefined}
                      muted
                      playsInline
                      preload={i === active ? "auto" : "metadata"}
                      onEnded={next}
                      aria-label={`Nagranie: ${s.title}`}
                    />
                  ) : (
                    <div className="flex size-full flex-col items-center justify-center gap-4 px-8 text-center text-navy-950">
                      <span className="primary-surface grid size-16 place-items-center rounded-2xl">
                        <Icon className="size-7" aria-hidden />
                      </span>
                      <p className="text-lg font-bold">{s.title}</p>
                      <p className="text-xs text-navy-500">Tutaj będzie filmik</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </PhoneFrame>
      </div>

      {/* Kroki */}
      <ol className="space-y-3 lg:col-start-1 lg:row-start-2 lg:self-start">
        {steps.map((s, i) => {
          const isActive = i === active;
          return (
            <li key={s.id}>
              <div
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                onClick={() => select(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    select(i);
                  }
                }}
                className={cn(
                  "group flex cursor-pointer gap-5 rounded-2xl p-5 transition-colors duration-200 sm:p-6",
                  isActive ? "bg-card ring-1 ring-inset ring-border" : "hover:bg-card/60",
                )}
              >
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-full text-base font-bold transition-colors",
                    isActive ? "primary-surface" : "bg-muted text-muted-foreground",
                  )}
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h3
                    className={cn(
                      "text-xl leading-snug font-bold tracking-[-0.015em] transition-opacity",
                      !isActive && "opacity-70",
                    )}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">{s.text}</p>
                  {s.link && (
                    <Link
                      href={s.link.href}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-2 inline-flex items-center gap-0.5 text-sm font-semibold text-link hover:underline"
                    >
                      {s.link.label}
                      <ChevronRight className="size-3.5" aria-hidden />
                    </Link>
                  )}
                  <span aria-hidden className="mt-4 block h-[3px] overflow-hidden rounded-full bg-border">
                    <span
                      ref={(el) => {
                        fillRefs.current[i] = el;
                      }}
                      className="block h-full origin-left rounded-full bg-primary"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
