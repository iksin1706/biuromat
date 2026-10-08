"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Płótno o stałych wymiarach (px), skalowane do szerokości rodzica.
 * Makiety projektujemy raz w „pikselach ekranu”, a tu dopasowujemy je jak zrzut.
 */
export function FitCanvas({
  width,
  height,
  className,
  children,
}: {
  width: number;
  height: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.9);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / width));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={ref} className={cn("relative w-full", className)} style={{ height: height * scale }}>
      <div
        className="absolute top-0 left-1/2 origin-top"
        style={{ width, height, transform: `translateX(-50%) scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
