"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { services } from "@/data/site";

type ProposalModalContextType = {
  openModal: (serviceTitle?: string) => void;
};

const ProposalModalContext = createContext<ProposalModalContextType | null>(null);

export function useProposalModal() {
  const context = useContext(ProposalModalContext);

  if (!context) {
    throw new Error("useProposalModal must be used within ProposalModalProvider");
  }

  return context;
}

export default function ProposalModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState(services[0]?.title ?? "");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const openModal = useCallback((serviceTitle?: string) => {
    if (serviceTitle) {
      setService(serviceTitle);
    }

    setIsSubmitted(false);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [closeModal, isOpen]);

  const value = useMemo(
    () => ({
      openModal,
    }),
    [openModal],
  );

  return (
    <ProposalModalContext.Provider value={value}>
      {children}
      {isOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="proposal-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#061019]/70"
            onClick={closeModal}
            aria-label="Close request proposal modal"
          />
          <div className="relative w-full max-w-xl rounded-md border border-slate-300 bg-white p-5 md:p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-kicker">Request Proposal</p>
                <h3 id="proposal-modal-title" className="font-display text-2xl font-semibold text-ink-900">
                  Tell us about your next campaign
                </h3>
              </div>
              <button
                type="button"
                className="rounded-sm p-2 text-ink-600 transition hover:bg-slate-100 hover:text-ink-900"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                setIsSubmitted(true);
              }}
            >
              <div>
                <label htmlFor="proposal-name" className="form-label">
                  Full name
                </label>
                <input id="proposal-name" name="name" required className="form-input" placeholder="Your name" />
              </div>

              <div>
                <label htmlFor="proposal-email" className="form-label">
                  Work email
                </label>
                <input
                  id="proposal-email"
                  name="email"
                  type="email"
                  required
                  className="form-input"
                  placeholder="name@company.com"
                />
              </div>

              <div>
                <label htmlFor="proposal-service" className="form-label">
                  Service interest
                </label>
                <select
                  id="proposal-service"
                  name="service"
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  className="form-input"
                >
                  {services.map((serviceItem) => (
                    <option key={serviceItem.slug} value={serviceItem.title}>
                      {serviceItem.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="proposal-message" className="form-label">
                  Project brief
                </label>
                <textarea
                  id="proposal-message"
                  name="message"
                  required
                  className="form-input min-h-32"
                  placeholder="Campaign goal, timeline, and expected deliverables"
                />
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" className="btn-primary btn-base">
                  Submit Request
                </button>
                <p className="text-xs text-ink-600">Response window: within 1 business day.</p>
              </div>
            </form>

            {isSubmitted ? (
              <div className="mt-4 rounded-sm border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
                Thank you. We received your brief and will get back to you shortly.
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </ProposalModalContext.Provider>
  );
}
