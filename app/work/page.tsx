import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import PageHeader from "@/components/PageHeader";
import WorkGallery from "@/components/WorkGallery";
import { portfolioItems } from "@/data/site";

export const metadata: Metadata = {
  title: "Work",
  description: "TV commercials, corporate films and animation made by Adrich for brands in Bangladesh.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        index="W"
        label="Work"
        title="Films we have made"
        accent="made"
        intro="Commercials, corporate films and animation for brands across Bangladesh. Open any project to watch it."
      />
      <section className="container-x pb-32">
        <WorkGallery items={portfolioItems} />
      </section>
      <CTASection title="Your film next?" />
    </>
  );
}
