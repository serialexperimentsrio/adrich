import type { ReactNode } from "react";

/** The ring from the logo (the dot of the "i"), used between ticker items. */
export function Ring({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`inline-block h-[0.42em] w-[0.42em] ${className ?? ""}`} aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="3.5" />
    </svg>
  );
}

type MarqueeProps = {
  items: readonly ReactNode[];
  className?: string;
  /** Seconds for one full loop. */
  duration?: number;
  separator?: ReactNode;
};

/** An endlessly scrolling ticker. The track is duplicated so the loop is seamless. */
export default function Marquee({ items, className, duration = 40, separator = <Ring /> }: MarqueeProps) {
  const track = (hidden: boolean) => (
    <div className="marquee__track" aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <span key={index} className="flex items-center">
          <span className="px-6 md:px-10">{item}</span>
          <span className="text-red" aria-hidden="true">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee ${className ?? ""}`} style={{ ["--marquee-duration" as string]: `${duration}s` }}>
      {track(false)}
      {track(true)}
    </div>
  );
}
