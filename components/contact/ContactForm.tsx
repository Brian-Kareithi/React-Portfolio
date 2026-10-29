"use client";

import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Send, TriangleAlert } from "lucide-react";
import { fieldErrorId, fieldId, FormField } from "@/components/contact/FormField";
import { Toast } from "@/components/ui/Toast";
import {
  emptyContactValues,
  MESSAGE_MAX,
  validateContact,
  type ContactField,
} from "@/lib/contact-form";
import { siteConfig } from "@/lib/site";

const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

type SubmitStatus = "idle" | "success" | "error";

/** Validated contact form that sends through EmailJS. Errors show after a field is left, or on submit. */
export function ContactForm() {
  const [values, setValues] = useState(emptyContactValues);
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [toastOpen, setToastOpen] = useState(false);
  const closeToast = useCallback(() => setToastOpen(false), []);

  useEffect(() => {
    if (EMAILJS.publicKey) emailjs.init(EMAILJS.publicKey);
  }, []);

  const errors = validateContact(values);
  const visibleError = (field: ContactField) => (touched[field] ? errors[field] : undefined);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const firstInvalid = (Object.keys(errors) as ContactField[])[0];
    if (firstInvalid) {
      setTouched({ name: true, email: true, message: true });
      (e.currentTarget.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    try {
      if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.publicKey) throw new Error("EmailJS env vars not set");
      const name = values.name.trim();
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          name,
          email: values.email.trim(),
          subject: `Portfolio message from ${name}`,
          message: values.message.trim(),
          time: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
          to_email: siteConfig.email,
        },
        EMAILJS.publicKey,
      );
      setStatus("success");
      setToastOpen(true);
      setValues(emptyContactValues);
      setTouched({});
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldProps = (field: ContactField) => ({
    id: fieldId(field),
    name: field,
    value: values[field],
    onChange: handleChange,
    onBlur: () => setTouched((t) => ({ ...t, [field]: true })),
    "aria-invalid": visibleError(field) ? true : undefined,
    "aria-describedby": visibleError(field) ? fieldErrorId(field) : undefined,
    required: true,
    className: "c-input",
  });

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="c-form" aria-label="Send a message">
        <fieldset disabled={isSubmitting} className="c-fieldset">
          <FormField label="Name" name="name" error={visibleError("name")}>
            <input {...fieldProps("name")} type="text" autoComplete="name" />
          </FormField>
          <FormField label="Email" name="email" error={visibleError("email")}>
            <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" />
          </FormField>
          <FormField label="Message" name="message" error={visibleError("message")} grow>
            <textarea {...fieldProps("message")} rows={5} maxLength={MESSAGE_MAX} />
          </FormField>

          <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="c-send">
            <Send className={isSubmitting ? "send-plane" : undefined} aria-hidden="true" />
            {isSubmitting ? "Sending…" : "Send message"}
          </button>
        </fieldset>

        <div role="status" aria-live="polite">
          {status === "error" && (
            <p className="c-error animate-fade-in-up">
              <TriangleAlert aria-hidden="true" />
              Message not sent. Please try again or email me directly.
            </p>
          )}
        </div>
      </form>

      <Toast open={toastOpen} onClose={closeToast}>
        Message sent. Thank you.
      </Toast>
    </>
  );
}
