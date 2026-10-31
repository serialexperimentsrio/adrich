import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import ProjectPoster from "@/components/ProjectPoster";
import RequestProposalButton from "@/components/RequestProposalButton";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import SplitText from "@/components/SplitText";
import { portfolioItems, serviceForCategory, youtubeUrls } from "@/data/site";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioItems.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: `${project.title}: ${project.category} by Adrich for ${project.client}. ${project.summary}`,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const index = portfolioItems.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();

  const project = portfolioItems[index];
  const nextIndex = (index + 1) % portfolioItems.length;
  const next = portfolioItems[nextIndex];
  const video = project.youtubeId ? youtubeUrls(project.youtubeId) : null;

  return (
    <>
      <header className="container-x pt-36 pb-14 md:pt-44">
        <div className="caption flex flex-wrap items-center justify-between gap-4 text-ink-mute">
          <Link href="/work" className="link-u text-ink">
            ← All work
          </Link>
          <span>
            № {String(index + 1).padStart(2, "0")} / {String(portfolioItems.length).padStart(2, "0")}
          </span>
        </div>
        <p className="serif mt-12 text-3xl text-ink-soft">{project.client}</p>
        <SplitText as="h1" immediate delay={0.1} text={project.title} className="display display-lg mt-2 max-w-[16ch]" />
      </header>

      {/* Screening room */}
      <section className="bg-night py-16 text-paper md:py-24" aria-label="Film">
        <div className="container-x">
          <div className="caption mb-6 flex items-center justify-between text-paper/50">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red" aria-hidden="true" /> Now playing
            </span>
            <span>
              {project.category} · {project.year}
            </span>
          </div>
          <div className="sprockets bg-night-2 px-4 py-12 [--sprocket-color:var(--color-night)] md:px-10">
            {video ? (
              <div className="relative mx-auto aspect-video w-full max-w-6xl overflow-hidden bg-night">
                <iframe
                  src={video.embed}
                  title={`Film: ${project.title}`}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            ) : (
              <div className="mx-auto flex aspect-video w-full max-w-6xl flex-col items-center justify-center gap-3 text-center">
                <p className="display display-sm text-paper/80">Film coming soon</p>
                <p className="text-paper/50">We are uploading this one.</p>
              </div>
            )}
          </div>
          {video ? (
            <p className="caption mt-6 text-paper/60">
              <a href={video.watch} target="_blank" rel="noopener noreferrer" className="link-u text-paper">
                Watch on YouTube ↗
              </a>
            </p>
          ) : null}
        </div>
      </section>

      <section className="container-x section">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <SectionLabel index="i" label="About the project" />
            <p className="mt-8 text-[clamp(1.5rem,2.6vw,2.4rem)] font-medium leading-[1.2] tracking-[-0.01em]">
              {project.summary}
            </p>
          </Reveal>
          <Reveal className="md:col-span-4 md:col-start-9" delay={0.1}>
            <dl className="caption divide-y divide-ink/15 border-y border-ink/15">
              {[
                ["Client", project.client],
                ["Year", project.year],
                ["Category", project.category],
                ["Formats", project.tags.join(", ")],
              ].map(([term, value]) => (
                <div key={term} className="flex justify-between gap-4 py-3">
                  <dt className="text-ink-mute">{term}</dt>
                  <dd className="text-right">{value}</dd>
                </div>
              ))}
            </dl>
            <RequestProposalButton
              className="mt-8 w-full justify-center"
              serviceTitle={serviceForCategory(project.category)}
              label="Make something like this"
            />
          </Reveal>
        </div>
      </section>

      {/* Next project */}
      <section className="border-t border-ink/15">
        <div className="container-x grid items-center gap-10 py-20 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="caption text-ink-mute">Next project</p>
            <Link href={`/work/${next.slug}`} className="group mt-4 block">
              <span className="display display-md block transition-colors duration-500 group-hover:text-red">
                {next.title} →
              </span>
            </Link>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <ProjectPoster item={next} index={nextIndex} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
