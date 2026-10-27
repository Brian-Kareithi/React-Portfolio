"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import emailjs from "@emailjs/browser";
import useLocalTime from "@/app/components/ui/useLocalTime";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { ArrowUpRight, Send, TriangleAlert, Check, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/app/lib/site";

type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;

// EmailJS runs in the browser, so these are public by design; keeping them in env
// makes them easy to rotate. Lock the key to this domain in the EmailJS dashboard.
const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

const MESSAGE_MIN = 10;
const MESSAGE_MAX = 2000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const empty: Record<FieldName, string> = { name: "", email: "", message: "" };

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Enter your name.";
  if (!emailPattern.test(values.email.trim())) errors.email = "Enter a valid email, like you@company.com.";
  const len = values.message.trim().length;
  if (len < MESSAGE_MIN) errors.message = `A little more, please (${MESSAGE_MIN - len} more characters).`;
  return errors;
}

export default function ContactClient() {
  const [values, setValues] = useState(empty);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [toastOpen, setToastOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const time = useLocalTime("Africa/Nairobi");

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!toastOpen) return;
    const t = window.setTimeout(() => setToastOpen(false), 5000);
    return () => window.clearTimeout(t);
  }, [toastOpen]);

  useEffect(() => {
    if (EMAILJS.publicKey) emailjs.init(EMAILJS.publicKey);
  }, []);

  const errors = validate(values);
  const showError = (f: FieldName) => (touched[f] ? errors[f] : undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (submitStatus !== "idle") setSubmitStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const firstInvalid = (Object.keys(errors) as FieldName[])[0];
    if (firstInvalid) {
      setTouched({ name: true, email: true, message: true });
      (e.currentTarget.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const currentTime = new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
      if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.publicKey) throw new Error("EmailJS env vars not set");
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          name: values.name.trim(),
          email: values.email.trim(),
          subject: `Portfolio message from ${values.name.trim()}`,
          message: values.message.trim(),
          time: currentTime,
          to_email: siteConfig.email,
        },
        EMAILJS.publicKey
      );
      setSubmitStatus("success");
      setToastOpen(true);
      setValues(empty);
      setTouched({});
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cards = [
    { icon: Mail, title: "Email me", value: siteConfig.email, href: `mailto:${siteConfig.email}`, external: false },
    { icon: Phone, title: "Call me", value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phone}`, external: false },
    {
      icon: MapPin,
      title: "Based in",
      value: `Nairobi, Kenya · ${time ?? "--:--"} EAT`,
      href: "https://www.google.com/maps/place/Nairobi,+Kenya",
      external: true,
    },
  ];

  const elsewhere = [
    { href: siteConfig.github, label: "GitHub" },
    { href: siteConfig.linkedin, label: "LinkedIn" },
    { href: siteConfig.instagram, label: "Instagram" },
  ];

  const fieldProps = (f: FieldName) => ({
    id: `contact-${f}`,
    name: f,
    value: values[f],
    onChange: handleChange,
    onBlur: () => setTouched((t) => ({ ...t, [f]: true })),
    "aria-invalid": showError(f) ? true : undefined,
    "aria-describedby": showError(f) ? `contact-${f}-error` : undefined,
    required: true,
    className: "c-input",
  });

  return (
    <div id="contact" className="q-page">
      <div className="q-wrap">
        <Breadcrumbs />
        <SectionHeader
          index="04"
          label="Contact"
          title={<>Say <em>hello</em></>}
          description="Questions, ideas, collaborations or just a hello. I read every message myself and reply within a day."
        />

        <div className="c-layout">
          <aside className="c-side">
            <ul className="c-cards">
              {cards.map(({ icon: Icon, title, value, href, external }) => (
                <li key={title}>
                  <a
                    href={href}
                    className="c-card"
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    <span className="c-card-icon" aria-hidden="true"><Icon /></span>
                    <span className="c-card-text">
                      <strong>{title}</strong>
                      <span>{value}</span>
                    </span>
                    <span className="c-card-go" aria-hidden="true"><ArrowUpRight /></span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="c-elsewhere">
              <span className="q-eyebrow">Elsewhere</span>
              {elsewhere.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="q-link">
                  {item.label} <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </p>
          </aside>

          <form onSubmit={handleSubmit} noValidate className="c-form" aria-label="Send a message">
            <fieldset disabled={isSubmitting} className="c-fieldset">
              <Field label="Name" name="name" error={showError("name")}>
                <input {...fieldProps("name")} type="text" autoComplete="name" />
              </Field>
              <Field label="Email" name="email" error={showError("email")}>
                <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" />
              </Field>
              <Field label="Message" name="message" error={showError("message")} grow>
                <textarea {...fieldProps("message")} rows={5} maxLength={MESSAGE_MAX} />
              </Field>

              <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="c-send">
                <Send className={isSubmitting ? "send-plane" : undefined} aria-hidden="true" />
                {isSubmitting ? "Sending…" : "Send message"}
              </button>
            </fieldset>

            <div role="status" aria-live="polite">
              {submitStatus === "error" && (
                <p className="c-error animate-fade-in-up">
                  <TriangleAlert aria-hidden="true" />
                  Message not sent. Please try again or email me directly.
                </p>
              )}
            </div>
          </form>
        </div>

        {mounted &&
          createPortal(
            <div role="status" aria-live="polite" className="toast-pop c-toast" data-open={toastOpen}>
              {toastOpen && (
                <>
                  <Check aria-hidden="true" />
                  <span>Message sent. Thank you.</span>
                  <button onClick={() => setToastOpen(false)} aria-label="Dismiss">&times;</button>
                </>
              )}
            </div>,
            document.body,
          )}

      </div>
    </div>
  );
}

function Field({ label, name, error, grow, children }: { label: string; name: string; error?: string; grow?: boolean; children: React.ReactNode }) {
  return (
    <div className="c-field" data-grow={grow || undefined} data-invalid={error ? "" : undefined}>
      <label htmlFor={`contact-${name}`}>{label}</label>
      {children}
      {error && (
        <p id={`contact-${name}-error`} className="c-error">
          <TriangleAlert aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
