import type { Metadata } from "next";
import SectionIntro from "@/components/SectionIntro";
import WorkGallery from "@/components/WorkGallery";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { portfolioItems } from "@/data/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore Adrich campaign portfolio across TVC, corporate AV, digital, and animation-led projects.",
};

export default function WorkPage() {
  return (
    <>
      <section className="section-y border-b-2 border-slate-300 bg-white">
        <div className="container-swiss">
          <Reveal>
            <SectionIntro
              eyebrow="Portfolio"
              title="Campaign work designed for recall and results"
              description="Filter projects by category and open each case detail to review objective, category, client, and video placeholder preview."
              titleAs="h1"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-swiss">
          <WorkGallery items={portfolioItems} />
        </div>
      </section>

      <CTASection
        title="Want your campaign featured in our next reel?"
        description="Bring your brief to Adrich and we will produce a high-impact concept and execution roadmap tailored to your market."
      />
    </>
  );
}
