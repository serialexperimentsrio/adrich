import type { Metadata } from "next";
import Link from "next/link";
import SectionIntro from "@/components/SectionIntro";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { newsItems } from "@/data/site";

export const metadata: Metadata = {
  title: "News",
  description:
    "Company updates from Adrich covering campaign launches, production milestones, and creative releases.",
};

export default function NewsPage() {
  return (
    <>
      <section className="section-y border-b border-slate-200 bg-white">
        <div className="container-swiss">
          <Reveal>
            <SectionIntro
              title="Recent campaign and production updates"
              description="A running timeline of project launches and creative milestones from the Adrich portfolio."
              titleAs="h1"
              align="center"
              showDivider
            />
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-swiss">
          <div className="grid-12 gap-y-3">
            {newsItems.map((item) => (
              <Reveal key={item.slug} className="col-span-12 md:col-span-6">
                <article className="h-full pb-6">
                  <p className="text-kicker">{item.date}</p>
                  <h2 className="mt-2 font-display text-xl font-semibold text-ink-900">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-ink-700">{item.summary}</p>
                  <Link href="/work" className="mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.1em] text-ink-900">
                    View related work
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want updates from your campaign in this feed?"
        description="Collaborate with Adrich and we will build launch-ready creative systems with transparent progress reporting."
      />
    </>
  );
}
