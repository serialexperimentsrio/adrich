import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import RequestProposalButton from "@/components/RequestProposalButton";
import CTASection from "@/components/CTASection";
import { portfolioItems } from "@/data/site";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function getPortfolioItem(slug: string) {
  return portfolioItems.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioItem(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: `${project.title} by Adrich for ${project.client}.`,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = getPortfolioItem(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <section className="section-y border-b border-slate-300 bg-white">
        <div className="container-swiss">
          <Link href="/work" className="btn-base btn-secondary mb-8 inline-flex">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Work
          </Link>

          <div className="grid-12 gap-y-8">
            <div className="col-span-12 md:col-span-7">
              <p className="text-kicker">{project.category}</p>
              <h1 className="hero-title mt-4 text-ink-900">{project.title}</h1>
              <p className="mt-6 text-lg leading-8 text-ink-700">{project.summary}</p>
            </div>

            <div className="col-span-12 md:col-span-5">
              <article className="rule-item h-full">
                <p className="text-kicker">Project Details</p>
                <dl className="mt-3 space-y-3 text-sm text-ink-700">
                  <div>
                    <dt className="font-semibold text-ink-900">Client</dt>
                    <dd>{project.client}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-900">Category</dt>
                    <dd>{project.category}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-900">Year</dt>
                    <dd>{project.year}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-900">Distribution</dt>
                    <dd>{project.tags.join(", ")}</dd>
                  </div>
                </dl>
                <RequestProposalButton className="mt-4" serviceTitle={project.title} variant="secondary" />
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-swiss grid-12 gap-y-6">
          <article className="col-span-12 overflow-hidden rounded-sm border border-slate-300 bg-slate-900">
            <div className="relative aspect-[16/9]">
              <Image
                src={project.thumbnail}
                alt={`${project.title} reel`}
                fill
                className="object-cover"
                sizes="100vw"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[#0a1117]/55">
                <div className="rounded-sm border border-white/30 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white">
                  {project.videoPlaceholder}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <CTASection
        title="Start your campaign with Adrich"
        description="Share your audience, objective, and launch date. We will align strategy, production, and media to deliver impact."
      />
    </>
  );
}
