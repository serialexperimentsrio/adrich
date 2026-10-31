import type { Metadata } from "next";
import Link from "next/link";
import ClientWall from "@/components/ClientWall";
import CountUp from "@/components/CountUp";
import CTASection from "@/components/CTASection";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ReelStrip from "@/components/ReelStrip";
import Reveal from "@/components/Reveal";
import ScrollLitText from "@/components/ScrollLitText";
import SectionLabel from "@/components/SectionLabel";
import ServicesIndex from "@/components/ServicesIndex";
import SplitText from "@/components/SplitText";
import { companyProfile, portfolioItems, processSteps, services, yearsInBusiness } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: "Adrich | Think. Create. Influence." },
  description:
    "Adrich is an advertising agency in Dhaka, making TV commercials, corporate films and digital campaigns since 1997.",
};

export default function Home() {
  return (
    <>
      <Hero />

      <div className="border-y border-ink bg-ink py-5 text-paper">
        <Marquee
          className="display text-[clamp(1.6rem,3.2vw,2.75rem)]"
          items={services.map((service) => service.title.replace(/ \(.*\)$/, ""))}
          duration={45}
        />
      </div>

      {/* (01) Intro */}
      <section className="section">
        <div className="container-x">
          <SectionLabel index="01" label="The agency" />
          <div className="mt-14 grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <p className="display text-[clamp(7rem,16vw,15rem)] leading-[0.8] text-red">
                <CountUp to={yearsInBusiness} from={1} />
              </p>
              <p className="serif mt-3 text-3xl">years of making ads in Dhaka.</p>
            </Reveal>
            <div className="md:col-span-8">
              <ScrollLitText
                className="text-[clamp(1.6rem,3.1vw,2.9rem)] font-medium leading-[1.15] tracking-[-0.01em]"
                text={`We started in ${companyProfile.founded}, when TV, radio and print were how you reached people. The media changed, and so did we. Today we help brands think clearly, make work people remember, and put it where their audience actually is.`}
              />
              <Reveal delay={0.1}>
                <Link href="/about" className="btn-base btn-secondary mt-10">
                  Our story
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* (02) Selected work */}
      <ReelStrip items={portfolioItems} />

      {/* (03) Services */}
      <section className="section">
        <div className="container-x">
          <SectionLabel index="03" label="Capabilities" />
          <div className="mt-10 mb-12 flex flex-wrap items-end justify-between gap-6">
            <SplitText as="h2" text="What we create" className="display display-lg" />
            <Link href="/services" className="caption link-u">
              All services →
            </Link>
          </div>
          <ServicesIndex services={services} />
        </div>
      </section>

      {/* (04) Process */}
      <section className="section border-t border-ink/15">
        <div className="container-x">
          <SectionLabel index="04" label="How we work" />
          <div className="mt-14 grid gap-14 md:grid-cols-3 md:gap-8">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.12}>
                <article>
                  <p className="caption text-ink-mute">Step 0{index + 1}</p>
                  <h3 className="display display-md mt-4">
                    {step.title}
                    <span className="text-red">.</span>
                  </h3>
                  <p className="mt-5 max-w-[32ch] text-lg leading-snug text-ink-soft">{step.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* (05) Clients */}
      <section className="section">
        <div className="container-x">
          <SectionLabel index="05" label="Clients" />
          <div className="mt-10 mb-14 grid gap-6 md:grid-cols-12 md:items-end">
            <SplitText
              as="h2"
              text="Brands we have worked with"
              className="display display-md md:col-span-8"
            />
            <p className="serif text-2xl text-ink-soft md:col-span-4 md:text-right">
              From cables to cooking oil.
            </p>
          </div>
          <ClientWall />
        </div>
      </section>

      <CTASection />
    </>
  );
}
