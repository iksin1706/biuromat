import { Building2, Headset, Lock, ShieldCheck, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getSection } from "@/content/home";
import { company } from "@/content/site";
import { trustFacts, type TrustFact } from "@/content/trust";
import { cn } from "@/lib/utils";
import { ScrollScale } from "@/components/motion/reveal";
import { SparklesCore } from "@/components/ui/sparkles";

const icons: Record<TrustFact["icon"], LucideIcon> = {
  ksef: ShieldCheck,
  eu: Lock,
  company: Building2,
  support: Headset,
};

// Fakty o zaufaniu jako ciemna „wyspa” na jasnym tle — jasne sekcje obok płyną dalej,
// a karta oddziela je bez przecinania strony pasem na całą szerokość.
export function TrustBar() {
  const meta = getSection("zaufanie");

  return (
    <section id={meta.id} aria-label="Dlaczego warto zaufać Biuromatowi" className={cn(meta.tone, "bg-background")}>
      <Container>
        <ScrollScale>
        <div className="night relative overflow-hidden rounded-3xl bg-navy-950 px-6 py-10 text-foreground ring-1 ring-inset ring-white/8 sm:px-10 lg:px-12 lg:py-12">
          {/* Poświata w rogu — głębia bez gradientowego tła całej karty */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -left-24 size-96 rounded-full bg-blue-500/20 blur-[100px]"
          />
          {/* Iskry jak w pasie liczb — rzadkie i wolne, wygaszane ku krawędziom; bez ruchu przy reduced motion */}
          <div aria-hidden className="pointer-events-none absolute inset-0 motion-reduce:hidden">
            <SparklesCore
              id="trust-sparkles"
              background="transparent"
              minSize={0.4}
              maxSize={1.1}
              particleDensity={60}
              speed={1}
              particleColor="#b4c3ee"
              className="h-full w-full mask-[radial-gradient(ellipse_75%_90%_at_50%_50%,white_25%,transparent)]"
            />
          </div>
          <ul className="relative grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10">
            {trustFacts.map((f) => {
              const Icon = icons[f.icon];
              return (
                <li key={f.icon} className="flex flex-col items-center text-center lg:px-8">
                  <Icon className="size-10 text-blue-300" aria-hidden strokeWidth={1.4} />
                  <p className="mt-5 font-semibold">{f.title}</p>
                  <p className="mt-1 max-w-[30ch] text-sm text-muted-foreground">{f.text}</p>
                  {f.icon === "support" && (
                    <p className="mt-1 flex flex-col text-sm">
                      <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="text-link hover:underline">
                        {company.phone}
                      </a>
                      <a href={`mailto:${company.email}`} className="text-link hover:underline">
                        {company.email}
                      </a>
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        </ScrollScale>
      </Container>
    </section>
  );
}
