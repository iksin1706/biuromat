"use client";

import { useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Check, ChevronLeft, ChevronRight, ClipboardList, Factory, FileText, Warehouse, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { getSection } from "@/content/home";
import { appModules, modulesSection, type AppModule, type ModuleId } from "@/content/modules";
import { Reveal } from "@/components/motion/reveal";

const icons: Record<ModuleId, LucideIcon> = {
  fakturowanie: FileText,
  zamowienia: ClipboardList,
  magazyn: Warehouse,
  produkcja: Factory,
};

// Pozycje chipów: przesunięcie od środka w % szerokości/wysokości obszaru rozgałęzienia.
const SLOTS: [number, number][] = [
  [-31, -37], [0, -41], [31, -37],
  [-37, 0], [37, 0],
  [-31, 37], [0, 41], [31, 37],
];
// Które sloty zajmuje n chipów — zawsze symetrycznie.
const SLOT_ORDER: Record<number, number[]> = {
  8: [0, 1, 2, 3, 4, 5, 6, 7],
  7: [0, 1, 2, 3, 4, 5, 7],
  6: [0, 2, 3, 4, 5, 7],
  5: [0, 2, 3, 4, 6],
  4: [0, 2, 5, 7],
};

const STAGE_H = 500; // px, desktop
const MAX_W = 1100; // px — geometria rozgałęzienia (tło zajmuje całą szerokość)
const CARD_W = 300; // px — karta modułu w centrum
const CARD_H = 190; // px — wysokość karty (zmierzona; do startu linii)

const subscribeLg = (cb: () => void) => {
  const mq = window.matchMedia("(min-width: 1024px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const useIsLg = () =>
  useSyncExternalStore(subscribeLg, () => window.matchMedia("(min-width: 1024px)").matches, () => true);

const fly = { type: "spring", stiffness: 170, damping: 24, mass: 0.9 } as const;
const pop = { type: "spring", stiffness: 260, damping: 22 } as const;
const ARRIVE = 0.5; // s — chipy startują, gdy karta dojedzie na górę

// Wspólne layoutId: przycisk na dole ⇄ karta na górze (cała karta + jej elementy osobno)
const ids = (uid: string, id: ModuleId) => ({
  card: `${uid}-card-${id}`,
  icon: `${uid}-icon-${id}`,
  name: `${uid}-name-${id}`,
});

export function Modules() {
  const meta = getSection("moduly");
  const uid = useId();
  const [activeId, setActiveId] = useState<ModuleId>("fakturowanie");
  const active = appModules.find((m) => m.id === activeId)!;
  // Strzałki na karcie: poprzedni / następny moduł, w kółko
  const step = (dir: 1 | -1) => {
    const i = appModules.findIndex((m) => m.id === activeId);
    setActiveId(appModules[(i + dir + appModules.length) % appModules.length].id);
  };
  // Chipy i linie startują dopiero, gdy rozgałęzienie wejdzie w widok
  const [revealed, setRevealed] = useState(false);

  const isLg = useIsLg();
  const geoRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(MAX_W);

  useLayoutEffect(() => {
    const el = geoRef.current;
    if (!el) return;
    const update = () => setW(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <Section id={meta.id} tone={meta.tone} aria-labelledby={`${meta.id}-title`} className="overflow-hidden">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id={`${meta.id}-title`} className="text-h2">
            {modulesSection.title}
          </h2>
          <p className="mt-4 text-lead text-muted-foreground">{modulesSection.subtitle}</p>
        </Reveal>
      </Container>

      <LayoutGroup id={uid}>
        {/* Rozgałęzienie — wyróżniony obszar na całą szerokość */}
        <motion.div
          className="relative mt-8"
          onViewportEnter={() => setRevealed(true)}
          viewport={{ once: true, amount: 0.5 }}
        >
          <StageBackdrop />
          <div
            ref={geoRef}
            id={`${uid}-stage`}
            aria-live="polite"
            aria-label={`Funkcje modułu ${active.name}`}
            className={cn("relative mx-auto w-full px-4", isLg ? "max-w-275" : "py-6")}
            style={isLg ? { height: STAGE_H } : undefined}
          >
            {isLg ? (
              <RadialStage module={active} uid={uid} w={w} revealed={revealed} onStep={step} />
            ) : (
              <StackedStage module={active} uid={uid} revealed={revealed} onStep={step} />
            )}
          </div>
        </motion.div>

        {/* Zawsze 3 pozostałe moduły. Wybrany „wyjeżdża” na górę, reszta płynnie się przesuwa. */}
        <Container>
          <div
            role="group"
            aria-label="Pokaż inny moduł"
            className="mx-auto mt-8 grid max-w-4xl grid-cols-3 gap-2 sm:gap-3"
          >
            {appModules
              .filter((m) => m.id !== activeId)
              .map((m) => (
                <ModuleButton key={m.id} module={m} uid={uid} onSelect={() => setActiveId(m.id)} />
              ))}
          </div>

          <p className="mt-10 text-center">
            <Link
              href={modulesSection.allFeatures.href}
              className="inline-flex items-center gap-0.5 text-sm font-semibold text-link hover:underline"
            >
              {modulesSection.allFeatures.label}
              <ChevronRight className="size-4" aria-hidden />
            </Link>
          </p>
        </Container>
      </LayoutGroup>
    </Section>
  );
}

function ModuleButton({ module: m, uid, onSelect }: { module: AppModule; uid: string; onSelect: () => void }) {
  const Icon = icons[m.id];
  const l = ids(uid, m.id);
  return (
    <motion.button
      layoutId={l.card}
      transition={fly}
      aria-controls={`${uid}-stage`}
      aria-label={`Pokaż moduł ${m.name}`}
      onClick={onSelect}
      className="flex min-h-15 min-w-0 flex-col items-center gap-2 bg-card/60 px-1.5 py-3 text-center ring-1 ring-inset ring-border transition-[background-color,box-shadow] duration-200 hover:bg-card hover:ring-blue-500/30 sm:flex-row sm:gap-3 sm:p-2.5 sm:pr-4 sm:text-left"
      style={{ borderRadius: 16 }}
    >
      <motion.span
        layoutId={l.icon}
        transition={fly}
        className="grid size-10 shrink-0 place-items-center text-blue-700"
      >
        <Icon className="size-6" strokeWidth={1.75} aria-hidden />
      </motion.span>
      <span className="w-full min-w-0">
        <motion.span
          layoutId={l.name}
          transition={fly}
          className="block text-[0.8125rem] font-bold text-foreground sm:truncate sm:text-body"
        >
          {m.name}
        </motion.span>
        <span className="hidden truncate text-xs text-muted-foreground sm:block">{m.tagline}</span>
      </span>
    </motion.button>
  );
}

/** Karta modułu na pierwszym planie — ten sam layoutId co przycisk, z którego przyjechała. */
function CenterCard({ module: m, uid, compact }: { module: AppModule; uid: string; compact?: boolean }) {
  const Icon = icons[m.id];
  const l = ids(uid, m.id);
  return (
    <motion.div
      layoutId={l.card}
      transition={fly}
      className="relative z-10 flex flex-col items-center bg-card px-6 pt-6 pb-5 text-center ring-1 ring-inset ring-border shadow-[0_24px_60px_-28px_rgb(13_26_46/0.35)]"
      style={{ borderRadius: 28, width: compact ? 280 : CARD_W }}
    >
      <motion.span
        layoutId={l.icon}
        transition={fly}
        className="grid size-16 place-items-center text-blue-700"
      >
        <Icon className="size-11" strokeWidth={1.5} aria-hidden />
      </motion.span>
      <motion.span layoutId={l.name} transition={fly} className="mt-4 block text-xl font-bold tracking-[-0.015em]">
        {m.name}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: ARRIVE - 0.1, duration: 0.25 } }}
        className="mt-3"
      >
        <Link
          href={m.href}
          className="inline-flex items-center gap-0.5 text-sm font-semibold text-link hover:underline"
        >
          Więcej o module
          <ChevronRight className="size-3.5" aria-hidden />
        </Link>
      </motion.span>
    </motion.div>
  );
}

/** Tło obszaru rozgałęzienia: bardzo delikatna poświata + siatka kropek wygaszana ku krawędziom. */
function StageBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute top-1/2 left-1/2 h-95 w-190 max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/10 blur-[90px]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgb(77 97 128 / 0.16) 1px, transparent 1.2px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 55% 60% at 50% 50%, black 15%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse 55% 60% at 50% 50%, black 15%, transparent 72%)",
        }}
      />
    </div>
  );
}

