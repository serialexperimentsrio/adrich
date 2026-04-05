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
      <section className="section-y bg-white">
        <div className="container-swiss">
          <Link href="/work" className="btn-base btn-secondary mb-12 inline-flex font-bold">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Case Studies
          </Link>

          <div className="grid-12 gap-y-12">
            <div className="col-span-12 lg:col-span-8">
              <span className="text-kicker">{project.category}</span>
              <h1 className="hero-title mt-4 text-ink-900">{project.title}</h1>
              <p className="mt-8 text-xl font-medium leading-relaxed text-ink-800 lg:text-2xl">
                {project.summary}
              </p>
            </div>

            <div className="col-span-12 lg:col-span-4">
              <div className="rule-top-heavy">
                <p className="text-kicker">Project Context</p>
                <dl className="mt-6 space-y-6 text-[0.92rem]">
                  <div className="flex flex-col gap-1">
                    <dt className="font-bold text-ink-900">Client</dt>
                    <dd className="text-ink-700">{project.client}</dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="font-bold text-ink-900">Year</dt>
                    <dd className="text-ink-700">{project.year}</dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="font-bold text-ink-900">Distribution</dt>
                    <dd className="text-ink-700">{project.tags.join(", ")}</dd>
                  </div>
                </dl>
                <div className="mt-10">
                  <RequestProposalButton className="w-full justify-center" serviceTitle={project.title} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y-tight border-t-2 border-slate-300">
        <div className="container-swiss">
          <div className="grid-12 gap-y-12">
            <div className="col-span-12 lg:col-span-8">
              <div className="aspect-[16/9] overflow-hidden rounded-sm border-2 border-slate-300 bg-slate-900">
                <div className="relative h-full w-full">
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title} showcase`}
                    fill
                    className="object-cover opacity-60"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-sm border-2 border-white/20 bg-black/40 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                      {project.videoPlaceholder}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col gap-12">
              {project.brief && (
                <div className="rule-top">
                  <p className="text-kicker">The Brief</p>
                  <p className="mt-4 text-[0.92rem] leading-relaxed text-ink-700">
                    {project.brief}
                  </p>
                </div>
              )}
              {project.outcome && (
                <div className="rule-top">
                  <p className="text-kicker">The Outcome</p>
                  <p className="mt-4 text-[0.92rem] leading-relaxed text-ink-700">
                    {project.outcome}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Start your campaign with Adrich"
        description="Share your audience, objective, and launch date. We will align strategy, production, and media to deliver impact."
      />
    </>
  );
}
