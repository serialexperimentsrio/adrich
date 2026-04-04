import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RequestProposalButton from "@/components/RequestProposalButton";
import { companyProfile } from "@/data/site";

export default function Hero() {
  return (
    <section className="hero-aura section-y relative overflow-hidden border-b border-slate-300" id="top">
      <div className="container-swiss relative z-10">
        <div className="grid-12 items-start gap-y-10">
          <div className="col-span-12 md:col-span-8">
            <p className="text-kicker">Advertising Services since {companyProfile.founded}</p>
            <h1 className="hero-title mt-4 text-ink-900">Think. Create. Influence.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink-700">
              Adrich is a Dhaka-based full-service advertising agency delivering premium TVC, digital, and
              cross-platform campaigns for brands that want measurable market influence.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <RequestProposalButton className="justify-center" />
              <Link href="#featured-work" className="btn-base btn-secondary justify-center">
                View Featured Work
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 md:border-l md:border-slate-300 md:pl-6">
            <p className="text-kicker">At a Glance</p>
            <div className="mt-3 space-y-4 text-sm">
              <div className="rule-item">
                <p className="text-kicker">Headquarters</p>
                <p className="mt-2 font-medium text-ink-900">{companyProfile.headquarters}</p>
              </div>
              <div className="rule-item">
                <p className="text-kicker">Industry</p>
                <p className="mt-2 font-medium text-ink-900">{companyProfile.industry}</p>
              </div>
              <div className="rule-item">
                <p className="text-kicker">Address</p>
                <p className="mt-2 leading-6 text-ink-700">{companyProfile.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
