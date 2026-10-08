"use client";

import { MotionConfig } from "motion/react";

/** Motion respektuje prefers-reduced-motion. Ruch cichy: ~200 ms, ease-out, bez odbić. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.24 }}>
      {children}
    </MotionConfig>
  );
}
