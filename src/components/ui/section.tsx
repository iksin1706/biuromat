import { cn } from "@/lib/utils";
import { homeSections, type HomeSection } from "@/content/home";

// Podział sekcji zmianą powierzchni (zasada Apple), nie ramką ani cieniem.
const tones: Record<HomeSection["tone"], string> = {
  night: "night bg-background text-foreground",
  tile: "tile bg-background text-foreground",
  light: "light bg-background text-foreground",
};

type SectionProps = React.ComponentProps<"section"> & { tone?: HomeSection["tone"] };

const isDark = (s?: HomeSection) => !!s && s.tone !== "light";

/**
 * Ciemna sekcja zaokrągla rogi tam, gdzie styka się z jasną — liczone z rejestru
 * w content/home.ts, więc zmiana kolejności sekcji dopasowuje się sama.
 * Technika: sekcja ma jasne tło (widoczne tylko w rogach), a ciemna powierzchnia to
 * zaokrąglona warstwa pod treścią (isolate + -z-10).
 */
function roundedEdges(id: string | undefined) {
  const i = homeSections.findIndex((s) => s.id === id);
  if (i < 0 || !isDark(homeSections[i])) return { top: false, bottom: false };
  const prev = homeSections[i - 1];
  const next = homeSections[i + 1];
  return { top: !!prev && !isDark(prev), bottom: !!next && !isDark(next) };
}

export function Section({ tone = "night", className, children, ...props }: SectionProps) {
  const edges = roundedEdges(props.id);
  const rounded = edges.top || edges.bottom;

  return (
    <section
      className={cn(
        "relative scroll-mt-16 py-20 sm:py-28 lg:py-36",
        tones[tone],
        rounded && "isolate bg-paper",
        className,
      )}
      {...props}
    >
      {rounded && (
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 bg-background",
            edges.top && "rounded-t-[2.5rem] sm:rounded-t-[3.5rem]",
            edges.bottom && "rounded-b-[2.5rem] sm:rounded-b-[3.5rem]",
          )}
        />
      )}
      {children}
    </section>
  );
}
