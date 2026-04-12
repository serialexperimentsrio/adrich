import type { Metadata } from "next";
import Image from "next/image";
import SectionIntro from "@/components/SectionIntro";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { companyProfile, teamMembers, timeline, values, founderProfile } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Adrich evolved from a traditional production house into a full-service campaign agency based in Dhaka.",
};

export default function AboutPage() {
  return (
    <>
      <section className="section-y border-b border-slate-200 bg-white">
        <div className="container-swiss">
          <Reveal>
            <SectionIntro
              title="A campaign partner built on craft and discipline"
              description="Founded in 1997 in Dhaka, Adrich has evolved from traditional production roots into a modern agency integrating strategy, design, production, and digital media performance."
              titleAs="h1"
              align="center"
              showDivider
            />
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-surface-0">
        <div className="container-swiss">
          <Reveal>
            <div className="grid-12 items-center gap-y-6">
              <div className="col-span-12 md:col-span-4">
                <div className="decorative-frame w-full max-w-[320px] aspect-square mx-auto relative overflow-hidden">
                  <Image
                    src={founderProfile.photo}
                    alt={`${founderProfile.name}, ${founderProfile.title}`}
                    fill
                    sizes="320px"
                    unoptimized
                    className="object-cover"
                    priority
                    quality={100}
                  />
                </div>
              </div>

              <div className="col-span-12 md:col-span-8">
                <h3 className="font-display text-2xl font-semibold text-ink-900">{founderProfile.name}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-700">{founderProfile.title}</p>
                <p className="mt-4 text-sm leading-7 text-ink-700">{founderProfile.bio}</p>
                <a
                  href={founderProfile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline-link"
                >
                  View LinkedIn profile
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y border-t border-slate-200 bg-white">
        <div className="container-swiss">
          <div className="grid-12 gap-y-6">
            <Reveal className="col-span-12 md:col-span-6 md:border-r md:border-slate-200 md:pr-8">
              <article className="h-full">
                <p className="text-kicker">Mission</p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-ink-900">
                  Build campaigns that influence real decisions.
                </h2>
                <p className="mt-3 text-sm leading-7 text-ink-700">
                  We combine strategic thinking, premium production, and channel execution to help brands communicate
                  with clarity and convert attention into action.
                </p>
              </article>
            </Reveal>

            <Reveal className="col-span-12 md:col-span-6 md:pl-8">
              <article className="h-full">
                <p className="text-kicker">Vision</p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-ink-900">
                  Be the most trusted creative growth partner in Bangladesh.
                </h2>
                <p className="mt-3 text-sm leading-7 text-ink-700">
                  We aim to define a regional benchmark for integrated campaign quality where strategic rigor and
                  creative ambition stay perfectly aligned.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-y border-y border-slate-200 bg-white">
        <div className="container-swiss">
          <div className="max-w-3xl">
            <p className="text-kicker">Timeline</p>
            <h2 className="section-title mt-4 text-ink-900">1997 to Today</h2>
            <p className="mt-4 text-base leading-8 text-ink-700">
              From Dhaka headquarters to cross-platform campaign delivery, the agency has scaled steadily while keeping
              creative standards uncompromised.
            </p>
          </div>

          <div className="mt-10 grid-12 gap-y-4">
            {timeline.map((milestone) => (
              <Reveal key={milestone.year} className="col-span-12 md:col-span-6">
                <article className="rule-item h-full">
                  <p className="text-kicker">{milestone.year}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink-900">{milestone.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-700">{milestone.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-swiss">
          <div className="max-w-3xl">
            <p className="text-kicker">Values</p>
            <h2 className="section-title mt-4 text-ink-900">The standards behind every campaign</h2>
          </div>

          <div className="mt-10 grid-12 gap-y-6">
            {values.map((value) => (
              <Reveal key={value.title} className="col-span-12 md:col-span-3">
                <article className="rule-item h-full">
                  <h3 className="font-display text-xl font-semibold text-ink-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-700">{value.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-y border-slate-200 bg-white">
        <div className="container-swiss">
          <div className="max-w-3xl">
            <p className="text-kicker">Team</p>
            <h2 className="section-title mt-4 text-ink-900">Leadership driving strategy and execution</h2>
          </div>

          <div className="mt-10 grid-12 gap-y-6">
            {teamMembers.map((member) => (
              <Reveal key={member.name} className="col-span-12 md:col-span-6 lg:col-span-3">
                <article className="rule-item h-full">
                  <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-sm border border-slate-200 font-display text-xs font-semibold text-ink-700">
                    {member.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink-900">{member.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.09em] text-ink-600">{member.role}</p>
                  <p className="mt-3 text-sm leading-7 text-ink-700">{member.bio}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mt-10 text-sm text-ink-700">
            Headquarters: {companyProfile.address}
          </p>
        </div>
      </section>

      <CTASection
        title="Ready to shape your brand narrative?"
        description="Partner with Adrich to build strategic, production-ready campaigns that hold attention and drive action."
      />
    </>
  );
}
