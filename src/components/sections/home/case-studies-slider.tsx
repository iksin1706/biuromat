"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check, ChevronLeft, ChevronRight, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/content/case-studies";

type Item = CaseStudy & { hasImage: boolean };

const AUTOPLAY_MS = 9000;
const GAP = 12; // px — gap-3 między kartami
const EXPAND = 6; // flex-grow aktywnej karty (paski: 1)
const DURATION = 700; // ms — rozwijanie karty
const CURVE = "cubic-bezier(0.25, 0.1, 0.25, 1)";
const PORTRAIT_RATIO = 1152 / 928; // wysokość / szerokość portretów (928×1152)
const ease = [0.25, 0.1, 0.25, 1] as const;

/**
 * Slider scenariuszy — inspiracja „Expanding Collection” / „Material You” + pasek postępu
 * jak w „Stories”. Desktop: aktywna karta rozszerza się, pozostałe zwężają do pasków z portretem.
 * Autoodtwarzanie tylko gdy sekcja jest widoczna, bez najechania i bez reduced motion.
 * Mobile: karty przewijane palcem (scroll-snap), bez autoodtwarzania.
 */
export function CaseStudiesSlider({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const deskRef = useRef<HTMLDivElement>(null);
  // Geometria desktopu: szerokość rozwiniętej karty (A) i paska (s). Zdjęcie i tekst mają
  // stałe wymiary = A, więc rozwijanie karty ich nie przelicza (brak skakania i zawijania).
  const [geo, setGeo] = useState({ A: 733, s: 122, H: 576 });
  // Skala zdjęcia w pasku: cały portret mieści się w wysokości karty
  const stripScale = Math.min(1, geo.H / (geo.A * PORTRAIT_RATIO));
  const inView = useInView(rootRef, { amount: 0.4 });
  const reduce = useReducedMotion();
  const playing = inView && !hovered && !reduce;

  const go = (i: number) => {
    const next = (i + items.length) % items.length;
    setActive(next);
    // Mobile: przewiń karuzelę do wybranej karty
    const track = trackRef.current;
    const card = track?.children[next] as HTMLElement | undefined;
    if (track && card && track.offsetParent !== null) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: reduce ? "auto" : "smooth" });
    }
  };

  useEffect(() => {
    const el = deskRef.current;
    if (!el) return;
    const update = () => {
      const free = el.clientWidth - GAP * (items.length - 1);
      const unit = free / (EXPAND + items.length - 1);
      setGeo({ A: unit * EXPAND, s: unit, H: el.clientHeight });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length]);

  // Mobile: aktywna karta wynika z pozycji przewinięcia
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const w = (track.children[0] as HTMLElement | undefined)?.offsetWidth ?? 1;
      setActive(Math.round(track.scrollLeft / (w + 16)));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={rootRef}
      className="mt-12"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      {/* Desktop: rozszerzające się karty */}
      <div ref={deskRef} className="hidden h-[36rem] gap-3 lg:flex" role="group" aria-roledescription="karuzela" aria-label="Scenariusze">
        {items.map((c, i) => {
          const isActive = i === active;
          return (
            <article
              key={c.id}
              aria-roledescription="slajd"
              aria-label={`${i + 1} z ${items.length}: ${c.segment}`}
              onClick={() => !isActive && setActive(i)}
              className={cn(
                "relative min-w-24 basis-0 overflow-hidden rounded-2xl ring-1 ring-inset ring-white/10 transition-[flex-grow]",
                !isActive && "cursor-pointer",
              )}
              style={{ flexGrow: isActive ? EXPAND : 1, transitionDuration: `${DURATION}ms`, transitionTimingFunction: CURVE }}
            >
              {/* Warstwa zdjęcia o stałym rozmiarze (A × A·proporcja, cały kadr bez przycinania).
                  Rozwinięta: pełna szerokość, kadr ustawiony na ~30% wysokości.
                  Pasek: pomniejszona do wysokości karty (cała sylwetka) i przesunięta tak, by twarz była na środku.
                  Zmienia się tylko transform — bez przeliczania kadru, więc nic nie skacze. */}
              <div
                className="absolute top-0 left-0"
                style={{
                  width: geo.A,
                  height: geo.A * PORTRAIT_RATIO,
                  transformOrigin: "0 0",
                  transform: isActive
                    ? `translate(0px, ${-(geo.A * PORTRAIT_RATIO - geo.H) * 0.3}px) scale(1)`
                    : `translate(${geo.s / 2 - c.focusX * geo.A * stripScale}px, 0px) scale(${stripScale})`,
                  transition: `transform ${DURATION}ms ${CURVE}`,
                }}
              >
                <Portrait item={c} sizes="(min-width: 1024px) 760px, 1px" />
              </div>

              {/* Przyciemnienie: aktywna — gradient pod tekst z lewej; pasek — równomiernie */}
              <div
                aria-hidden
                className={cn(
                  "absolute inset-y-0 left-0 transition-opacity duration-700",
                  "bg-linear-to-r from-navy-950 via-navy-950/80 to-navy-950/0",
                  isActive ? "opacity-100" : "opacity-0",
                )}
                style={{ width: geo.A }}
              />
              <div
                aria-hidden
                className={cn(
                  "absolute inset-0 bg-navy-950/60 transition-opacity duration-700",
                  isActive ? "opacity-0" : "opacity-100",
                )}
              />

              {/* Pasek (nieaktywna karta): numer i segment pionowo */}
              <button
                type="button"
                tabIndex={isActive ? -1 : 0}
                onClick={() => setActive(i)}
                aria-label={`Pokaż scenariusz: ${c.segment}`}
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-between py-6 text-foreground transition-opacity duration-300",
                  isActive ? "pointer-events-none opacity-0" : "opacity-100 delay-300",
                )}
              >
                <span className="tabular text-sm font-semibold text-muted-foreground">0{i + 1}</span>
                <span className="rotate-180 text-lg font-bold tracking-[-0.01em] whitespace-nowrap [writing-mode:vertical-rl]">
                  {c.segment}
                </span>
              </button>

              {/* Treść aktywnej karty */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.35, duration: 0.45, ease } }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    className="absolute inset-y-0 left-0 flex flex-col justify-end p-8 xl:p-10"
                    style={{ width: geo.A >= 700 ? Math.min(480, geo.A * 0.58) : geo.A * 0.72 }}
                  >
                    <CaseContent item={c} index={i} desktop />
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>

      {/* Mobile: karuzela przewijana palcem */}
      <div
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:hidden"
      >
        {items.map((c, i) => (
          <article
            key={c.id}
            aria-label={`${i + 1} z ${items.length}: ${c.segment}`}
            className="w-[85%] max-w-sm shrink-0 snap-center overflow-hidden rounded-2xl bg-card ring-1 ring-inset ring-white/10"
          >
            <div className="relative aspect-[4/3]">
              <Portrait item={c} sizes="85vw" />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-card via-card/10 to-transparent" />
            </div>
            <div className="p-6 pt-2">
              <CaseContent item={c} index={i} />
            </div>
          </article>
        ))}
      </div>

      {/* Nawigacja: zakładki z paskiem postępu + strzałki */}
      <div className="mt-6 flex items-center gap-4">
        <div className="grid flex-1 grid-cols-4 gap-2 sm:gap-4">
          {items.map((c, i) => {
            const isActive = i === active;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => go(i)}
                aria-current={isActive}
                aria-label={`Scenariusz ${i + 1}: ${c.segment}`}
                className="group text-left"
              >
                <span className="relative block h-0.5 overflow-hidden rounded-full bg-white/12">
                  {i < active && <span className="absolute inset-0 bg-blue-300/50" />}
                  {isActive && (
                    <span
                      key={`${c.id}-${active}`}
                      className="absolute inset-0 origin-left bg-blue-300 lg:animate-[case-progress_linear_forwards]"
                      style={{
                        animationDuration: `${AUTOPLAY_MS}ms`,
                        animationPlayState: playing ? "running" : "paused",
                      }}
                      onAnimationEnd={() => go(active + 1)}
                    />
                  )}
                </span>
                <span
                  className={cn(
                    "mt-3 hidden text-sm font-semibold transition-colors sm:block",
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  <span className="tabular mr-2 text-muted-foreground">0{i + 1}</span>
                  {c.segment}
                </span>
              </button>
            );
          })}
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Poprzedni scenariusz"
            className="grid size-10 place-items-center rounded-lg ring-1 ring-inset ring-input transition-colors hover:bg-white/5"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Następny scenariusz"
            className="grid size-10 place-items-center rounded-lg ring-1 ring-inset ring-input transition-colors hover:bg-white/5"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Zdjęcie wypełniające rodzica. Na desktopie rodzic ma stałą szerokość, więc kadr się nie zmienia. */
function Portrait({ item, sizes }: { item: Item; sizes: string }) {
  return (
    <div className="absolute inset-0">
      {item.hasImage ? (
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: "72% 30%" }}
        />
      ) : (
        // Placeholder do czasu wgrania portretu: sylwetka na granatowym tle
        <div
          role="img"
          aria-label={item.imageAlt}
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_72%_40%,var(--color-blue-800),var(--color-navy-900)_70%)]"
        >
          <UserRound
            aria-hidden
            strokeWidth={0.6}
            className="absolute top-1/2 right-[12%] size-[min(26rem,70%)] -translate-y-1/2 text-blue-300/25"
          />
        </div>
      )}
    </div>
  );
}

