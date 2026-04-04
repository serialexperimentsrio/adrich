"use client";

import { useMemo, useState } from "react";
import PortfolioCard from "@/components/PortfolioCard";
import {
  type PortfolioFilter,
  type PortfolioItem,
  portfolioFilters,
} from "@/data/site";

type WorkGalleryProps = {
  items: PortfolioItem[];
};

export default function WorkGallery({ items }: WorkGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>("All");

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") {
      return items;
    }

    return items.filter((item) => item.tags.includes(activeFilter));
  }, [activeFilter, items]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {portfolioFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`rounded-sm border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition ${
              activeFilter === filter
                ? "border-ink-900 bg-ink-900 text-white"
                : "border-slate-300 bg-white text-ink-700 hover:border-ink-900 hover:text-ink-900"
            }`}
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
          >
            {filter}
          </button>
        ))}
      </div>

      {filteredItems.length > 0 ? (
        <div className="space-y-1">
          {filteredItems.map((item, index) => (
            <div key={item.slug}>
              <PortfolioCard item={item} priority={index < 2} />
            </div>
          ))}
        </div>
      ) : (
        <div className="rule-item text-sm text-ink-700">
          No entries in this category yet. Please choose another filter to explore more work.
        </div>
      )}
    </div>
  );
}
