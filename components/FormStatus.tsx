import type { InquiryState } from "@/app/actions/inquiry";

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-red-700">
      {message}
    </p>
  );
}

/** Hidden field that bots tend to fill in; the server ignores submissions that include it. */
export function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute left-[-10000px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

export function SubmitStatus({ state, successMessage }: { state: InquiryState; successMessage: string }) {
  if (state.status === "success") {
    return (
      <p role="status" className="mt-4 rounded-sm border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
        {successMessage}
      </p>
    );
  }
  if (state.status === "error" && state.message) {
    return (
      <p role="alert" className="mt-4 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
        {state.message}
      </p>
    );
  }
  return null;
}
