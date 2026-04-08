"use client";

import { useMemo, useState } from "react";
import PortfolioCard from "@/components/PortfolioCard";
import Reveal from "@/components/Reveal";
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
            className={`btn-chip ${activeFilter === filter ? "btn-chip-active" : ""}`.trim()}
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
          >
            {filter}
          </button>
        ))}
      </div>

      <div key={activeFilter} className="filter-results-enter">
        {filteredItems.length > 0 ? (
          <div className="space-y-1">
            {filteredItems.map((item, index) => (
              <Reveal key={item.slug}>
                <PortfolioCard item={item} priority={index < 2} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rule-item text-sm text-ink-700">
            No entries in this category yet. Please choose another filter to explore more work.
          </div>
        )}
      </div>
    </div>
  );
}
