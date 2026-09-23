"use client";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";
import { Github, Linkedin, Instagram, Mail, Phone, MapPin, User, Send, CheckCircle2, TriangleAlert } from "lucide-react";

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

  const underlineStyle = (field: string) => ({
    color: "var(--color-text-primary)",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${activeField === field ? "var(--color-accent)" : "var(--color-border)"}`,
    borderRadius: 0,
    transition: "border-color 0.25s ease",
  });

  return (
    <section id="contact" className="relative w-full px-4 pb-20 pt-24 md:pb-24 md:pt-32"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
        <div className="max-w-4xl mx-auto w-full">
          <Breadcrumbs />
          <SectionHeader
            index="04"
            label="Connect"
            title={<>Get in <em className="font-serif-accent">touch</em></>}
            description="Have a project, collaboration idea, or just want to connect? I'm always open to meaningful conversations."
          />

          <StaggerReveal staggerDelay={100}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 xs:gap-5 mb-10">

            {/* Left column */}
            <div className="lg:col-span-2 flex flex-col gap-4 xs:gap-5">

              {/* Info card */}
              <div className="flat-card p-4">
                <p className="text-[9px] font-medium tracking-[0.3em] uppercase mb-3 flex items-center gap-2"
                  style={{ color: "var(--color-text-muted)" }}>
                  <span className="w-4 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
                  Info
                </p>

                <div>
                  {[
                    { icon: Mail, label: "Email", value: "kareithibrian2@gmail.com", href: "mailto:kareithibrian2@gmail.com" },
                    { icon: Phone, label: "Phone", value: "+254 119 343 294", href: "tel:+254119343294" },
                    { icon: MapPin, label: "Location", value: "Nairobi, Kenya", href: null as string | null },
                  ].map((item, i) => (
                    <div key={item.label}
                      className={`group flex items-center gap-3 py-2.5 transition-colors duration-300 ${i < 2 ? "border-b" : ""}`}
                      style={{
                        borderColor: "var(--color-border)",
                      }}>
                      <item.icon className="h-3.5 w-3.5 flex-shrink-0 transition-colors duration-300 group-hover:text-current"
                        style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                      <div className="min-w-0 flex-1">
                        <p className="mb-0.5 text-[8px] uppercase tracking-wider"
                          style={{ color: "var(--color-text-muted)" }}>
                          {item.label}
                        </p>
                        {item.href ? (
                          <a href={item.href}
                            title={item.value}
                            className="block break-all text-xs font-medium transition-colors duration-200 hover:opacity-70"
                            style={{ color: "var(--color-text-primary)" }}>
                            {item.value}
                          </a>
                        ) : (
                          <span className="block break-all text-xs font-medium"
                            style={{ color: "var(--color-text-primary)" }}>
                            {item.value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social card */}
              <div className="flat-card p-4">
                <p className="text-[9px] font-medium tracking-[0.3em] uppercase mb-3 flex items-center gap-2"
                  style={{ color: "var(--color-text-muted)" }}>
                  <span className="w-4 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
                  Social
                </p>
                <div className="flex gap-2">
                  {[
                    { icon: Github, href: "https://github.com/Brian-Kareithi", label: "GitHub" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/brian-kareithi-04007637b/", label: "LinkedIn" },
                    { icon: Instagram, href: "https://www.instagram.com/kareithiv", label: "Instagram" },
                  ].map((item) => (
                    <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                      aria-label={item.label}
                      className="icon-chip liquid-glass flex h-11 w-11 items-center justify-center rounded-lg"
                      style={{
                        color: "var(--color-text-secondary)",
                      }}>
                      <item.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Stats card */}
              <div className="flat-card p-4 flex items-center gap-5">
                <div>
                  <p className="text-base font-bold" style={{ color: "var(--color-accent)" }}>24h</p>
                  <p className="text-[8px] uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                    Response
                  </p>
                </div>
                <div className="w-px h-7" style={{ backgroundColor: "var(--color-border)" }} />
                <div>
                  <p className="text-base font-bold" style={{ color: "var(--color-accent)" }}>100%</p>
                  <p className="text-[8px] uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                    Satisfaction
                  </p>
                </div>
              </div>
            </div>

            {/* Form card */}
            <div className="lg:col-span-3">
              <div className="flat-card p-4 h-full">
                <p className="text-[9px] font-medium tracking-[0.3em] uppercase mb-3 flex items-center gap-2"
                  style={{ color: "var(--color-text-muted)" }}>
                  <span className="w-4 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
                  Message
                </p>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="group relative">
                      <div className="absolute left-0 top-3 z-10 transition-all duration-300"
                        style={{ color: activeField === "name" ? "var(--color-accent)" : "var(--color-text-muted)" }}>
                        <User className="h-3.5 w-3.5" aria-hidden="true" />
                      </div>
                      <label htmlFor="contact-name" className="sr-only">Your name</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setActiveField("name")}
                        onBlur={() => setActiveField(null)}
                        placeholder="Your name"
                        autoComplete="name"
                        required
                        className="w-full py-2.5 pl-7 pr-3.5 text-sm outline-none transition-all duration-300"
                        style={underlineStyle("name")}
                      />
                    </div>

                    <div className="group relative">
                      <div className="absolute left-0 top-3 z-10 transition-all duration-300"
                        style={{ color: activeField === "email" ? "var(--color-accent)" : "var(--color-text-muted)" }}>
                        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                      </div>
                      <label htmlFor="contact-email" className="sr-only">Email address</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setActiveField("email")}
                        onBlur={() => setActiveField(null)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                        className="w-full py-2.5 pl-7 pr-3.5 text-sm outline-none transition-all duration-300"
                        style={underlineStyle("email")}
                      />
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="absolute left-0 top-3 z-10 transition-all duration-300"
                      style={{ color: activeField === "subject" ? "var(--color-accent)" : "var(--color-text-muted)" }}>
                      <Send className="h-3.5 w-3.5" aria-hidden="true" />
                    </div>
                    <label htmlFor="contact-subject" className="sr-only">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setActiveField("subject")}
                      onBlur={() => setActiveField(null)}
                      placeholder="Subject"
                      autoComplete="off"
                      required
                      className="w-full py-2.5 pl-7 pr-3.5 text-sm outline-none transition-all duration-300"
                      style={underlineStyle("subject")}
                    />
                  </div>

                  <div className="group relative">
                    <div className="absolute left-0 top-3 z-10 transition-all duration-300"
                      style={{ color: activeField === "message" ? "var(--color-accent)" : "var(--color-text-muted)" }}>
                      <Send className="h-3.5 w-3.5" aria-hidden="true" />
                    </div>
                    <label htmlFor="contact-message" className="sr-only">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setActiveField("message")}
                      onBlur={() => setActiveField(null)}
                      placeholder="Tell me about your project…"
                      required
                      rows={4}
                      className="w-full resize-none py-2.5 pl-7 pr-3.5 text-sm outline-none transition-all duration-300"
                      style={underlineStyle("message")}
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting}
                    className="btn-neon btn-neon-primary w-full justify-center min-h-[44px]"
                    style={{ opacity: isSubmitting ? 0.6 : 1 }}>
                    
                    {isSubmitting ? (
                      <span className="flex items-center gap-2.5">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending...
                      </span>
                    ) : submitStatus === "success" ? (
                      <span className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        Sent!
                      </span>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </button>

                  <div className="min-h-[46px]" role="status" aria-live="polite">
                    {submitStatus === "success" && (
                      <div className="animate-fade-in-up flex items-center gap-2.5 rounded-lg p-2.5 text-[11px]"
                        style={{
                          border: "1px solid var(--color-accent)",
                          backgroundColor: "var(--color-bg-tertiary)",
                          color: "var(--color-accent)",
                        }}>
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                        Message sent! I usually respond within 24 hours.
                      </div>
                    )}
                    {submitStatus === "error" && (
                      <div className="animate-fade-in-up flex items-center gap-2.5 rounded-lg p-2.5 text-[11px]"
                        style={{
                          border: "1px solid var(--color-error)",
                          backgroundColor: "var(--color-bg-tertiary)",
                          color: "var(--color-error)",
                        }}>
                        <TriangleAlert className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                        Something went wrong. Please try again or email me directly.
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          </StaggerReveal>

          <NextSection
            title="Before you reach out"
            description="Explore the journey, the work, and what happens outside client projects."
            links={[
              { href: "/about", label: "About", description: "The journey behind the developer." },
              { href: "/projects", label: "Selected Work", description: "Delivered products and experiments." },
              { href: "/hobbies", label: "Homelab", description: "What I build when the workday ends." },
            ]}
          />
        </div>
      </ScrollReveal>
    </section>
  );
}
