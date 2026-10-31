"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type TransitionEvent,
} from "react";
import { X } from "lucide-react";
import { services } from "@/data/site";
import ProposalForm from "@/components/ProposalForm";
import { lockScroll, unlockScroll } from "@/lib/smoothScroll";

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
  const [isMounted, setIsMounted] = useState(false);
  const [service, setService] = useState(services[0]?.title ?? "");
  const triggerRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const openModal = useCallback((serviceTitle?: string) => {
    triggerRef.current = document.activeElement as HTMLElement;
    if (serviceTitle && services.some((item) => item.title === serviceTitle)) {
      setService(serviceTitle);
    }

    setIsMounted(true);
    window.requestAnimationFrame(() => {
      setIsOpen(true);
    });
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handlePanelTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) {
        return;
      }

      if (!isOpen) {
        setIsMounted(false);
        triggerRef.current?.focus();
      }
    },
    [isOpen],
  );

  useEffect(() => {
    if (!isMounted) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }

      if (event.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input:not([tabindex="-1"]), select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusableElements) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    lockScroll();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      unlockScroll();
    };
  }, [closeModal, isMounted]);

  useEffect(() => {
    if (!isOpen) return;

    const focusHandle = window.requestAnimationFrame(() => {
      const firstInput = modalRef.current?.querySelector('input:not([tabindex="-1"]), select, textarea') as HTMLElement;
      firstInput?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusHandle);
    };
  }, [isOpen]);

  const value = useMemo(
    () => ({
      openModal,
    }),
    [openModal],
  );

  return (
    <ProposalModalContext.Provider value={value}>
      {children}
      {isMounted ? (
        <div
          className="fixed inset-0 z-[100] flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="proposal-modal-title"
        >
          <button
            type="button"
            className={`absolute inset-0 cursor-default bg-night/60 backdrop-blur-[2px] transition-opacity duration-500 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeModal}
            aria-label="Close request proposal modal"
          />
          <div
            ref={modalRef}
            onTransitionEnd={handlePanelTransitionEnd}
            data-lenis-prevent
            className={`relative flex h-full w-full max-w-2xl flex-col overflow-y-auto bg-paper p-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:p-12 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="mb-10 flex items-start justify-between gap-4">
              <div>
                <p className="caption text-ink-mute">New project — Slate 01</p>
                <h2 id="proposal-modal-title" className="display display-md mt-4">
                  Start a <span className="serif text-red">project</span>
                </h2>
              </div>
              <button type="button" className="btn-icon shrink-0" onClick={closeModal} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <ProposalForm service={service} onServiceChange={setService} />
          </div>
        </div>
      ) : null}
    </ProposalModalContext.Provider>
  );
}
