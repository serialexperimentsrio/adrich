"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

/** Counts up from `from` to `to` the first time it scrolls into view. */
export default function CountUp({ to, from = 0, className }: { to: number; from?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = String(to);
      return;
    }
    const controls = animate(from, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        el.textContent = String(Math.round(value));
      },
    });
    return () => controls.stop();
  }, [inView, from, to]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {to}
    </span>
  );
}
