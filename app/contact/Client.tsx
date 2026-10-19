"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import emailjs from "@emailjs/browser";
import useLocalTime from "@/app/components/ui/useLocalTime";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";
import { ArrowUpRight, Send, TriangleAlert, Check } from "lucide-react";
import { siteConfig } from "@/app/lib/site";

type FieldName = "name" | "email" | "subject" | "message";
type Errors = Partial<Record<FieldName, string>>;

const MESSAGE_MIN = 20;
const MESSAGE_MAX = 2000;
const topics = ["A project", "A role", "Collaboration", "Just hello"];
const topicPrompts: Record<string, { subject: string; message: string }> = {
  "A project": {
    subject: "Booking platform for a property developer",
    message: "What you want built, who uses it, and roughly when.",
  },
  "A role": {
    subject: "Frontend engineer, Nairobi or remote",
    message: "The team, the stack and what the first months look like.",
  },
  Collaboration: {
    subject: "Open-source road-safety tool",
    message: "What you are working on and where I could help.",
  },
  "Just hello": {
    subject: "A question about your work",
    message: "Whatever is on your mind.",
  },
};
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Enter your name (at least 2 characters).";
  if (!emailPattern.test(values.email.trim())) errors.email = "Enter a valid email address, for example you@company.com.";
  if (values.subject.trim().length < 3) errors.subject = "Add a short subject so I know what this is about.";
  const len = values.message.trim().length;
  if (len < MESSAGE_MIN) errors.message = `Tell me a little more (${MESSAGE_MIN - len} more characters needed).`;
  return errors;
}

export default function ContactClient() {
  const [values, setValues] = useState<Record<FieldName, string>>({ name: "", email: "", subject: "", message: "" });
  const [topic, setTopic] = useState(topics[0]);
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
    emailjs.init("Qpn7vRC-rFaXswyIE");
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
      setTouched({ name: true, email: true, subject: true, message: true });
      (e.currentTarget.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const currentTime = new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
      await emailjs.send(
        "service_16tnvzd",
        "template_g2pvfu2",
        {
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: `Topic: ${topic}\n\n${values.message.trim()}`,
          time: currentTime,
          to_email: "kareithibrian2@gmail.com",
        },
        "Qpn7vRC-rFaXswyIE"
      );
      setSubmitStatus("success");
      setToastOpen(true);
      setValues({ name: "", email: "", subject: "", message: "" });
      setTouched({});
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const direct = [
    { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { label: "Phone", value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phone}` },
    { label: "Based in", value: "Nairobi, Kenya", href: null as string | null },
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
            <dl className="c-direct">
              {direct.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>
                    {item.href ? (
                      <a href={item.href} className="c-big">{item.value}</a>
                    ) : (
                      <span className="c-big">{item.value}</span>
                    )}
                  </dd>
                </div>
              ))}
              <div>
                <dt>Local time</dt>
                <dd>
                  <span className="c-big">
                    <time className="tabular-nums">{time ?? "--:--"}</time> <span className="q-small">EAT, UTC+3</span>
                  </span>
                </dd>
              </div>
            </dl>
            <div className="c-elsewhere">
              <p className="q-eyebrow" style={{ marginBottom: "0.5rem" }}>Elsewhere</p>
              {elsewhere.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="q-link">
                  {item.label} <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>
          </aside>

          <form onSubmit={handleSubmit} noValidate className="c-form" aria-label="Send a message">
            <fieldset disabled={isSubmitting} className="c-fieldset">
              <legend className="q-eyebrow" style={{ marginBottom: "1.5rem" }}>What is this about?</legend>
              <div className="c-topics" role="radiogroup" aria-label="Topic">
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="radio"
                    aria-checked={topic === t}
                    onClick={() => setTopic(t)}
                    className="c-topic"
                  >
                    {topic === t && <Check aria-hidden="true" />}
                    {t}
                  </button>
                ))}
              </div>

              <div className="c-grid">
                <Field label="Your name" name="name" error={showError("name")}>
                  <input {...fieldProps("name")} type="text" autoComplete="name" placeholder="Full name" />
                </Field>
                <Field label="Email address" name="email" error={showError("email")}>
                  <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" placeholder="name@company.com" />
                </Field>
              </div>

              <Field label="Subject" name="subject" error={showError("subject")}>
                <input {...fieldProps("subject")} type="text" autoComplete="off" placeholder={topicPrompts[topic]?.subject} />
              </Field>

              <Field label="Message" name="message" error={showError("message")} counter={`${values.message.length} / ${MESSAGE_MAX}`}>
                <textarea {...fieldProps("message")} rows={4} maxLength={MESSAGE_MAX} placeholder={topicPrompts[topic]?.message} style={{ resize: "vertical" }} />
              </Field>

              <div className="c-submit">
                <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="q-btn" data-solid>
                  <Send className={isSubmitting ? "send-plane" : undefined} aria-hidden="true" />
                  {isSubmitting ? "Sending…" : "Send message"}
                </button>
                <p className="q-small">All fields required.</p>
              </div>
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

        <NextSection
          title="Or read on"
          links={[
            { href: "/about", label: "About", description: "My story and track record." },
            { href: "/projects", label: "Selected work", description: "Live products and demos." },
            { href: "/homelab", label: "Homelab", description: "The lab I run at home." },
          ]}
        />
      </div>
    </div>
  );
}

function Field({ label, name, error, counter, children }: { label: string; name: string; error?: string; counter?: string; children: React.ReactNode }) {
  return (
    <div className="c-field">
      <label htmlFor={`contact-${name}`}>{label}</label>
      {children}
      {(error || counter) && (
        <div className="c-meta">
          {error ? (
            <p id={`contact-${name}-error`} className="c-error">
              <TriangleAlert aria-hidden="true" />
              {error}
            </p>
          ) : (
            <span />
          )}
          {counter && <span className="q-mono">{counter}</span>}
        </div>
      )}
    </div>
  );
}
