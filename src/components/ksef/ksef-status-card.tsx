// Karta statusu wysyłki do KSeF — niezależna od interfejsu aplikacji (nie odtwarza ekranu),
// więc nie trzeba jej zmieniać, gdy zmienia się UI. Animowana w hero przez atrybuty data-*:
//   [data-ksef-card] wejście · [data-step="n"] kroki · [data-step-spin]/[data-step-check]
//   [data-ksef-progress] linia postępu · [data-ksef-number] numer „wpisywany”
//   [data-ksef-pill-sending]/[data-ksef-pill-done] status w nagłówku
import { Check, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ksefDemo } from "@/content/hero";

const steps = [
  { id: 1, label: "Faktura wystawiona", meta: ksefDemo.time },
  { id: 2, label: "Wysłano do KSeF" },
  { id: 3, label: "Nadano numer KSeF", number: true },
];

export function KsefStatusCard({ className }: { className?: string }) {
  return (
    <div
      data-ksef-card
      className={cn(
        "night w-[350px] rounded-2xl bg-navy-900/85 p-5 text-foreground ring-1 ring-white/12 backdrop-blur-xl",
        "shadow-[0_30px_60px_-24px_rgb(0_0_0/0.7)]",
        className,
      )}
      aria-label="Przykład: wysyłka faktury do KSeF"
      role="img"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-muted-foreground">KSeF</span>
        <span className="grid text-xs font-semibold">
          <span
            data-ksef-pill-sending
            className="col-start-1 row-start-1 inline-flex items-center gap-1.5 justify-self-end rounded-pill bg-blue-500/15 px-2.5 py-1 text-blue-300 opacity-0"
          >
            <LoaderCircle className="size-3 animate-spin" aria-hidden /> Wysyłanie
          </span>
          <span
            data-ksef-pill-done
            className="col-start-1 row-start-1 inline-flex items-center gap-1 justify-self-end rounded-pill bg-success/15 px-2.5 py-1 text-success"
          >
            <Check className="size-3" strokeWidth={3} aria-hidden /> Przyjęta
          </span>
        </span>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="tabular text-lg font-bold tracking-tight">{ksefDemo.number}</p>
          <p className="truncate text-sm text-muted-foreground">{ksefDemo.buyer}</p>
        </div>
        <p className="tabular shrink-0 text-lg font-bold tracking-tight">{ksefDemo.gross}</p>
      </div>

      <ol className="relative mt-5 space-y-3.5 border-t border-border pt-5">
        {/* Linia postępu za kropkami — od kropki 1 do kropki ostatniego kroku (pod nim jest numer KSeF) */}
        <span aria-hidden className="absolute top-[30px] bottom-5 left-[9px] w-px bg-white/10" />
        <span
          aria-hidden
          data-ksef-progress
          className="absolute top-[30px] bottom-5 left-[9px] w-px origin-top bg-success"
        />
        {steps.map((s) => (
          <li key={s.id} data-step={s.id} className="relative flex gap-3">
            <span className="relative z-10 grid size-[19px] shrink-0 place-items-center rounded-full bg-navy-900 ring-1 ring-white/15">
              <span data-step-spin className="absolute inset-0 grid place-items-center text-blue-400 opacity-0">
                <LoaderCircle className="size-[19px] animate-spin" aria-hidden />
              </span>
              <span data-step-check className="absolute inset-0 grid place-items-center rounded-full bg-success">
                <Check className="size-3 text-navy-950" strokeWidth={3.5} aria-hidden />
              </span>
            </span>
            <span data-step-label className="min-w-0 flex-1 text-sm leading-[19px]">
              <span className="flex justify-between gap-2">
                <span className="font-semibold">{s.label}</span>
                {s.meta && <span className="tabular text-muted-foreground">{s.meta}</span>}
              </span>
              {s.number && (
                <span data-ksef-number className="tabular mt-1 block font-mono text-[11.5px] text-blue-300">
                  {ksefDemo.ksef}
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
