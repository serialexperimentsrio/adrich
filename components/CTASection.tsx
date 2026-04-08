import { ArrowRight } from "lucide-react";
import Link from "next/link";

type CTASectionProps = {
  title: string;
  description: string;
  className?: string;
};

export default function CTASection({
  title,
  description,
  className,
}: CTASectionProps) {
  return (
    <section className={`section-y ${className ?? ""}`.trim()}>
      <div className="container-swiss">
        <div className="cta-panel grid-12 items-center gap-y-8">
          <div className="col-span-12 md:col-span-8">
            <p className="text-kicker text-slate-400">Campaign Partnership</p>
            <h2 className="section-title mt-4 text-white">{title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{description}</p>
          </div>

          <div className="col-span-12 flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <Link href="/contact" className="btn-base btn-inverse">
              Contact Team
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
