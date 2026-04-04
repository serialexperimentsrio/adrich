import Link from "next/link";
import Image from "next/image";
import { Play, ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/data/site";

type PortfolioCardProps = {
  item: PortfolioItem;
  priority?: boolean;
};

export default function PortfolioCard({ item, priority = false }: PortfolioCardProps) {
  return (
    <article className="portfolio-row">
      <div className="grid-12 items-start gap-y-4">
        <div className="col-span-12 md:col-span-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-slate-300 bg-slate-900">
            <Image
              src={item.thumbnail}
              alt={`${item.title} thumbnail`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 35vw, 25vw"
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
            />
            <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-sm border border-white/30 bg-black/45 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
              <Play size={10} aria-hidden="true" />
              Reel
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="label-chip">{item.category}</span>
            <span className="text-xs uppercase tracking-[0.1em] text-ink-600">{item.year}</span>
          </div>
          <h3 className="mt-3 font-display text-2xl font-semibold text-ink-900">{item.title}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.08em] text-ink-600">Client: {item.client}</p>
          <p className="mt-3 text-sm leading-7 text-ink-700">{item.summary}</p>
          <Link
            href={`/work/${item.slug}`}
            className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.1em] text-ink-900"
          >
            View Case Details
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
