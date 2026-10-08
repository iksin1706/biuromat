import { cn } from "@/lib/utils";

/**
 * Światło na krawędzi zrzutu interfejsu — w duchu linii pod nagłówkiem hero: intensywnie biały,
 * cienki horyzont na górnej krawędzi i krótki gradient, który szybko gaśnie (efekt jasnej
 * krawędzi „czarnej dziury”). Wstaw jako pierwsze dziecko kontenera z ramką (rodzic musi mieć
 * position) — kolejność w DOM kładzie światło pod ramką. Oddycha bardzo wolno (.screen-glow
 * w globals.css, wyłączone przy reduced motion). Same gradienty, bez obrazów.
 */
export function ScreenGlow({ variant = "browser", className }: { variant?: "browser" | "phone"; className?: string }) {
  const phone = variant === "phone";
  return (
    <div aria-hidden className={cn("screen-glow pointer-events-none absolute inset-0", className)}>
      {/* Krótka poświata tuż przy krawędziach — najjaśniejsza u góry, gaśnie po kilku px */}
      <div
        className={cn(
          "absolute -inset-px bg-linear-to-b from-white/60 via-blue-300/20 to-transparent blur-[6px]",
          phone ? "rounded-[2.6rem]" : "rounded-xl",
        )}
      />
      {/* Krótki snop światła nad górną krawędzią */}
      <div
        className={cn(
          "absolute bottom-full left-1/2 -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgb(142_166_234/0.35),transparent_70%)]",
          phone ? "h-10 w-4/5" : "h-16 w-3/4",
        )}
      />
      {/* Horyzont: miękka niebieska smuga + ostra biała linia + jaśniejszy rdzeń na środku */}
      <div
        className={cn(
          "absolute -top-0.5 left-1/2 h-1 -translate-x-1/2 bg-linear-to-r from-transparent via-blue-300 to-transparent blur-sm",
          phone ? "w-4/5" : "w-3/4",
        )}
      />
      <div
        className={cn(
          "absolute -top-px left-1/2 h-px -translate-x-1/2 bg-linear-to-r from-transparent via-white to-transparent",
          phone ? "w-4/5" : "w-3/4",
        )}
      />
      <div
        className={cn(
          "absolute -top-px left-1/2 h-0.5 -translate-x-1/2 bg-linear-to-r from-transparent via-white to-transparent blur-[1px]",
          phone ? "w-2/5" : "w-1/4",
        )}
      />
    </div>
  );
}
