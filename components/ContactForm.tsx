"use client";

import { submitContactInquiry } from "@/app/actions/inquiry";
import { FieldError, HoneypotField, SubmitStatus } from "@/components/FormStatus";
import { useInquiryForm } from "@/components/useInquiryForm";

export default function ContactForm() {
  const { state, isPending, formRef, handleSubmit } = useInquiryForm(submitContactInquiry);
  const errors = state.status === "error" ? state.fieldErrors ?? {} : {};

  return (
    <form
      ref={formRef}
      className="relative flex h-full flex-col gap-8"
      onSubmit={handleSubmit}
      noValidate
    >
      <HoneypotField />

      <div>
        <label htmlFor="contact-name" className="form-label">
          Full name
        </label>
        <input
          id="contact-name"
          name="name"
          required
          maxLength={120}
          autoComplete="name"
          className="form-input"
          placeholder="Your full name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        <FieldError id="contact-name-error" message={errors.name} />
        <p className="form-hint">Use the name of the primary decision maker.</p>
      </div>

      <div>
        <label htmlFor="contact-email" className="form-label">
          Work email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          className="form-input"
          placeholder="name@company.com"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        <FieldError id="contact-email-error" message={errors.email} />
        <p className="form-hint">We will send proposal details to this address.</p>
      </div>

      <div>
        <label htmlFor="contact-phone" className="form-label">
          Phone number
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          required
          maxLength={40}
          autoComplete="tel"
          className="form-input"
          placeholder="+880 ..."
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? "contact-phone-error" : undefined}
        />
        <FieldError id="contact-phone-error" message={errors.phone} />
        <p className="form-hint">Include WhatsApp number if available.</p>
      </div>

      <div>
        <label htmlFor="contact-message" className="form-label">
          Campaign brief
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={5000}
          className="form-input min-h-36"
          placeholder="Share objectives, timeline, and budget range"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        <FieldError id="contact-message-error" message={errors.message} />
        <p className="form-hint">Short summary is enough. We can refine in a discovery call.</p>
      </div>

      <div className="mt-auto">
        <button
          type="submit"
          disabled={isPending}
          className="btn-base btn-primary w-full justify-center disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {isPending ? "Sending…" : "Send Inquiry"}
        </button>

        <SubmitStatus
          state={state}
          successMessage="Thanks for reaching out. We received your inquiry and will get back to you shortly."
        />
      </div>
    </form>
  );
}