type StageProps = { module: AppModule; uid: string; revealed: boolean; onStep: (dir: 1 | -1) => void };

function RadialStage({ module, uid, w, revealed, onStep }: StageProps & { w: number }) {
  const cx = w / 2;
  const cy = STAGE_H / 2;
  const hw = CARD_W / 2 + 8;
  const hh = CARD_H / 2 + 8;

  const order = SLOT_ORDER[Math.min(8, Math.max(4, module.chips.length))];
  const chips = revealed
    ? module.chips.slice(0, order.length).map((chip, i) => {
        const [px, py] = SLOTS[order[i]];
        const dx = (px / 100) * w;
        const dy = (py / 100) * STAGE_H;
        // Start linii na krawędzi karty: boki dla chipów bocznych, góra/dół dla chipów na osi
        const sx = dx === 0 ? cx : cx + Math.sign(dx) * hw;
        const sy = dx === 0 ? cy + Math.sign(dy) * hh : cy + dy * 0.28;
        const ex = cx + dx;
        const ey = cy + dy;
        const mx = sx + (ex - sx) * 0.55;
        const d = dx === 0 ? `M${sx} ${sy} L${ex} ${ey}` : `M${sx} ${sy} C${mx} ${sy} ${mx} ${ey} ${ex} ${ey}`;
        return { ...chip, dx, dy, sx, sy, ex, ey, d };
      })
    : [];

  return (
    <>
      <svg aria-hidden className="pointer-events-none absolute inset-0 size-full overflow-visible">
        <defs>
          {chips.map((c, i) => (
            <linearGradient
              key={`${module.id}-g-${i}`}
              id={`${uid}-grad-${i}`}
              gradientUnits="userSpaceOnUse"
              x1={c.sx}
              y1={c.sy}
              x2={c.ex}
              y2={c.ey}
            >
              <stop offset="0%" stopColor="rgb(50 83 184)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="rgb(50 83 184)" stopOpacity="0.12" />
            </linearGradient>
          ))}
        </defs>
        <AnimatePresence>
          {chips.map((c, i) => (
            <motion.g key={`${module.id}-line-${i}`} exit={{ opacity: 0, transition: { duration: 0.12 } }}>
              <motion.path
                d={c.d}
                fill="none"
                stroke={`url(#${uid}-grad-${i})`}
                strokeWidth={1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: ARRIVE + i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <motion.circle
                cx={c.sx}
                cy={c.sy}
                r={3}
                fill="rgb(50 83 184)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: ARRIVE + i * 0.05 }}
              />
            </motion.g>
          ))}
        </AnimatePresence>
      </svg>

      {/* Karta modułu w centrum */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: cx, top: cy }}>
        <CenterCard key={module.id} module={module} uid={uid} />
        <SlideArrows module={module} uid={uid} onStep={onStep} />
      </div>

      {/* Chipy */}
      <ul>
        <AnimatePresence>
          {chips.map((c, i) => (
            <motion.li
              key={`${module.id}-${c.label}`}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: c.ex, top: c.ey }}
              initial={{ x: -c.dx * 0.7, y: -c.dy * 0.7, scale: 0.3, opacity: 0 }}
              animate={{ x: 0, y: 0, scale: 1, opacity: 1, transition: { ...pop, delay: ARRIVE + i * 0.05 } }}
              exit={{ x: -c.dx * 0.5, y: -c.dy * 0.5, scale: 0.4, opacity: 0, transition: { duration: 0.18 } }}
            >
              <Chip label={c.label} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
}

function StackedStage({ module, uid, revealed, onStep }: StageProps) {
  return (
    <div className="flex min-h-120 flex-col items-center">
      <div className="flex min-h-52 items-start justify-center">
        <div className="relative">
          <CenterCard key={module.id} module={module} uid={uid} compact />
          <SlideArrows module={module} uid={uid} onStep={onStep} />
        </div>
      </div>
      <ul className="mt-6 flex flex-wrap justify-center gap-2">
        <AnimatePresence mode="popLayout">
          {revealed && module.chips.map((c, i) => (
            <motion.li
              key={`${module.id}-${c.label}`}
              initial={{ y: -36, scale: 0.4, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1, transition: { ...pop, delay: ARRIVE + i * 0.04 } }}
              exit={{ scale: 0.6, opacity: 0, transition: { duration: 0.12 } }}
            >
              <Chip label={c.label} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

/**
 * Strzałki slidera na karcie, na wysokości ikony. Poza samą kartą (nie w motion.div z layoutId),
 * więc nie rozciągają się podczas przelotu karty; pozycja = stały slot karty.
 */
function SlideArrows({ module: m, uid, onStep }: { module: AppModule; uid: string; onStep: (dir: 1 | -1) => void }) {
  const i = appModules.findIndex((x) => x.id === m.id);
  const prev = appModules[(i - 1 + appModules.length) % appModules.length];
  const next = appModules[(i + 1) % appModules.length];
  const cls =
    "pointer-events-auto grid size-10 place-items-center rounded-full text-foreground/35 transition-[color,background-color] duration-200 hover:bg-foreground/5 hover:text-foreground/80";
  return (
    <div className="pointer-events-none absolute inset-x-3 top-9 z-20 flex justify-between">
      <button type="button" aria-controls={`${uid}-stage`} aria-label={`Poprzedni moduł: ${prev.name}`} onClick={() => onStep(-1)} className={cls}>
        <ChevronLeft className="size-6" strokeWidth={1.75} aria-hidden />
      </button>
      <button type="button" aria-controls={`${uid}-stage`} aria-label={`Następny moduł: ${next.name}`} onClick={() => onStep(1)} className={cls}>
        <ChevronRight className="size-6" strokeWidth={1.75} aria-hidden />
      </button>
    </div>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-pill bg-card py-2 pr-4 pl-2.5 text-sm font-semibold whitespace-nowrap text-foreground ring-1 ring-inset ring-border">
      <span className="grid size-5 place-items-center rounded-full bg-blue-500/12 text-link">
        <Check className="size-3" strokeWidth={3} aria-hidden />
      </span>
      {label}
    </span>
  );
}
