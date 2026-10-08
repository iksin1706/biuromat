"use client";

import { motion, type Variants } from "motion/react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

/**
 * Lista, której elementy wyłaniają się po kolei przy wejściu w widok (raz).
 * Dzieci owijaj w <StaggerItem>. Treść jest w HTML od początku (SEO), animuje się tylko wygląd.
 */
export function Stagger({
  children,
  className,
  step = 0.06,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  step?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: step, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
