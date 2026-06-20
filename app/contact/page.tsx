"use client";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
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
      await emailjs.send(
        "service_v3qq6rr",
        "template_xzhm8p7",
        { from_name: formData.name, from_email: formData.email, subject: formData.subject, message: formData.message, to_email: "kareithibrian2@gmail.com" },
        "Qpn7vRC-rFaXswyIE"
      );
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen w-full py-28 md:py-36 px-4 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="absolute top-0 left-0 w-1/3 h-px"
        style={{ background: `linear-gradient(to right, transparent, var(--color-accent-secondary))` }} />
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-20 animate-fade-in-up">
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase mb-3"
            style={{ color: "var(--color-text-muted)" }}>
            Connect
          </p>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
            <h2 className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: "var(--color-text-primary)" }}>
              Get In Touch
            </h2>
            <div className="w-8 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
          </div>
          <p className="max-w-2xl mx-auto text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}>
            Have a project, collaboration idea, or just want to connect? I&apos;m always open to meaningful conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-px mb-16"
          style={{ backgroundColor: "var(--color-border)" }}>
          <div className="lg:col-span-2 p-8 md:p-10"
            style={{ backgroundColor: "var(--color-bg-primary)" }}>
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase mb-8"
              style={{ color: "var(--color-text-muted)" }}>
              Information
            </p>

            <div className="space-y-6">
              {[
                { icon: FaEnvelope, label: "Email", value: "kareithibrian2@gmail.com", href: "mailto:kareithibrian2@gmail.com" },
                { icon: FaPhone, label: "Phone", value: "+254 718 593 392", href: "tel:+254718593392" },
                { icon: FaMapMarkerAlt, label: "Location", value: "Nairobi, Kenya", href: "#" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 py-4 transition-all duration-200 hover:-translate-y-0.5"
                  style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <div className="w-10 h-10 flex items-center justify-center"
                    style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
                    <item.icon className="w-4 h-4" style={{ color: "var(--color-accent)" }} />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-wider uppercase"
                      style={{ color: "var(--color-text-muted)" }}>
                      {item.label}
                    </p>
                    <a href={item.href} className="text-sm font-medium transition-colors"
                      style={{ color: "var(--color-text-primary)" }}>
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="text-[10px] font-medium tracking-[0.3em] uppercase mb-4"
                style={{ color: "var(--color-text-muted)" }}>
                Social
              </p>
              <div className="flex gap-2">
                {[
                  { icon: FaGithub, href: "https://github.com/Brian-Kareithi", label: "GitHub" },
                  { icon: FaLinkedin, href: "https://linkedin.com/in/brian-kareithi-04007637b/", label: "LinkedIn" },
                ].map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                    className="p-3 transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-secondary)",
                      backgroundColor: "var(--color-surface)",
                    }}>
                    <item.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 p-8 md:p-10"
            style={{ backgroundColor: "var(--color-bg-primary)" }}>
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase mb-8"
              style={{ color: "var(--color-text-muted)" }}>
              Send a Message
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { name: "name", label: "Name", placeholder: "John Doe" },
                  { name: "email", label: "Email", placeholder: "john@example.com", type: "email" },
                ].map((field) => (
                  <div key={field.name}>
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      value={(formData as Record<string, string>)[field.name]}
                      onChange={handleChange}
                      onFocus={() => setActiveField(field.name)}
                      onBlur={() => setActiveField(null)}
                      placeholder={field.placeholder}
                      required
                      className="w-full px-4 py-3.5 text-sm outline-none transition-all duration-200"
                      style={{
                        backgroundColor: "var(--color-bg-card)",
                        border: `1px solid ${activeField === field.name ? "var(--color-accent)" : "var(--color-border)"}`,
                        color: "var(--color-text-primary)",
                      }}
                    />
                  </div>
                ))}
              </div>

              <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                onFocus={() => setActiveField("subject")}
                onBlur={() => setActiveField(null)}
                placeholder="Subject"
                required
                className="w-full px-4 py-3.5 text-sm outline-none transition-all duration-200"
                style={{
                  backgroundColor: "var(--color-bg-card)",
                  border: `1px solid ${activeField === "subject" ? "var(--color-accent)" : "var(--color-border)"}`,
                  color: "var(--color-text-primary)",
                }} />

              <textarea name="message" value={formData.message} onChange={handleChange}
                onFocus={() => setActiveField("message")}
                onBlur={() => setActiveField(null)}
                placeholder="Tell me about your project..."
                required rows={6}
                className="w-full px-4 py-3.5 text-sm outline-none transition-all duration-200 resize-none"
                style={{
                  backgroundColor: "var(--color-bg-card)",
                  border: `1px solid ${activeField === "message" ? "var(--color-accent)" : "var(--color-border)"}`,
                  color: "var(--color-text-primary)",
                }} />

              <button type="submit" disabled={isSubmitting}
                className="w-full py-3.5 text-sm font-medium tracking-wider uppercase transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  border: "1px solid var(--color-accent)",
                  color: "var(--color-accent)",
                  backgroundColor: "transparent",
                  opacity: isSubmitting ? 0.5 : 1,
                }}>
                {isSubmitting ? "Sending..." : submitStatus === "success" ? "Sent Successfully" : "Send Message"}
              </button>

              <div className="min-h-[60px]">
                {submitStatus === "success" && (
                  <div className="p-4 text-sm animate-fade-in-up"
                    style={{ border: "1px solid var(--color-accent)", color: "var(--color-accent)" }}>
                    Message sent! I typically respond within 24 hours.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="p-4 text-sm animate-fade-in-up"
                    style={{ border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}>
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: "Response Time", desc: "I aim to respond to all inquiries within 24 hours during business days.", icon: "01" },
            { title: "Open To", desc: "Freelance projects, full-time positions, research collaborations, and speaking engagements.", icon: "02" },
            { title: "Preferred Stack", desc: "React, Next.js, Node.js, TypeScript, PostgreSQL, and cloud-native architectures.", icon: "03" },
          ].map((item) => (
            <div key={item.title} className="p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
                <span className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
                  {item.icon}
                </span>
              </div>
              <h4 className="font-semibold text-sm mb-2"
                style={{ color: "var(--color-text-primary)" }}>
                {item.title}
              </h4>
              <p className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
