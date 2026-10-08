"use client";

// SparklesCore — efekt iskier (Aceternity / 21st.dev), przeniesiony na tsParticles v4:
// silnik ładuje ParticlesProvider (zamiast initParticlesEngine z v3), opcje są
// zapamiętane (v4 przeładowuje efekt przy każdej zmianie `options`), a animacja
// pojawienia się używa `motion/react` (to samo co framer-motion, już w projekcie).
import { useCallback, useId, useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { motion, useAnimation } from "motion/react";
import { cn } from "@/lib/utils";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

// Stała referencja — ParticlesProvider wymaga tej samej funkcji przez cały cykl życia aplikacji.
const initEngine = async (engine: Engine) => {
  await loadSlim(engine);
};

export const SparklesCore = (props: ParticlesProps) => {
  const { id, className, background, minSize, maxSize, speed, particleColor, particleDensity } = props;
  const controls = useAnimation();
  const generatedId = useId();

  const particlesLoaded = useCallback(
    async (container?: Container) => {
      if (container) controls.start({ opacity: 1, transition: { duration: 1 } });
    },
    [controls],
  );

  const options = useMemo<ISourceOptions>(
    () => ({
      background: { color: { value: background || "#0d47a1" } },
      fullScreen: { enable: false, zIndex: 1 },
      fpsLimit: 120,
      particles: {
        color: { value: particleColor || "#ffffff" },
        move: {
          enable: true,
          direction: "none",
          outModes: { default: "out" },
          random: false,
          straight: false,
          speed: { min: 0.1, max: 1 },
        },
        number: {
          density: { enable: true, width: 400, height: 400 },
          value: particleDensity || 120,
        },
        opacity: {
          value: { min: 0.1, max: 1 },
          animation: { enable: true, speed: speed || 4, sync: false, startValue: "random" },
        },
        shape: { type: "circle" },
        size: { value: { min: minSize || 1, max: maxSize || 3 } },
      },
      detectRetina: true,
    }),
    [background, particleColor, particleDensity, speed, minSize, maxSize],
  );

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      <ParticlesProvider init={initEngine}>
        <Particles
          id={id || generatedId}
          className="h-full w-full"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      </ParticlesProvider>
    </motion.div>
  );
};
