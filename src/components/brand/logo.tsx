import { cn } from "@/lib/utils";
import { LOGO_MARK_PATH, LOGO_TEXT_PATHS, LOGO_VIEWBOX } from "./logo-paths";

/**
 * Logo Biuromat. Napis przyjmuje kolor tekstu (currentColor), spinacz — token --logo-mark:
 * oryginalny #203C8C na jasnym tle, rozjaśniony niebieski na granacie (oryginał ginie na ciemnym).
 */
export function Logo({ className, title = "Biuromat" }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      role="img"
      aria-label={title}
      className={cn("h-6 w-auto fill-current", className)}
      style={{ fillRule: "evenodd", clipRule: "evenodd" }}
    >
      {LOGO_TEXT_PATHS.map((d, i) => (
        <path key={i} d={d} />
      ))}
      <path d={LOGO_MARK_PATH} style={{ fill: "var(--logo-mark)" }} />
    </svg>
  );
}
