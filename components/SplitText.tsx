"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";

type SplitTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** A word to set in the italic serif accent style (punctuation ignored). */
  accent?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
};

/** Reveals text word by word, each word sliding up from behind a mask. */
export default function SplitText({
  text,
  as: Tag = "p",
  className,
  accent,
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: SplitTextProps) {
  const words = text.split(" ");
  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        className="inline"
        initial="hidden"
        {...trigger}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className={`inline-block ${accent && word.replace(/[.,!?]/g, "") === accent ? "serif text-red" : ""}`}
              variants={{
                hidden: { y: "110%", rotate: 4 },
                show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {word}
            </motion.span>
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
