"use client";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
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
  "w-full rounded-lg border bg-transparent px-3.5 py-3 text-[15px] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_var(--color-accent-glow)]";

export default function ContactClient() {
  const [values, setValues] = useState<Record<FieldName, string>>({ name: "", email: "", subject: "", message: "" });
  const [topic, setTopic] = useState(topics[0]);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

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
    "aria-describedby": showError(f) ? `contact-${f}-error` : `contact-${f}-hint`,
    required: true,
    style: { color: "var(--color-text-primary)", borderColor: showError(f) ? "var(--color-error)" : "var(--color-border-hover)" },
  });

  return (
    <section id="contact" className="relative w-full px-4 sm:px-6 lg:px-8 pb-20 pt-24 md:pb-24 md:pt-32"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
        <div className="max-w-5xl mx-auto w-full">
          <Breadcrumbs />
          <SectionHeader
            index="04"
            label="Connect"
            variant="split"
            title={<>Get in <em className="font-serif-accent">touch</em></>}
            description="Hiring, a project, or a collaboration: tell me what you have in mind and I will reply with next steps."
          />

          <StaggerReveal staggerDelay={100}>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">

            {/* Direct lines */}
            <div className="ink-slab flex flex-col justify-between gap-8 p-6 sm:p-8 lg:col-span-2">
              <div>
                <h2 className="display-xl mb-6 text-4xl sm:text-5xl">
                  Let&apos;s <span className="font-serif-accent">talk</span>.
                </h2>
                <ul className="space-y-5">
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
                <div className="mb-6 border-t pt-6" style={{ borderColor: "var(--color-border)" }}>
                  <p className="display-xl text-4xl" style={{ color: "var(--color-accent)" }}>24h</p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Typical response time on working days</p>
                </div>
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
            <div className="plate p-6 sm:p-8 lg:col-span-3">
              <h2 className="mb-1 text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>Send a message</h2>
              <p className="mb-6 text-sm" style={{ color: "var(--color-text-muted)" }}>All fields are required.</p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Your name" name="name" hint="So I know who to address." error={showError("name")}>
                    <input {...fieldProps("name")} type="text" autoComplete="name" placeholder="Jane Doe" className={inputClass} />
                  </Field>
                  <Field label="Email address" name="email" hint="Where I should reply." error={showError("email")}>
                    <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" placeholder="you@company.com" className={inputClass} />
                  </Field>
                </div>

                <div>
                  <label htmlFor="contact-topic" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
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

                <Field label="Subject" name="subject" hint="A one-line summary." error={showError("subject")}>
                  <input {...fieldProps("subject")} type="text" autoComplete="off" placeholder="Frontend role at Acme, or quote for a booking site" className={inputClass} />
                </Field>

                <Field
                  label="Message"
                  name="message"
                  hint={`Include goals, timeline and any links. At least ${MESSAGE_MIN} characters.`}
                  error={showError("message")}
                  counter={`${values.message.length} / ${MESSAGE_MAX}`}
                >
                  <textarea {...fieldProps("message")} rows={6} maxLength={MESSAGE_MAX} placeholder="Tell me about the role or project…" className={`${inputClass} resize-y`} />
                </Field>

                <button type="submit" disabled={isSubmitting}
                  className="btn-neon btn-neon-primary w-full justify-center disabled:opacity-60">
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send message
                    </>
                  )}
                </button>

                <div role="status" aria-live="polite">
                  {submitStatus === "success" && (
                    <div className="animate-fade-in-up flex items-start gap-2.5 rounded-lg p-3 text-sm"
                      style={{ backgroundColor: "var(--color-highlight)", color: "var(--color-text-primary)" }}>
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "var(--color-success)" }} aria-hidden="true" />
                      Message sent. I usually reply within 24 hours.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="animate-fade-in-up flex items-start gap-2.5 rounded-lg border p-3 text-sm"
                      style={{ borderColor: "var(--color-error)", color: "var(--color-error)" }}>
                      <TriangleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                      Your message was not sent. Please try again, or email me directly at kareithibrian2@gmail.com.
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
          </StaggerReveal>

          <NextSection
            title="Before you reach out"
            description="Explore the journey, the work, and what happens outside client projects."
            links={[
              { href: "/about", label: "About", description: "The journey behind the developer." },
              { href: "/projects", label: "Selected Work", description: "Delivered products and experiments." },
              { href: "/homelab", label: "Homelab", description: "The 24/7 infrastructure I build and run." },
            ]}
          />
        </div>
      </ScrollReveal>
    </section>
  );
}

function Field({ label, name, hint, error, counter, children }: { label: string; name: string; hint: string; error?: string; counter?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={`contact-${name}`} className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
        {label}
      </label>
      {children}
      <div className="mt-1.5 flex items-start justify-between gap-3 text-xs">
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
    </div>
  );
}
