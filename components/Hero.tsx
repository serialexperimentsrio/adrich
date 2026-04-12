import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RequestProposalButton from "@/components/RequestProposalButton";
import RotatingText from "@/components/RotatingText";
import { companyProfile } from "@/data/site";
import HeroPattern from "@/components/HeroPattern";

export default function Hero() {
  return (
    <section className="section-y relative overflow-hidden border-b border-slate-200" id="top">
      <HeroPattern dotCount={4} />
      <div className="container-swiss relative z-10">
        <div className="grid-12 items-start gap-y-10">
          <div className="col-span-12 md:col-span-12">
            <p className="text-kicker hero-stagger hero-stagger-1">Advertising Services since {companyProfile.founded}</p>
            <h1 className="hero-title hero-stagger hero-stagger-2 mt-4 text-ink-900">
              In Adrich, we
              <span className="inline-block align-middle">
                <RotatingText
                  texts={["Think.", "Create.", "Influence."]}
                  mainClassName={
                    "ml-3 sm:ml-4 px-2.5 sm:px-3 md:px-4 bg-brand-red text-white overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-sm"
                  }
                  staggerFrom={"last"}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-120%", opacity: 0 }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                  splitBy="characters"
                />
              </span>
            </h1>
            <p className="hero-stagger hero-stagger-3 mt-4 max-w-2xl text-base leading-7 text-ink-700">
              Adrich is a Dhaka-based full-service advertising agency delivering premium TVC, digital, and
              cross-platform campaigns for brands that want measurable market influence.
            </p>
            <div className="hero-stagger hero-stagger-4 mt-7 flex flex-wrap gap-2">
              <RequestProposalButton className="justify-center" />
              <Link href="#featured-work" className="btn-base btn-secondary justify-center">
                View Featured Work
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
