"use client";

import { useActionState, useEffect, useRef, startTransition, type FormEvent } from "react";
import type { InquiryState } from "@/app/actions/inquiry";

type InquiryAction = (state: InquiryState, formData: FormData) => Promise<InquiryState>;

const initialState: InquiryState = { status: "idle" };

/**
 * Wires a form to an inquiry server action. Submitting via onSubmit (rather than
 * the form `action` prop) keeps the visitor's input if sending fails; the form is
 * only cleared after a successful send.
 */
export function useInquiryForm(action: InquiryAction, onSuccess?: () => void) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const formRef = useRef<HTMLFormElement | null>(null);
  const onSuccessRef = useRef(onSuccess);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  });

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      onSuccessRef.current?.();
    }
  }, [state]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const formData = new FormData(form);
    startTransition(() => formAction(formData));
  };

  return { state, isPending, formRef, handleSubmit };
}
