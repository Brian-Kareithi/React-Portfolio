"use client";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";
import { Github, Instagram, Linkedin, Mail, Phone, MapPin, User, Send, CheckCircle2, TriangleAlert } from "lucide-react";

export default function ContactClient() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    subject: "", 
    message: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    emailjs.init("Qpn7vRC-rFaXswyIE");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      const currentTime = new Date().toLocaleString('en-US', { 
        dateStyle: 'medium', 
        timeStyle: 'short' 
      });

      await emailjs.send(
        "service_16tnvzd",
        "template_g2pvfu2",
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: currentTime,
          to_email: "kareithibrian2@gmail.com"
        },
        "Qpn7vRC-rFaXswyIE"
      );
      
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldStyle = (field: string) => ({
    color: "var(--color-text-primary)",
    backgroundColor: "var(--color-bg-primary)",
    border: `1px solid ${activeField === field ? "var(--color-accent)" : "var(--color-border)"}`,
    boxShadow: activeField === field ? "0 0 0 3px var(--color-accent-glow)" : "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  });

  const direct = [
    { icon: Mail, label: "Email", value: "kareithibrian2@gmail.com", href: "mailto:kareithibrian2@gmail.com" },
    { icon: Phone, label: "Phone", value: "+254 119 343 294", href: "tel:+254119343294" },
    { icon: MapPin, label: "Location", value: "Nairobi, Kenya", href: null as string | null },
  ];

  const socials = [
    { icon: Github, href: "https://github.com/Brian-Kareithi", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/brian-kareithi-04007637b/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/kareithi._/", label: "Instagram" },
  ];

  const fields: { name: keyof typeof formData; label: string; type: string; placeholder: string; autoComplete: string; icon: typeof User; half?: boolean }[] = [
    { name: "name", label: "Your name", type: "text", placeholder: "Jane Doe", autoComplete: "name", icon: User, half: true },
    { name: "email", label: "Email address", type: "email", placeholder: "you@example.com", autoComplete: "email", icon: Mail, half: true },
    { name: "subject", label: "Subject", type: "text", placeholder: "What's it about?", autoComplete: "off", icon: Send },
  ];

  return (
    <section id="contact" className="relative w-full px-2.5 sm:px-5 lg:px-8.5 pb-20 pt-24 md:pb-24 md:pt-32"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
        <div className="max-w-5xl mx-auto w-full">
          <Breadcrumbs />
          <SectionHeader
            index="04"
            label="Connect"
            variant="split"
            title={<>Get in <em className="font-serif-accent">touch</em></>}
            description="Have a project, collaboration idea, or just want to connect? I'm always open to meaningful conversations."
          />

          <StaggerReveal staggerDelay={100}>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">

            {/* Direct lines */}
            <div className="ink-slab flex flex-col justify-between gap-10 p-7 sm:p-9 lg:col-span-2">
              <div>
                <h2 className="display-xl mb-8 text-4xl sm:text-5xl">
                  Let&apos;s <span className="font-serif-accent">talk</span>.
                </h2>
                <ul className="space-y-5">
                  {direct.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "var(--color-surface-strong)", color: "var(--color-accent)" }}>
                        <item.icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="link-underline block break-all text-base font-medium" style={{ color: "var(--color-text-primary)" }}>
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
                <div className="mb-6 flex gap-8">
                  <div>
                    <p className="display-xl text-4xl" style={{ color: "var(--color-accent)" }}>24h</p>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Response</p>
                  </div>
                  <div>
                    <p className="display-xl text-4xl" style={{ color: "var(--color-accent)" }}>100%</p>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Satisfaction</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {socials.map((item) => (
                    <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                      aria-label={item.label}
                      className="icon-chip flex h-11 w-11 items-center justify-center rounded-full border"
                      style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
                      <item.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="plate p-7 sm:p-9 lg:col-span-3">
              <p className="font-serif-accent mb-6 text-2xl" style={{ color: "var(--color-text-primary)" }}>
                Send a message
              </p>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {fields.map((f) => (
                    <div key={f.name} className={f.half ? "" : "md:col-span-2"}>
                      <label htmlFor={`contact-${f.name}`} className="mb-1.5 flex items-center gap-1.5 text-xs font-medium" style={{ color: activeField === f.name ? "var(--color-accent)" : "var(--color-text-secondary)" }}>
                        <f.icon className="h-3.5 w-3.5" aria-hidden="true" />
                        {f.label}
                      </label>
                      <input
                        id={`contact-${f.name}`}
                        type={f.type}
                        name={f.name}
                        value={formData[f.name]}
                        onChange={handleChange}
                        onFocus={() => setActiveField(f.name)}
                        onBlur={() => setActiveField(null)}
                        placeholder={f.placeholder}
                        autoComplete={f.autoComplete}
                        required
                        className="min-h-[44px] w-full rounded-full px-4 py-2.5 text-sm outline-none"
                        style={fieldStyle(f.name)}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-1.5 flex items-center gap-1.5 text-xs font-medium" style={{ color: activeField === "message" ? "var(--color-accent)" : "var(--color-text-secondary)" }}>
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setActiveField("message")}
                    onBlur={() => setActiveField(null)}
                    placeholder="Tell me about your project…"
                    required
                    rows={5}
                    className="w-full resize-none rounded-3xl px-4 py-3 text-sm outline-none"
                    style={fieldStyle("message")}
                  />
                </div>

                <button type="submit" disabled={isSubmitting}
                  className="btn-neon btn-neon-primary w-full justify-center min-h-[44px]"
                  style={{ opacity: isSubmitting ? 0.6 : 1 }}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2.5">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Sending...
                    </span>
                  ) : submitStatus === "success" ? (
                    <span className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      Sent!
                    </span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>

                <div className="min-h-[46px]" role="status" aria-live="polite">
                  {submitStatus === "success" && (
                    <div className="animate-fade-in-up flex items-center gap-2.5 rounded-2xl p-3 text-sm"
                      style={{ backgroundColor: "var(--color-highlight)", color: "var(--color-accent)" }}>
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                      Message sent! I usually respond within 24 hours.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="animate-fade-in-up flex items-center gap-2.5 rounded-2xl border p-3 text-sm"
                      style={{ borderColor: "var(--color-error)", color: "var(--color-error)" }}>
                      <TriangleAlert className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                      Something went wrong. Please try again or email me directly.
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
