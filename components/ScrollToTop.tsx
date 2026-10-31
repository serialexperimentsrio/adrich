"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { getLenis } from "@/lib/smoothScroll";

/** Floating round button that appears once the visitor has scrolled down, and takes them back to the top. */
export default function ScrollToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 700));

  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          title="Back to top"
          className="group fixed bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] transition-colors duration-300 hover:bg-red focus-visible:bg-red md:bottom-8 md:right-8 md:h-14 md:w-14"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <ArrowUp
            size={20}
            strokeWidth={2}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
