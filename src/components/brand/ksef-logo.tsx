import { Raleway } from "next/font/google";
import { cn } from "@/lib/utils";

// Znak słowny „Krajowy System e-Faktur” odtworzony typograficznie (Raleway, jak w materiałach MF),
// bo oficjalne logo nie jest dostępne w SVG. Tylko do oznaczenia integracji z KSeF.
const raleway = Raleway({ subsets: ["latin", "latin-ext"], weight: ["400", "900"], display: "swap" });

export function KsefLogo({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Krajowy System e-Faktur"
      className={cn(raleway.className, "inline-flex flex-col items-center leading-none text-white", className)}
    >
      <span aria-hidden className="text-[0.42em] font-normal tracking-[-0.01em]">
        Krajowy System
      </span>
      <span aria-hidden className="mt-[0.06em] text-[1em] font-black tracking-[-0.025em]">
        <span className="text-[#e30613]">e</span>-Faktur
      </span>
    </span>
  );
}
