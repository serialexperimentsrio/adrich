"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="border border-slate-200 bg-white p-4 md:p-5 rounded-sm h-full flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        setSubmitted(true);
        form.reset();
      }}
      onChange={() => {
        if (submitted) {
          setSubmitted(false);
        }
      }}
      noValidate
    >
      <div>
        <label htmlFor="contact-name" className="form-label">
          Full name
        </label>
        <input id="contact-name" name="name" required className="form-input" placeholder="Your full name" />
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
          className="form-input"
          placeholder="name@company.com"
        />
        <p className="form-hint">We will send proposal details to this address.</p>
      </div>

      <div>
        <label htmlFor="contact-phone" className="form-label">
          Phone number
        </label>
        <input id="contact-phone" name="phone" required className="form-input" placeholder="+880 ..." />
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
          className="form-input min-h-36"
          placeholder="Share objectives, timeline, and budget range"
        />
        <p className="form-hint">Short summary is enough. We can refine in a discovery call.</p>
      </div>

      <div className="mt-auto">
        <button type="submit" className="btn-base btn-primary w-full justify-center sm:w-auto">
          Send Inquiry
        </button>

        {submitted ? (
          <p className="mt-4 rounded-sm border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
            Thanks for reaching out.
          </p>
        ) : null}
      </div>
    </form>
  );
}
