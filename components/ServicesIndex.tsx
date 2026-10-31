"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useProposalModal } from "@/components/ProposalModalProvider";
import type { Service } from "@/data/site";

type ServicesIndexProps = {
  services: Service[];
  /** Always show the description and deliverables (services page) instead of on hover. */
  expanded?: boolean;
};

/** Editorial numbered list of services. Rows open on hover/focus; clicking starts a proposal. */
export default function ServicesIndex({ services, expanded = false }: ServicesIndexProps) {
  const { openModal } = useProposalModal();
  const [active, setActive] = useState<string | null>(null);

  return (
    <ol className="border-b border-ink/15" onMouseLeave={() => setActive(null)}>
      {services.map((service, index) => {
        const open = expanded || active === service.slug;
        return (
          <li key={service.slug} className="group border-t border-ink/15" onMouseEnter={() => setActive(service.slug)}>
            <button
              type="button"
              onClick={() => openModal(service.title)}
              onFocus={() => setActive(service.slug)}
              className="relative grid w-full grid-cols-12 items-baseline gap-x-4 py-6 text-left md:py-8"
              aria-label={`${service.title}: request a proposal`}
            >
              {/* Red bar that sweeps in under the hovered row */}
              <span
                className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-red transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                aria-hidden="true"
              />
              <span className="caption col-span-2 text-ink-mute md:col-span-1">{String(index + 1).padStart(2, "0")}</span>
              <span className="display col-span-10 text-[clamp(1.9rem,5.2vw,4.75rem)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 md:col-span-9">
                {service.title}
              </span>
              <span
                className="caption col-span-2 hidden justify-self-end text-ink transition-transform duration-500 group-hover:-rotate-45 md:block"
                aria-hidden="true"
              >
                →
              </span>
            </button>

            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  key="detail"
                  initial={expanded ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-12 gap-x-4 gap-y-4 pb-8">
                    <p className="col-span-12 text-lg leading-snug text-ink-soft md:col-span-5 md:col-start-2">
                      {service.description}
                    </p>
                    <ul className="col-span-12 space-y-1.5 md:col-span-5 md:col-start-8">
                      {service.deliverables.map((deliverable) => (
                        <li key={deliverable} className="caption flex gap-3 text-ink-soft">
                          <span className="text-red" aria-hidden="true">
                            +
                          </span>
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
