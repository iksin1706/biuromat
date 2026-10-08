import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getSection } from "@/content/home";
import { ksefSection } from "@/content/ksef";
import { KsefFlowVisual } from "./ksef-flow-visual";
import { Reveal } from "@/components/motion/reveal";

export function KsefFlow() {
  const meta = getSection("ksef");

  return (
    <Section id={meta.id} tone={meta.tone} aria-labelledby={`${meta.id}-title`} className="overflow-hidden">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id={`${meta.id}-title`} className="text-h2">
            {ksefSection.title}
          </h2>
          <p className="mt-4 text-lead text-muted-foreground">
            <span className="text-foreground">{ksefSection.hook}</span> {ksefSection.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.1} y={32}>
          <KsefFlowVisual />
        </Reveal>

        <p className="mt-14 text-center">
          <Link
            href={ksefSection.tool.href}
            className="inline-flex items-center gap-0.5 text-sm font-semibold text-link hover:underline"
          >
            {ksefSection.tool.label}
            <ChevronRight className="size-4" aria-hidden />
          </Link>
        </p>
      </Container>
    </Section>
  );
}
