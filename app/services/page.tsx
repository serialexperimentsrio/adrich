import type { Metadata } from "next";
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
import SectionIntro from "@/components/SectionIntro";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Adrich services across TVC production, social media advertising, digital campaigns, paid ads management, animation, branding, and print.",
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

export default function ServicesPage() {
  return (
    <>
      <section className="section-y border-b-2 border-slate-300 bg-white">
        <div className="container-swiss">
          <Reveal>
            <SectionIntro
              title="Integrated capabilities for modern advertising"
              description="Every service is built to function independently or as part of one unified campaign model from concept and production to media and optimization. We help businesses build awareness, drive engagement, and grow online."
              titleAs="h1"
              align="center"
              showDivider
            />
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-swiss">
          <div className="space-y-1">
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

      <CTASection
        title="Need a custom service bundle?"
        description="Share your objectives and timeline. We will assemble a campaign plan combining the right strategic, creative, and media components."
      />
    </>
  );
}
