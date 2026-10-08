import fs from "node:fs";
import path from "node:path";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getSection } from "@/content/home";
import { howItWorks } from "@/content/how-it-works";
import { HowItWorksPlayer } from "./how-it-works-player";

// Sprawdzane przy renderze na serwerze (strona statyczna → przy buildzie):
// brak pliku nagrania = placeholder w telefonie zamiast pustego <video>.
const exists = (publicPath: string) => fs.existsSync(path.join(process.cwd(), "public", publicPath));

export function HowItWorks() {
  const meta = getSection("jak-to-dziala");
  const steps = howItWorks.steps.map((s) => ({
    ...s,
    hasVideo: exists(s.video),
    hasPoster: exists(s.poster),
  }));

  return (
    <Section id={meta.id} tone={meta.tone} aria-labelledby={`${meta.id}-title`}>
      <Container>
        <HowItWorksPlayer title={howItWorks.title} subtitle={howItWorks.subtitle} steps={steps} titleId={`${meta.id}-title`} />
      </Container>
    </Section>
  );
}