function CaseContent({ item: c, index, desktop }: { item: Item; index: number; desktop?: boolean }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="rounded-pill bg-white/10 px-2.5 py-1 text-foreground">
          <span className="tabular mr-1.5 text-muted-foreground">0{index + 1}</span>
          {c.segment}
        </span>
        <span className="rounded-pill bg-blue-500/25 px-2.5 py-1 text-blue-200">Plan {c.plan}</span>
      </div>
      <h3 className="mt-4 text-[1.625rem] leading-tight font-bold tracking-[-0.02em] text-balance">{c.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{c.persona.name}</span>, {c.persona.role} · {c.company}
      </p>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-foreground/85">{c.story}</p>
      <ul className="mt-5 space-y-2">
        {c.points.map((p) => (
          <li key={p} className="flex gap-2.5 text-sm">
            <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-blue-500/30 text-blue-200">
              <Check className="size-3" strokeWidth={3} aria-hidden />
            </span>
            {p}
          </li>
        ))}
      </ul>
      <div className={cn("mt-5 flex-wrap gap-1.5", desktop ? "hidden xl:flex" : "flex")}>
        {c.modules.map((m) => (
          <span key={m} className="rounded-md px-2 py-0.5 text-xs text-muted-foreground ring-1 ring-inset ring-white/12">
            {m}
          </span>
        ))}
      </div>
    </>
  );
}
