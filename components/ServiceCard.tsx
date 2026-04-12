import type { LucideIcon } from "lucide-react";
import RequestProposalButton from "@/components/RequestProposalButton";
import type { Service } from "@/data/site";

type ServiceCardProps = {
  service: Service;
  icon: LucideIcon;
};

export default function ServiceCard({ service, icon: Icon }: ServiceCardProps) {
  return (
    <article className="service-row group relative overflow-hidden rounded-sm border border-transparent px-4 py-10 transition-all duration-300 hover:border-slate-200 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
      <div className="grid-12 items-start gap-y-8">
        <div className="col-span-12 md:col-span-4">
          <div className="flex items-center gap-4">
            <span className="service-icon inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-slate-200 bg-white text-ink-900 transition-all duration-300 group-hover:scale-110 group-hover:border-ink-900 group-hover:bg-ink-900 group-hover:text-white">
              <Icon size={24} aria-hidden="true" strokeWidth={1.25} />
            </span>
            <h3 className="font-display text-2xl font-bold tracking-tight text-ink-900">{service.title}</h3>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 lg:col-span-6">
          <p className="text-[0.92rem] leading-relaxed text-ink-700">{service.description}</p>

          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {service.deliverables.map((deliverable) => (
              <div key={deliverable} className="flex items-start gap-2.5 text-[0.82rem] font-medium text-ink-600">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" aria-hidden="true"></span>
                <span className="leading-tight">{deliverable}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 md:col-span-3 lg:col-span-2 md:flex md:justify-end">
          <RequestProposalButton
            serviceTitle={service.title}
            variant="secondary"
            iconOnly
            className="w-12 min-h-12 justify-center px-0"
          />
        </div>
      </div>
    </article>
  );
}
