"use client";

import Arc from "@/components/Arc";
import { useProposalModal } from "@/components/ProposalModalProvider";
import SplitText from "@/components/SplitText";
import { companyProfile } from "@/data/site";

type CTASectionProps = {
  title?: string;
  description?: string;
};

/** Closing call to action, set in the dark "screening room". */
export default function CTASection({
  title = "Got a brief?",
  description = "Tell us what you are launching, who it is for and when. We will come back with how we would make it.",
}: CTASectionProps) {
  const { openModal } = useProposalModal();

  return (
    <section className="relative overflow-hidden bg-night text-paper">
      <Arc
        scrollLinked
        strokeWidth={9}
        className="pointer-events-none absolute -right-[20vw] top-1/2 w-[min(90vw,60rem)] -translate-y-1/2 opacity-90 md:-right-[6vw]"
      />
      <div className="container-x section relative">
        <p className="caption text-paper/50">(Fin) Your scene next</p>
        <SplitText as="h2" text={title} className="display display-lg mt-8 max-w-[12ch]" />
        <p className="mt-8 max-w-[34ch] text-xl leading-snug text-paper/75">{description}</p>
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
          <button type="button" className="btn-base btn-light" onClick={() => openModal()}>
            Start a project
          </button>
          <a href={`mailto:${companyProfile.email}`} className="serif link-u text-2xl text-paper md:text-3xl">
            {companyProfile.email}
          </a>
        </div>
      </div>
    </section>
  );
}
