import type { Metadata } from "next";
import Image from "next/image";
import Arc from "@/components/Arc";
import CTASection from "@/components/CTASection";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ScrollLitText from "@/components/ScrollLitText";
import SectionLabel from "@/components/SectionLabel";
import { companyProfile, eras, founderProfile, processSteps, yearsInBusiness } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `Adrich has made advertising in Dhaka since ${companyProfile.founded}, from TV, radio and print to digital.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        index="A"
        label="About"
        title={`In Dhaka since ${companyProfile.founded}`}
        accent="since"
        intro={`${yearsInBusiness} years of commercials, films and campaigns, from the days of TV, radio and print to the screens people carry today.`}
      />

      {/* Founder */}
      <section className="section overflow-x-clip border-t border-ink/15">
        <div className="container-x grid gap-14 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-5">
            <figure className="relative">
              <Arc
                scrollLinked
                strokeWidth={10}
                className="pointer-events-none absolute -top-[12%] -right-[14%] z-10 w-[70%]"
              />
              <div className="crop relative aspect-[912/856] text-ink">
                <Image
                  src={founderProfile.photo}
                  alt={`${founderProfile.name}, ${founderProfile.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover grayscale-[0.2]"
                  priority
                />
              </div>
              <figcaption className="mono mt-4 flex justify-between text-ink-mute">
                <span>{founderProfile.name}</span>
                <span>{founderProfile.title}</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7">
            <SectionLabel index="01" label="In the founder's words" />
            <blockquote className="mt-10">
              <ScrollLitText
                className="serif text-[clamp(1.8rem,3.2vw,3rem)] leading-[1.12]"
                text={`“${founderProfile.bio}”`}
              />
            </blockquote>
            <Reveal delay={0.1}>
              <a
                href={founderProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base btn-secondary mt-10"
              >
                {founderProfile.name} on LinkedIn ↗
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Eras */}
      <section className="section bg-night text-paper">
        <div className="container-x">
          <SectionLabel index="02" label="The story so far" tone="paper" />
          <ol className="mt-14 grid gap-px bg-night-line md:grid-cols-3">
            {eras.map((era, index) => (
              <li key={era.label} className="bg-night">
                <Reveal delay={index * 0.12} className="flex h-full flex-col gap-6 p-2 py-8 md:p-8">
                  <p className="display display-md text-amber">{era.label}</p>
                  <h3 className="text-2xl font-medium leading-tight">{era.title}</h3>
                  <p className="text-lg leading-snug text-paper/70">{era.detail}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Approach */}
      <section className="section">
        <div className="container-x">
          <SectionLabel index="03" label="How we work" />
          <div className="mt-6">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} className="grid gap-4 border-b border-ink/15 py-10 md:grid-cols-12 md:items-baseline">
                <p className="mono text-ink-mute md:col-span-2">Step 0{index + 1}</p>
                <h3 className="display display-md md:col-span-5">
                  {step.title}
                  <span className="text-red">.</span>
                </h3>
                <p className="max-w-[34ch] text-xl leading-snug text-ink-soft md:col-span-5">{step.detail}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16">
            <p className="mono text-ink-mute">Studio</p>
            <p className="mt-3 max-w-[40ch] text-xl">{companyProfile.address}</p>
          </Reveal>
        </div>
      </section>

      <CTASection title="Let's make the next one" />
    </>
  );
}
