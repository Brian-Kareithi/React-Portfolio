"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import emailjs from "@emailjs/browser";
import Lottie from "lottie-react";
import sittingPerson from "@/app/lib/sitting-person.json";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";
import { Github, Instagram, Linkedin, Mail, Phone, MapPin, Send, CheckCircle2, TriangleAlert } from "lucide-react";

type FieldName = "name" | "email" | "subject" | "message";
type Errors = Partial<Record<FieldName, string>>;

const MESSAGE_MIN = 20;
const MESSAGE_MAX = 2000;
const topics = ["Hiring / job opportunity", "Project or freelance work", "Collaboration", "Something else"];
/** Placeholders follow the selected topic so each prompt asks for what a good first message needs. */
const topicPrompts: Record<string, { subject: string; message: string }> = {
  "Hiring / job opportunity": {
    subject: "Senior Frontend Engineer, Nairobi or remote",
    message: "Role, team, stack and timeline.",
  },
  "Project or freelance work": {
    subject: "Booking platform for a property developer, MVP in 8 weeks",
    message: "What you want built, who uses it, timeline and budget.",
  },
  Collaboration: {
    subject: "Partnership on an open-source road-safety tool",
    message: "What you are working on and how I can help.",
  },
  "Something else": {
    subject: "Question about your work or availability",
    message: "What you need, and any helpful context.",
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

const inputClass =
  "w-full rounded-lg border bg-transparent px-3.5 py-2.5 text-sm outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_var(--color-accent-glow)]";

export default function ContactClient() {
  const [values, setValues] = useState<Record<FieldName, string>>({ name: "", email: "", subject: "", message: "" });
  const [topic, setTopic] = useState(topics[0]);
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [toastOpen, setToastOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
    { icon: Mail, label: "Email", value: "kareithibrian2@gmail.com", href: "mailto:kareithibrian2@gmail.com" },
    { icon: Phone, label: "Phone", value: "+254 119 343 294", href: "tel:+254119343294" },
    { icon: MapPin, label: "Location", value: "Nairobi, Kenya (EAT, UTC+3)", href: null as string | null },
  ];

  const socials = [
    { icon: Github, href: "https://github.com/Brian-Kareithi", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/brian-kareithi-04007637b/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/kareithi._/", label: "Instagram" },
  ];

  const fieldProps = (f: FieldName) => ({
    id: `contact-${f}`,
    name: f,
    value: values[f],
    onChange: handleChange,
    onBlur: () => setTouched((t) => ({ ...t, [f]: true })),
    "aria-invalid": showError(f) ? true : undefined,
    "aria-describedby": showError(f) ? `contact-${f}-error` : f === "message" ? "contact-message-hint" : undefined,
    required: true,
    style: { color: "var(--color-text-primary)", borderColor: showError(f) ? "var(--color-error)" : "var(--color-border-hover)" },
  });

  return (
    <section id="contact" className="relative w-full px-4 sm:px-6 lg:px-8 pb-12 pt-24 md:pb-14 md:pt-28"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
        <div className="max-w-5xl mx-auto w-full">
          <Breadcrumbs />
          <SectionHeader
            index="04"
            label="Connect"
            variant="split"
            compact
            title={<>Let&apos;s build something <em className="font-serif-accent">good</em></>}
            description="Hiring or planning a project? I reply personally, usually within 24 hours."
          />

          <StaggerReveal staggerDelay={100}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">

            {/* Direct lines */}
            <div className="ink-slab relative flex flex-col justify-between gap-6 p-5 sm:p-6 lg:col-span-2">
              {/* Sits on the top edge of the slab, outside it, so it keeps the light-page colours */}
              <div className="pointer-events-none absolute -top-[44px] left-8 h-[70px] w-[52px]" aria-hidden="true">
                <Lottie animationData={sittingPerson} loop={!reduceMotion} autoplay={!reduceMotion} rendererSettings={{ preserveAspectRatio: "xMidYMax meet" }} />
              </div>
              <div>
                <p className="field-label mb-5">Direct</p>
                <ul className="space-y-4">
                  {direct.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "var(--color-surface-strong)", color: "var(--color-accent)" }}>
                        <item.icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="link-underline block break-words text-base font-medium" style={{ color: "var(--color-text-primary)" }}>
                            {item.value}
                          </a>
                        ) : (
                          <span className="block text-base font-medium" style={{ color: "var(--color-text-primary)" }}>{item.value}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex gap-2">
                  {socials.map((item) => (
                    <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                      aria-label={item.label}
                      className="icon-chip flex h-11 w-11 items-center justify-center rounded-lg border"
                      style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
                      <item.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="plate p-5 sm:p-6 lg:col-span-3">
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>Send a message</h2>
                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>All fields required</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-3">
                <fieldset disabled={isSubmitting} className="m-0 min-w-0 space-y-3 border-0 p-0">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Your name" name="name" error={showError("name")}>
                    <input {...fieldProps("name")} type="text" autoComplete="name" placeholder="Full name" className={inputClass} />
                  </Field>
                  <Field label="Email address" name="email" error={showError("email")}>
                    <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" placeholder="name@company.com" className={inputClass} />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-topic" className="mb-1 block text-xs font-medium" style={{ color: "var(--color-text-primary)" }}>
                    What is this about?
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className={inputClass}
                    style={{ color: "var(--color-text-primary)", borderColor: "var(--color-border-hover)" }}
                  >
                    {topics.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <Field label="Subject" name="subject" error={showError("subject")}>
                  <input {...fieldProps("subject")} type="text" autoComplete="off" placeholder={topicPrompts[topic]?.subject} className={inputClass} />
                </Field>
                </div>

                <Field
                  label="Message"
                  name="message"
                  hint={`Goals, timeline, links. Min ${MESSAGE_MIN} characters.`}
                  error={showError("message")}
                  counter={`${values.message.length} / ${MESSAGE_MAX}`}
                >
                  <textarea {...fieldProps("message")} rows={3} maxLength={MESSAGE_MAX} placeholder={topicPrompts[topic]?.message} className={`${inputClass} resize-y`} />
                </Field>

                <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}
                  className="btn-neon btn-neon-primary send-btn w-full justify-center" data-sending={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Send className="send-plane h-4 w-4" aria-hidden="true" />
                      <span>Sending... relax, I&apos;m still sending</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send message
                    </>
                  )}
                </button>
                </fieldset>

                <div role="status" aria-live="polite">
                  {submitStatus === "error" && (
                    <div className="animate-fade-in-up flex items-start gap-2.5 rounded-lg border p-3 text-sm"
                      style={{ borderColor: "var(--color-error)", color: "var(--color-error)" }}>
                      <TriangleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                      Message not sent. Please try again or email me directly.
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
          </StaggerReveal>

          {mounted &&
            createPortal(
              <div
                role="status"
                aria-live="polite"
                className="toast-pop fixed right-4 top-20 z-[90] flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-xl px-4 py-3 shadow-lg sm:right-6"
                data-open={toastOpen}
                style={{ backgroundColor: "var(--palette-ink)", color: "var(--palette-cream)" }}
              >
                {toastOpen && (
                  <>
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" aria-hidden="true" style={{ color: "var(--palette-sand)" }} />
                    <span className="text-sm font-medium">Message sent successfully</span>
                    <button
                      onClick={() => setToastOpen(false)}
                      aria-label="Dismiss"
                      className="ml-1 flex h-6 w-6 items-center justify-center rounded-full text-lg leading-none opacity-70 transition-opacity hover:opacity-100"
                    >
                      &times;
                    </button>
                  </>
                )}
              </div>,
              document.body,
            )}

          <NextSection
            title="Not ready to write yet?"
            description="Read my story or see my work first."
            links={[
              { href: "/about", label: "About", description: "My story and track record." },
              { href: "/projects", label: "Selected Work", description: "Live products and demos." },
              { href: "/homelab", label: "Homelab", description: "The lab I run at home." },
            ]}
          />
        </div>
      </ScrollReveal>
    </section>
  );
}

function Field({ label, name, hint, error, counter, children }: { label: string; name: string; hint?: string; error?: string; counter?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={`contact-${name}`} className="mb-1 block text-xs font-medium" style={{ color: "var(--color-text-primary)" }}>
        {label}
      </label>
      {children}
      {(error || hint || counter) && (
      <div className="mt-1 flex items-start justify-between gap-3 text-xs">
        {error ? (
          <p id={`contact-${name}-error`} className="flex items-start gap-1.5" style={{ color: "var(--color-error)" }}>
            <TriangleAlert className="mt-px h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            {error}
          </p>
        ) : (
          <p id={`contact-${name}-hint`} style={{ color: "var(--color-text-muted)" }}>{hint}</p>
        )}
        {counter && <span className="flex-shrink-0 font-mono tabular-nums" style={{ color: "var(--color-text-muted)" }}>{counter}</span>}
      </div>
      )}
    </div>
  );
}
