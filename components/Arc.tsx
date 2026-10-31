"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type RefObject } from "react";

type ArcProps = {
  className?: string;
  strokeWidth?: number;
  /** Draw the arc as the element scrolls through the viewport, instead of once on mount. */
  scrollLinked?: boolean;
  delay?: number;
};

// The open amber arc from the Adrich logo: roughly 300° of a circle, open at the lower left.
const ARC_PATH = "M 33 33 A 95 95 0 1 1 33 167";

/** The logo's amber arc, drawn on screen. Purely decorative. */
export default function Arc({ className, strokeWidth = 14, scrollLinked = false, delay = 0.3 }: ArcProps) {
  const ref = useRef<SVGSVGElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref as unknown as RefObject<HTMLElement | null>, offset: ["start end", "end start"] });
  const progress = useSpring(useTransform(scrollYProgress, [0.05, 0.6], [0, 1]), {
    stiffness: 90,
    damping: 30,
  });

  return (
    <svg ref={ref} viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      {scrollLinked ? (
        <motion.path
          d={ARC_PATH}
          stroke="var(--color-amber)"
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          style={{ pathLength: progress }}
        />
      ) : (
        <motion.path
          d={ARC_PATH}
          stroke="var(--color-amber)"
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1], delay }}
        />
      )}
    </svg>
  );
}
