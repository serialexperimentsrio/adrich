"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import ProjectPoster from "@/components/ProjectPoster";
import { type PortfolioFilter, type PortfolioItem, portfolioFilters } from "@/data/site";

/** Filterable grid of project posters. */
export default function WorkGallery({ items }: { items: PortfolioItem[] }) {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>("All");

  const filtered = useMemo(
    () => (activeFilter === "All" ? items : items.filter((item) => item.tags.includes(activeFilter))),
    [activeFilter, items],
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects">
        {portfolioFilters.map((filter) => {
          const count =
            filter === "All" ? items.length : items.filter((item) => item.tags.includes(filter)).length;
          return (
            <button
              key={filter}
              type="button"
              className="chip"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter}
              <sup className="opacity-60">{count}</sup>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {filtered.length} projects
      </p>

      <motion.ul layout className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => {
            const index = items.indexOf(item);
            return (
              <motion.li
                key={item.slug}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={index % 3 === 1 ? "lg:translate-y-16" : undefined}
              >
                <ProjectPoster item={item} index={index} />
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <p className="text-lg font-medium leading-tight">{item.title}</p>
                  <p className="mono shrink-0 text-ink-mute">{item.year}</p>
                </div>
                <p className="mt-1 text-ink-soft">{item.summary}</p>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
