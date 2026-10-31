"use server";

import { companyProfile, services } from "@/data/site";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "phone" | "message" | "service", string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = { name: 120, email: 254, phone: 40, message: 5000 } as const;

function field(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendInquiry(formData: FormData, source: "contact" | "proposal"): Promise<InquiryState> {
  // Honeypot: real visitors never see or fill this field.
  if (field(formData, "company_website")) {
    return { status: "success" };
  }

  const name = field(formData, "name");
  const email = field(formData, "email");
  const phone = field(formData, "phone");
  const message = field(formData, "message");
  const service = field(formData, "service");

  const fieldErrors: InquiryState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "Please enter your name.";
  else if (name.length > MAX_LENGTH.name) fieldErrors.name = "Name is too long.";
  if (!email) fieldErrors.email = "Please enter your email.";
  else if (email.length > MAX_LENGTH.email || !EMAIL_PATTERN.test(email))
    fieldErrors.email = "Please enter a valid email address.";
  if (source === "contact" && !phone) fieldErrors.phone = "Please enter a phone number.";
  else if (phone.length > MAX_LENGTH.phone) fieldErrors.phone = "Phone number is too long.";
  if (!message) fieldErrors.message = "Please add a short brief.";
  else if (message.length > MAX_LENGTH.message) fieldErrors.message = "Brief is too long (5000 characters max).";
  if (source === "proposal" && !services.some((item) => item.title === service))
    fieldErrors.service = "Please choose a service.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[inquiry] RESEND_API_KEY is not set; inquiry was not sent.");
    return {
      status: "error",
      message: `Sorry, we couldn't send your message right now. Please email us at ${companyProfile.email}.`,
    };
  }

  const to = process.env.CONTACT_TO_EMAIL || companyProfile.email;
  const from = process.env.RESEND_FROM_EMAIL || "Adrich Website <onboarding@resend.dev>";
  const label = source === "proposal" ? "Proposal request" : "Contact inquiry";
  const subject = `${label} from ${name}${service ? ` (${service})` : ""}`;

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ...(phone ? ([["Phone", phone]] as [string, string][]) : []),
    ...(service ? ([["Service", service]] as [string, string][]) : []),
    ["Brief", message],
  ];

  const text = rows.map(([key, value]) => `${key}: ${value}`).join("\n\n");
  const html = `<h2>${escapeHtml(label)}</h2>${rows
    .map(
      ([key, value]) =>
        `<p><strong>${escapeHtml(key)}:</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`,
    )
    .join("")}`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, text, html }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("[inquiry] Resend responded", response.status, await response.text());
      throw new Error(`Resend error ${response.status}`);
    }
  } catch (error) {
    console.error("[inquiry] Failed to send inquiry:", error);
    return {
      status: "error",
      message: `Sorry, we couldn't send your message right now. Please try again or email us at ${companyProfile.email}.`,
    };
  }

  return { status: "success" };
}

export async function submitContactInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  return sendInquiry(formData, "contact");
}

export async function submitProposalRequest(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  return sendInquiry(formData, "proposal");
}
