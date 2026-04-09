import type { Metadata } from "next";
import Link from "next/link";
import {
  Aperture,
  Brush,
  Building2,
  Clapperboard,
  Megaphone,
  MonitorPlay,
  Newspaper,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import PortfolioCard from "@/components/PortfolioCard";
import CTASection from "@/components/CTASection";
import SectionIntro from "@/components/SectionIntro";
import Reveal from "@/components/Reveal";
import {
  clientLogos,
  portfolioItems,
  processSteps,
  services,
  testimonials,
  trustPoints,
} from "@/data/site";
import ClientCarousel from "@/components/ClientCarousel";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Adrich builds premium advertising campaigns across TVC, corporate AV, digital marketing, and performance media.",
};

const serviceIconMap: Record<string, LucideIcon> = {
  "tvc-production": Clapperboard,
  "corporate-av-production": Building2,
  "social-media-content-production": MonitorPlay,
  "digital-campaign-strategy": TrendingUp,
  "paid-ads-management": Megaphone,
  "branding-and-graphic-design": Brush,
  "print-production": Newspaper,
};

export default function Home() {
  const featuredWork = portfolioItems.slice(0, 4);

  return (
    <>
      <div className="viewport-group">
        <Hero />

        <section className="section-y-tight border-b-2 border-slate-300 bg-white">
          <div className="container-swiss">
          <Reveal>
            <div className="metric-grid">
              {trustPoints.map((point) => (
                <div key={point.title} className="metric-cell">
                  <p className="text-kicker">{point.title}</p>
                  <p className="mt-2 font-display text-xl font-semibold text-ink-900">{point.value}</p>
                  <p className="mt-2 text-sm leading-6 text-ink-700">{point.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        </section>
      </div>

      <section className="section-y" id="services">
        <div className="container-swiss">
          <Reveal>
            <SectionIntro
              eyebrow="Services"
              title="Campaign systems built for brand impact"
              description="From script and set to social distribution and paid optimization, we build coherent campaigns that perform across every channel."
            />
          </Reveal>
          <div className="mt-8 space-y-1">
            {services.map((service) => {
              const Icon = serviceIconMap[service.slug] ?? Megaphone;

              return (
                <Reveal key={service.slug}>
                  <ServiceCard service={service} icon={Icon} />
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      <section className="section-y scroll-mt-24 border-y-2 border-slate-300 bg-white" id="featured-work">
        <div className="container-swiss">
          <Reveal>
            <SectionIntro
              eyebrow="Featured Work"
              title="A premium reel gallery of campaign execution"
              description="Selected TVC and AV projects showcasing creative direction, production quality, and channel-ready campaign assets."
            />
          </Reveal>
          <div className="mt-8 space-y-1">
            {featuredWork.map((item, index) => (
              <Reveal key={item.slug}>
                <PortfolioCard item={item} priority={index < 2} />
              </Reveal>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/work" className="btn-base btn-secondary">
              Explore All Work
            </Link>
          </div>
        </div>
      </section>

      <section className="section-y" id="process">
        <div className="container-swiss">
          <Reveal>
            <SectionIntro
              eyebrow="Process"
              title="Think -> Create -> Influence"
              description="Our 3-step operating model aligns strategy, craft, and media performance into one disciplined production flow."
            />
          </Reveal>
          <div className="grid-12 mt-7 gap-y-4">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} className="col-span-12 md:col-span-4">
                <article className="rule-item h-full">
                  <p className="text-kicker">0{index + 1}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-ink-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-700">{step.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y-tight border-y-2 border-slate-300 bg-white" id="clients">
        <div className="container-swiss">
          <div className="mb-6 max-w-2xl">
            <p className="text-kicker">Clients</p>
            <h2 className="section-title mt-3 text-ink-900">Trusted by growth-focused brands</h2>
          </div>
          <Reveal>
            <ClientCarousel
              images={[
                "/logos/BRB.jpeg",
                "/logos/city%20group.png",
                "/logos/kiam.png",
                "/logos/Kollany%20Rice%20Bran%20Oil.jpeg",
                "/logos/ssg.png",
                "/logos/sunlite.png",
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="section-y" id="testimonials">
        <div className="container-swiss">
          <Reveal>
            <SectionIntro
              eyebrow="Testimonials"
              title="Client feedback from long-term campaign partners"
              description="We are trusted for strategic clarity, premium execution, and measurable campaign momentum."
            />
          </Reveal>
          <div className="grid-12 mt-8 gap-y-3">
            {testimonials.map((testimonial) => (
              <Reveal key={testimonial.name} className="col-span-12 md:col-span-4">
                <article className="rule-item h-full">
                  <p className="text-sm leading-7 text-ink-800">&quot;{testimonial.quote}&quot;</p>
                  <p className="mt-4 text-sm font-semibold text-ink-900">{testimonial.name}</p>
                  <p className="mt-1 text-xs text-ink-600">{testimonial.role}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Let's build your next campaign"
        description="Bring your challenge to Adrich and we will shape a custom strategy spanning concept, production, and performance channels."
      />
    </>
  );
}
