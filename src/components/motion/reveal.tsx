"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const ease = [0.25, 0.1, 0.25, 1] as const;

/**
 * Delikatne wyłonienie przy wejściu w widok (raz). Do nagłówków sekcji i bloków bez
 * własnej animacji — nie do wszystkiego (DESIGN.md: bez fade-up na każdej sekcji).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animacja sprzężona z przewijaniem: blok rośnie z `from` do 1, gdy wjeżdża na ekran
 * (od dołu ekranu do ~40% wysokości). Dla ciemnych „wysp” — karta zaufania, panel CTA.
 */
export function ScrollScale({
  children,
  className,
  from = 0.94,
}: {
  children: React.ReactNode;
  className?: string;
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 40%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [from, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.4, 1]);

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { scale, opacity }}>
      {children}
    </motion.div>
  );
}
