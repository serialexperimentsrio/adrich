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
    <article className="portfolio-row group relative overflow-hidden rounded-sm border-2 border-transparent px-4 py-10 transition-all duration-300 hover:border-slate-200 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
      <div className="grid-12 items-start gap-y-6">
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-slate-900 shadow-inner">
            {item.embedSrc ? (
              <iframe
                src={item.embedSrc}
                title={`${item.title} embed`}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <>
                <Image
                  src={item.thumbnail}
                  alt={`${item.title} thumbnail`}
                  fill
                  className="object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 35vw, 25vw"
                  loading={priority ? "eager" : "lazy"}
                />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-sm bg-black/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md border border-white/10">
                  <Play size={12} aria-hidden="true" fill="currentColor" />
                  Project Reel
                </div>
              </>
            )}
          </div>
        </div>

        <div className="col-span-12 md:col-span-7 lg:col-span-8 flex flex-col h-full">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-ink-600">{item.year}</span>
              <span className="h-px w-6 bg-slate-200"></span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-ink-600">{item.category}</span>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-ink-400">{item.client}</p>
          </div>
          
          <div className="mt-5 flex-1">
            <h3 className="font-display text-2xl font-bold tracking-tight text-ink-900 lg:text-3xl">
              <Link href={`/work/${item.slug}`} className="transition-colors hover:text-brand-red">
                {item.title}
              </Link>
            </h3>
            <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-ink-700">
              {item.summary}
            </p>
          </div>

          <div className="mt-8">
            <Link
              href={`/work/${item.slug}`}
              className="group/link inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-ink-900 transition hover:text-brand-red"
            >
              Case Study
              <ArrowUpRight size={16} aria-hidden="true" className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
