"use client";

import { ArrowUpRight } from "lucide-react";
import { useProposalModal } from "@/components/ProposalModalProvider";

type RequestProposalButtonProps = {
  serviceTitle?: string;
  label?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function RequestProposalButton({
  serviceTitle,
  label = "Request Proposal",
  variant = "primary",
  className,
}: RequestProposalButtonProps) {
  const { openModal } = useProposalModal();

  const variantClass = variant === "primary" ? "btn-primary" : "btn-secondary";

  return (
    <button
      type="button"
      className={`btn-base ${variantClass} ${className ?? ""}`.trim()}
      onClick={() => openModal(serviceTitle)}
    >
      <span>{label}</span>
      <ArrowUpRight size={16} aria-hidden="true" />
    </button>
  );
}
