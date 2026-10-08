"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { company, loginLink, mainNav, primaryCta } from "@/content/site";

// Pasek jak w Apple: niski, półprzezroczysty granat z blur; po przewinięciu ciemnieje.
// Mobile: przycisk menu otwiera pełnoekranowy panel z linkami do sekcji.
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Otwarte menu: blokada przewijania strony, Esc zamyka, poszerzenie okna do desktopu zamyka
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  // Scroll spy: podświetlenie linku sekcji, która jest na środku ekranu
  const [activeHref, setActiveHref] = useState<string | null>(null);
  useEffect(() => {
    const targets = mainNav
      .map((l) => document.getElementById(l.href.split("#")[1] ?? ""))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActiveHref(`/#${hit.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const close = () => setOpen(false);

  return (
    <>
    <header
      className={cn(
        "night sticky top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300",
        scrolled || open ? "border-border bg-navy-950/85" : "border-transparent bg-navy-950/50",
      )}
    >
      <Container className="flex h-14 items-center gap-8">
        <Link href="/" aria-label="Biuromat — strona główna" className="text-white" onClick={close}>
          <Logo className="h-5.5" />
        </Link>

        <nav aria-label="Główna" className="hidden items-center gap-7 text-sm text-foreground/75 lg:flex">
          {mainNav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={activeHref === l.href ? "location" : undefined}
              className={cn(
                "transition-colors hover:text-foreground",
                activeHref === l.href && "text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ButtonLink href={loginLink.href} variant="ghost" size="sm" className="hidden lg:inline-flex">
            {loginLink.label}
          </ButtonLink>
          <ButtonLink href={primaryCta.href} size="sm" className="hidden sm:inline-flex">
            {primaryCta.label}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            className="-mr-2 grid size-10 place-items-center rounded-lg text-foreground transition-colors hover:bg-white/8 lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.15 }}
              >
                {open ? <X className="size-6" /> : <Menu className="size-6" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </Container>

    </header>

      {/* Panel menu mobilnego — POZA <header>: backdrop-filter nagłówka tworzy blok zawierający
          dla elementów fixed, więc panel w środku nie byłby pozycjonowany względem okna */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2 }}
            className="night fixed inset-x-0 top-14 bottom-0 z-40 overflow-y-auto bg-navy-950 text-foreground lg:hidden"
          >
            <Container className="flex min-h-full flex-col pt-6 pb-10">
              <nav aria-label="Menu" className="flex flex-col">
                {mainNav.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.04 * i + 0.05, duration: 0.3 } }}
                  >
                    <Link
                      href={l.href}
                      onClick={close}
                      className="flex items-center justify-between border-b border-border py-4 text-2xl font-bold tracking-[-0.02em]"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="mt-auto flex flex-col gap-3 pt-10"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.3 } }}
              >
                <ButtonLink href={primaryCta.href} size="lg" onClick={close}>
                  {primaryCta.label}
                </ButtonLink>
                <ButtonLink href={loginLink.href} size="lg" variant="secondary" onClick={close}>
                  {loginLink.label}
                </ButtonLink>
                <a
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground"
                >
                  <Phone className="size-4 text-link" aria-hidden />
                  {company.phone} · {company.supportHours}
                </a>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
