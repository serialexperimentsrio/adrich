import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import Marquee from "@/components/Marquee";
import PageHeader from "@/components/PageHeader";
import ServicesIndex from "@/components/ServicesIndex";
import { services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "TV commercials, corporate films, social content, digital strategy, paid ads, branding and print from Adrich in Dhaka.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        index="S"
        label="Services"
        title="Everything a campaign needs"
        accent="campaign"
        intro="Hire us for one piece or the whole thing, from the first idea to the film, the posts and the media plan."
        aside={<p className="caption text-ink-mute">Click any service to start a project with it selected.</p>}
      />

      <section className="container-x pb-28">
        <ServicesIndex services={services} expanded />
      </section>

      <div className="bg-red py-5 text-paper">
        <Marquee
          className="display text-[clamp(1.6rem,3.2vw,2.75rem)]"
          items={["Think", "Create", "Influence"]}
          separator="●"
          duration={22}
        />
      </div>

      <CTASection title="Need a mix of these?" description="Tell us what you are trying to do and we will put the right team together." />
    </>
  );
}
