import type { InquiryState } from "@/app/actions/inquiry";

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-deep">
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
      <p role="status" className="mono mt-6 border-l-2 border-ink bg-paper-2 px-4 py-3 normal-case text-ink">
        {successMessage}
      </p>
    );
  }
  if (state.status === "error" && state.message) {
    return (
      <p role="alert" className="mono mt-6 border-l-2 border-red bg-red/10 px-4 py-3 normal-case text-ink">
        {state.message}
      </p>
    );
  }
  return null;
}
