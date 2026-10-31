import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { newsItems } from "@/data/site";

export const metadata: Metadata = {
  title: "News",
  description: "Recent launches and releases from Adrich.",
};

export default function NewsPage() {
  return (
    <>
      <PageHeader index="N" label="News" title="Latest from the studio" accent="studio" />

      <section className="container-x pb-32">
        <ol className="border-b border-ink/15">
          {newsItems.map((item, index) => (
            <li key={item.slug} className="border-t border-ink/15">
              <Reveal delay={index * 0.05}>
                <Link href={item.href} className="group grid gap-3 py-10 md:grid-cols-12 md:items-baseline">
                  <p className="mono text-ink-mute md:col-span-2">{item.date}</p>
                  <h2 className="display text-[clamp(1.9rem,4vw,3.5rem)] transition-colors duration-500 group-hover:text-red md:col-span-6">
                    {item.title}
                  </h2>
                  <p className="text-lg leading-snug text-ink-soft md:col-span-3">{item.summary}</p>
                  <span
                    className="mono hidden justify-self-end transition-transform duration-500 group-hover:-rotate-45 md:col-span-1 md:block"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <CTASection />
    </>
  );
}
