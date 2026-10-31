"use client";

import { useEffect, useRef } from "react";

const pad = (value: number) => String(value).padStart(2, "0");

/** A running 24fps SMPTE-style timecode, purely decorative. */
export default function Timecode({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = performance.now();
    let frame = requestAnimationFrame(function update(now) {
      const totalFrames = Math.floor(((now - start) / 1000) * 24);
      const frames = totalFrames % 24;
      const seconds = Math.floor(totalFrames / 24) % 60;
      const minutes = Math.floor(totalFrames / (24 * 60)) % 60;
      const hours = Math.floor(totalFrames / (24 * 3600));
      el.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
      frame = requestAnimationFrame(update);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`} aria-hidden="true">
      00:00:00:00
    </span>
  );
}
