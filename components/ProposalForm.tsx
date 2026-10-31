"use client";

import { submitProposalRequest } from "@/app/actions/inquiry";
import { FieldError, HoneypotField, SubmitStatus } from "@/components/FormStatus";
import { useInquiryForm } from "@/components/useInquiryForm";
import { services } from "@/data/site";

type ProposalFormProps = {
  service: string;
  onServiceChange: (service: string) => void;
};

export default function ProposalForm({ service, onServiceChange }: ProposalFormProps) {
  const { state, isPending, formRef, handleSubmit } = useInquiryForm(submitProposalRequest);
  const errors = state.status === "error" ? state.fieldErrors ?? {} : {};

  return (
    <>
      <form ref={formRef} className="relative space-y-4" onSubmit={handleSubmit} noValidate>
        <HoneypotField />

        <div>
          <label htmlFor="proposal-name" className="form-label">
            Full name
          </label>
          <input
            id="proposal-name"
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            className="form-input"
            placeholder="Your name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "proposal-name-error" : undefined}
          />
          <FieldError id="proposal-name-error" message={errors.name} />
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
            maxLength={254}
            autoComplete="email"
            className="form-input"
            placeholder="name@company.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "proposal-email-error" : undefined}
          />
          <FieldError id="proposal-email-error" message={errors.email} />
        </div>

        <div>
          <label htmlFor="proposal-service" className="form-label">
            Service interest
          </label>
          <select
            id="proposal-service"
            name="service"
            value={service}
            onChange={(event) => onServiceChange(event.target.value)}
            className="form-input"
          >
            {services.map((serviceItem) => (
              <option key={serviceItem.slug} value={serviceItem.title}>
                {serviceItem.title}
              </option>
            ))}
          </select>
          <FieldError id="proposal-service-error" message={errors.service} />
        </div>

        <div>
          <label htmlFor="proposal-message" className="form-label">
            Project brief
          </label>
          <textarea
            id="proposal-message"
            name="message"
            required
            maxLength={5000}
            className="form-input min-h-32"
            placeholder="Campaign goal, timeline, and expected deliverables"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "proposal-message-error" : undefined}
          />
          <FieldError id="proposal-message-error" message={errors.message} />
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={isPending}
            className="btn-primary btn-base disabled:cursor-wait disabled:opacity-70"
          >
            {isPending ? "Sending…" : "Submit Request"}
          </button>
        </div>
      </form>

      <SubmitStatus
        state={state}
        successMessage="Thank you. We received your brief and will get back to you shortly."
      />
    </>
  );
}
