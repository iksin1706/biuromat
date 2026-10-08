"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeftRight,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  FileArchive,
  FileInput,
  FileText,
  ShieldCheck,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { audiences, audienceSection, type AudienceId, type Benefit } from "@/content/audience";
import { getSection } from "@/content/home";
import { primaryCta } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

const icons: Record<Benefit["icon"], LucideIcon> = {
  invoice: FileText,
  ksef: ShieldCheck,
  warehouse: Warehouse,
  team: Users,
  costs: FileInput,
  zip: FileArchive,
  export: ArrowLeftRight,
  clients: Building2,
};

const tabIcons: Record<AudienceId, LucideIcon> = { firmy: Building2, biura: BriefcaseBusiness };

export function Audience() {
  const meta = getSection("dla-kogo");
  const [active, setActive] = useState<AudienceId>("firmy");
  const tabsRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  // Czy użytkownik już przełączał zakładki — wcześniej panel pokazuje się bez animacji
  const [switched, setSwitched] = useState(false);
  const select = (id: AudienceId) => {
    setSwitched(true);
    setActive(id);
  };

  // Klawiatura: strzałki przełączają zakładki (wzorzec ARIA tabs)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const i = audiences.findIndex((a) => a.id === active);
    const next = audiences[(i + (e.key === "ArrowRight" ? 1 : -1) + audiences.length) % audiences.length];
    select(next.id);
    tabsRef.current?.querySelector<HTMLButtonElement>(`[data-tab="${next.id}"]`)?.focus();
  };

  return (
    <Section id={meta.id} tone={meta.tone} aria-labelledby={`${meta.id}-title`}>
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id={`${meta.id}-title`} className="text-h2">
            {audienceSection.title}
          </h2>
          <p className="mt-4 text-lead text-muted-foreground">{audienceSection.subtitle}</p>
        </Reveal>

        {/* Przełącznik segmentów */}
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Wybierz, jak pracujesz"
          onKeyDown={onKeyDown}
          className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-1 rounded-2xl bg-background p-1.5 ring-1 ring-inset ring-border"
        >
          {audiences.map((a) => {
            const selected = a.id === active;
            const Icon = tabIcons[a.id];
            return (
              <button
                key={a.id}
                data-tab={a.id}
                role="tab"
                id={`${uid}-tab-${a.id}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel-${a.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(a.id)}
                className={cn(
                  "relative flex items-center justify-center gap-3 rounded-xl px-4 py-3 text-left transition-colors sm:px-6",
                  selected ? "text-white" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId={`${uid}-pill`}
                    className="primary-surface absolute inset-0 rounded-xl"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <Icon className="relative size-5 shrink-0" aria-hidden />
                <span className="relative min-w-0">
                  <span className="block text-[0.9375rem] font-semibold sm:text-body">{a.tab}</span>
                  <span
                    className={cn(
                      "hidden truncate text-xs sm:block",
                      selected ? "text-white/75" : "text-muted-foreground",
                    )}
                  >
                    {a.tabHint}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Panele korzyści — wszystkie w HTML (SEO, crawlery AI bez JS), nieaktywne z `hidden`.
            Animacja wejścia dopiero po pierwszym przełączeniu (zmiana klucza ją odtwarza). */}
        {audiences.map((a) => {
          const selected = a.id === active;
          return (
            <div
              key={a.id}
              id={`${uid}-panel-${a.id}`}
              role="tabpanel"
              aria-labelledby={`${uid}-tab-${a.id}`}
              hidden={!selected}
              className="mt-12 min-h-88"
            >
              <motion.div
                key={selected ? "on" : "off"}
                initial={switched && selected ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.22 } }}
              >
                <p className="mx-auto max-w-2xl text-center text-lead">{a.lead}</p>

                <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {a.benefits.map((b, i) => {
                    const Icon = icons[b.icon];
                    return (
                      <motion.li
                        key={b.title}
                        initial={switched && selected ? { opacity: 0, y: 12 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, delay: 0.03 + i * 0.04 }}
                        className="rounded-2xl bg-card p-6 ring-1 ring-inset ring-border"
                      >
                        <span className="grid size-10 place-items-center rounded-md bg-blue-500/15 text-link">
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <h3 className="mt-5 text-xl leading-snug font-bold tracking-[-0.015em]">{b.title}</h3>
                        <p className="mt-2 text-[0.9375rem] text-muted-foreground">{b.text}</p>
                      </motion.li>
                    );
                  })}
                </ul>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                  <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
                  <Link href={a.more.href} className="group inline-flex items-center gap-1 font-semibold text-link">
                    {a.more.label}
                    <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </div>
              </motion.div>
            </div>
          );
        })}
      </Container>
    </Section>
  );
}
