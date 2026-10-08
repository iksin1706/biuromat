import fs from "node:fs";
import path from "node:path";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getSection } from "@/content/home";
import { caseStudies, caseStudiesSection } from "@/content/case-studies";
import { CaseStudiesSlider } from "./case-studies-slider";
import { Reveal } from "@/components/motion/reveal";

// Brak portretu w public/ = placeholder (sylwetka) zamiast pustego <img>.
const exists = (publicPath: string) => fs.existsSync(path.join(process.cwd(), "public", publicPath));

export function CaseStudies() {
  const meta = getSection("case-studies");
  const items = caseStudies.map((c) => ({ ...c, hasImage: exists(c.image) }));

  return (
    <Section id={meta.id} tone={meta.tone} aria-labelledby={`${meta.id}-title`}>
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 id={`${meta.id}-title`} className="text-h2">
              {caseStudiesSection.title}
            </h2>
            <p className="mt-4 text-lead text-muted-foreground">{caseStudiesSection.subtitle}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1} y={32}>
          <CaseStudiesSlider items={items} />
        </Reveal>
        <p className="mt-6 text-xs text-muted-foreground">{caseStudiesSection.disclaimer}</p>
      </Container>
    </Section>
  );
}
