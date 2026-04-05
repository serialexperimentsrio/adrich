"use client";

import { ArrowUpRight } from "lucide-react";
import { useProposalModal } from "@/components/ProposalModalProvider";

type RequestProposalButtonProps = {
  serviceTitle?: string;
  label?: string;
  variant?: "primary" | "secondary";
  iconOnly?: boolean;
  className?: string;
};

export default function RequestProposalButton({
  serviceTitle,
  label = "Request Proposal",
  variant = "primary",
  iconOnly = false,
  className,
}: RequestProposalButtonProps) {
  const { openModal } = useProposalModal();

  const variantClass = variant === "primary" ? "btn-primary" : "btn-secondary";

  return (
    <button
      type="button"
      className={`btn-base ${variantClass} ${className ?? ""}`.trim()}
      onClick={() => openModal(serviceTitle)}
      aria-label={iconOnly ? label : undefined}
    >
      <span className={iconOnly ? "sr-only" : undefined}>{label}</span>
      <ArrowUpRight size={iconOnly ? 18 : 16} strokeWidth={2.2} className="shrink-0" aria-hidden="true" />
    </button>
  );
}
