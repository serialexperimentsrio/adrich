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
    <article className="portfolio-row pt-8 transition-colors">
      <div className="grid-12 items-start gap-y-6">
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-slate-900">
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
                  className="object-cover opacity-80 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 35vw, 25vw"
                  loading={priority ? "eager" : "lazy"}
                />
                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-sm bg-black/50 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                  <Play size={10} aria-hidden="true" fill="currentColor" />
                  Project Reel
                </div>
              </>
            )}
          </div>
        </div>

        <div className="col-span-12 md:col-span-7 lg:col-span-8 flex flex-col h-full">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink-600">{item.year}</span>
              <span className="h-px w-4 bg-slate-300"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink-600">{item.category}</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-ink-500">{item.client}</p>
          </div>
          
          <div className="mt-4 flex-1">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink-900 lg:text-3xl">
              <Link href={`/work/${item.slug}`} className="hover:underline decoration-slate-300 underline-offset-4">
                {item.title}
              </Link>
            </h3>
            <p className="mt-4 max-w-2xl text-[0.92rem] leading-relaxed text-ink-700">
              {item.summary}
            </p>
          </div>

          <div className="mt-6">
            <Link
              href={`/work/${item.slug}`}
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-ink-900 transition hover:text-ink-600"
            >
              Case Study
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
