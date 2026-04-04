import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import RequestProposalButton from "@/components/RequestProposalButton";
import type { Service } from "@/data/site";

type ServiceCardProps = {
  service: Service;
  icon: LucideIcon;
};

export default function ServiceCard({ service, icon: Icon }: ServiceCardProps) {
  return (
    <article className="service-row">
      <div className="grid-12 items-start gap-y-4">
        <div className="col-span-12 md:col-span-4">
          <div className="inline-flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-slate-300 bg-surface-1 text-ink-700">
              <Icon size={16} aria-hidden="true" />
            </span>
            <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">{service.title}</h3>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5">
          <p className="text-sm leading-7 text-ink-700">{service.description}</p>

          <ul className="mt-4 space-y-1.5">
            {service.deliverables.map((deliverable) => (
              <li key={deliverable} className="flex items-start gap-2 text-sm text-ink-700">
                <ChevronRight size={14} className="mt-1 shrink-0 text-accent-500" aria-hidden="true" />
                <span>{deliverable}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 md:col-span-3 md:flex md:justify-end">
          <RequestProposalButton serviceTitle={service.title} variant="secondary" className="mt-1" />
        </div>
      </div>
    </article>
  );
}
