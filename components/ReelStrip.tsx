"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProjectPoster from "@/components/ProjectPoster";
import SectionLabel from "@/components/SectionLabel";
import type { PortfolioItem } from "@/data/site";

/**
 * "Screening room": on large screens the section pins while the film strip of
 * projects scrolls sideways. On small screens it is a swipeable row.
 */
export default function ReelStrip({ items }: { items: PortfolioItem[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const pinned = window.matchMedia("(min-width: 1024px)").matches;
      setDistance(pinned ? Math.max(0, track.scrollWidth - window.innerWidth) : 0);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-night text-paper"
      style={{ height: distance ? `calc(100vh + ${distance}px)` : undefined }}
      aria-labelledby="reel-heading"
    >
      <div className="flex flex-col justify-center overflow-hidden py-20 lg:sticky lg:top-0 lg:h-screen lg:py-0">
        <div className="container-x">
          <SectionLabel index="02" label="Selected work" tone="paper" />
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <h2 id="reel-heading" className="display display-md">
              Now <span className="serif text-amber">showing</span>
            </h2>
            <Link href="/work" className="caption link-u text-paper/80">
              All projects ({items.length}) →
            </Link>
          </div>
        </div>

        <div className="sprockets mt-10 bg-night-2 py-8 [--sprocket-color:var(--color-night)]">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(1rem,4vw,3.5rem)] lg:w-max lg:snap-none lg:overflow-visible"
          >
            {items.map((item, index) => (
              <ProjectPoster
                key={item.slug}
                item={item}
                index={index}
                className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[min(30vw,26rem)]"
              />
            ))}
          </motion.div>
        </div>

        <div className="container-x mt-8 hidden items-center gap-4 lg:flex" aria-hidden="true">
          <span className="caption text-paper/50">Reel</span>
          <span className="relative h-px flex-1 bg-paper/15">
            <motion.span className="absolute inset-y-0 left-0 bg-amber" style={{ width: progressWidth }} />
          </span>
          <span className="caption text-paper/50">{String(items.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
