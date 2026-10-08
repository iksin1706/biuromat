"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUp, Check, type LucideIcon } from "lucide-react";
import { KsefLogo } from "@/components/brand/ksef-logo";
import { ksefSection } from "@/content/ksef";

// Geometria torów (viewBox 1000×220). Kolumny pod spodem mają środki na 25% i 75% szerokości,
// a SVG ma tę samą szerokość co siatka — końce linii trafiają w środki kolumn.
const SEND_PATH = "M250 220 C250 110 470 125 470 10"; // od ikony wysyłki w górę do KSeF
const RECEIVE_PATH = "M530 10 C530 125 750 110 750 220"; // z KSeF w dół do ikony pobierania

// Dwa niezależne rytmy — tory nie wyglądają jak jeden dokument tam i z powrotem
const SEND = { dur: 3.6, begins: [0, 1.2, 2.4] };
const RECEIVE = { dur: 4.4, begins: [0.6, 2.1, 3.6] };

export function KsefFlowVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(rootRef, { amount: 0.3 });
  const reduce = useReducedMotion();

  // SMIL: wstrzymanie poza widokiem (oszczędność CPU)
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (inView && !reduce) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [inView, reduce]);

  return (
    <div ref={rootRef} className="mt-14">
      {/* Logo KSeF — na górze, z poświatą */}
      <div className="relative flex justify-center">
        <div aria-hidden className="absolute top-1/2 left-1/2 h-40 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/25 blur-[70px]" />
        <KsefLogo className="relative text-[3.25rem] sm:text-[4.25rem]" />
      </div>

      {/* Tory: wysyłka w górę, pobieranie w dół (desktop/tablet) */}
      <svg
        ref={svgRef}
        aria-hidden
        viewBox="0 0 1000 220"
        className="mt-4 hidden h-auto w-full overflow-visible md:block"
      >
        <defs>
          <marker id="ksef-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M1 1 L9 5 L1 9" fill="none" stroke="rgb(142 166 234)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {[SEND_PATH, RECEIVE_PATH].map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="rgb(142 166 234 / 0.45)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            markerEnd="url(#ksef-arrow)"
            className={!reduce ? "animate-[ksef-dash_0.9s_linear_infinite]" : undefined}
          />
        ))}

        {!reduce && (
          <>
            {SEND.begins.map((b) => (
              <Doc key={`s${b}`} path={SEND_PATH} dur={SEND.dur} begin={b} variant="send" />
            ))}
            {RECEIVE.begins.map((b) => (
              <Doc key={`r${b}`} path={RECEIVE_PATH} dur={RECEIVE.dur} begin={b} variant="receive" />
            ))}
          </>
        )}
      </svg>

      {/* Dwie kolumny: duża ikona na środku, opis pod spodem */}
      <div className="mt-12 grid gap-y-14 md:mt-0 md:grid-cols-2">
        <Lane icon={ArrowUp} {...ksefSection.send} />
        <Lane icon={ArrowDown} {...ksefSection.receive} />
      </div>
    </div>
  );
}

/** Dokument płynący po torze (SVG + animateMotion). Wysyłane: niebieskie, pobierane: białe. */
function Doc({ path, dur, begin, variant }: { path: string; dur: number; begin: number; variant: "send" | "receive" }) {
  const send = variant === "send";
  return (
    <g opacity="0">
      <rect x="-12" y="-15" width="24" height="30" rx="4" fill={send ? "rgb(58 91 196)" : "#ffffff"} />
      {[-6, -1, 4].map((y, i) => (
        <rect
          key={y}
          x="-7"
          y={y}
          width={i === 2 ? 8 : 14}
          height="2"
          rx="1"
          fill={send ? "rgb(255 255 255 / 0.85)" : "rgb(32 58 143 / 0.6)"}
        />
      ))}
      <animateMotion path={path} dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.12;0.85;1"
        dur={`${dur}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
      />
    </g>
  );
}

function Lane({ icon: Icon, title, text, points }: { icon: LucideIcon; title: string; text: string; points: string[] }) {
  return (
    <div className="flex flex-col items-center px-4 text-center">
      {/* Duża strzałka bez tła — kontynuacja linii toru */}
      <Icon
        // Pełny kolor (bez opacity) — przy półprzezroczystości łączenia kresek grotu byłyby widoczne
        className="mt-8 size-20 text-[#bcc5d2] drop-shadow-[0_0_20px_rgb(142_166_234/0.35)]"
        strokeWidth={2.5}
        aria-hidden
      />
      <h3 className="mt-5 text-h3">{title}</h3>
      <p className="mt-2 max-w-md text-[0.9375rem] text-muted-foreground">{text}</p>
      <ul className="mt-5 inline-flex flex-col gap-2.5 text-left">
        {points.map((p) => (
          <li key={p} className="flex gap-2.5 text-sm">
            <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-blue-500/30 text-blue-200">
              <Check className="size-3" strokeWidth={3} aria-hidden />
            </span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
