"use client";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
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
    <section id="contact" className="w-full pt-24 md:pt-32 pb-8 md:pb-10 px-4 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
        <div className="max-w-4xl mx-auto w-full">
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
                    { icon: FaEnvelope, label: "Email", value: "kareithibrian2@gmail.com", href: "mailto:kareithibrian2@gmail.com" },
                    { icon: FaPhone, label: "Phone", value: "+254 718 593 392", href: "tel:+254718593392" },
                    { icon: FaMapMarkerAlt, label: "Location", value: "Nairobi, Kenya", href: "#" },
                  ].map((item, i) => (
                    <div key={item.label}
                      className={`group flex items-center gap-3 py-2.5 transition-colors duration-300 ${i < 2 ? "border-b" : ""}`}
                      style={{
                        borderColor: "var(--color-border)",
                      }}>
                      <item.icon className="w-3.5 h-3.5 flex-shrink-0 transition-colors duration-300 group-hover:text-current"
                        style={{ color: "var(--color-accent)" }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[8px] tracking-wider uppercase mb-0.5"
                          style={{ color: "var(--color-text-muted)" }}>
                          {item.label}
                        </p>
                        <a href={item.href}
                          className="text-xs font-medium truncate block transition-colors duration-200 hover:opacity-70"
                          style={{ color: "var(--color-text-primary)" }}>
                          {item.value}
                        </a>
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
                    { icon: FaGithub, href: "https://github.com/Brian-Kareithi", label: "GitHub" },
                    { icon: FaLinkedin, href: "https://linkedin.com/in/brian-kareithi-04007637b/", label: "LinkedIn" },
                    { icon: FaInstagram, href: "https://www.instagram.com/kareithiv", label: "Instagram" },
                  ].map((item) => (
                    <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                      className="icon-chip w-9 h-9 rounded-lg flex items-center justify-center liquid-glass"
                      style={{
                        color: "var(--color-text-secondary)",
                      }}>
                      <item.icon className="w-4 h-4" />
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative group">
                      <div className="absolute left-0 top-3 z-10 transition-all duration-300"
                        style={{ color: activeField === "name" ? "var(--color-accent)" : "var(--color-text-muted)" }}>
                        <FaUser className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setActiveField("name")}
                        onBlur={() => setActiveField(null)}
                        placeholder="Your Name"
                        required
                        className="w-full pl-7 pr-3.5 py-2.5 text-sm outline-none transition-all duration-300"
                        style={underlineStyle("name")}
                      />
                    </div>

                    <div className="relative group">
                      <div className="absolute left-0 top-3 z-10 transition-all duration-300"
                        style={{ color: activeField === "email" ? "var(--color-accent)" : "var(--color-text-muted)" }}>
                        <FaEnvelope className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setActiveField("email")}
                        onBlur={() => setActiveField(null)}
                        placeholder="your@email.com"
                        required
                        className="w-full pl-7 pr-3.5 py-2.5 text-sm outline-none transition-all duration-300"
                        style={underlineStyle("email")}
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute left-0 top-3 z-10 transition-all duration-300"
                      style={{ color: activeField === "subject" ? "var(--color-accent)" : "var(--color-text-muted)" }}>
                      <FaPaperPlane className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setActiveField("subject")}
                      onBlur={() => setActiveField(null)}
                      placeholder="Subject"
                      required
                      className="w-full pl-7 pr-3.5 py-2.5 text-sm outline-none transition-all duration-300"
                      style={underlineStyle("subject")}
                    />
                  </div>

                  <div className="relative group">
                    <div className="absolute left-0 top-3 z-10 transition-all duration-300"
                      style={{ color: activeField === "message" ? "var(--color-accent)" : "var(--color-text-muted)" }}>
                      <FaPaperPlane className="w-3.5 h-3.5" />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setActiveField("message")}
                      onBlur={() => setActiveField(null)}
                      placeholder="Tell me about your project..."
                      required
                      rows={4}
                      className="w-full pl-7 pr-3.5 py-2.5 text-sm outline-none transition-all duration-300 resize-none"
                      style={underlineStyle("message")}
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting}
                    className="btn-neon btn-neon-primary w-full justify-center min-h-[44px]"
                    style={{ opacity: isSubmitting ? 0.6 : 1 }}>
                    
                    {isSubmitting ? (
                      <span className="flex items-center gap-2.5">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : submitStatus === "success" ? (
                      <span className="flex items-center gap-2.5">
                        <span className="text-lg">✓</span>
                        Sent!
                      </span>
                    ) : (
                      <>
                        <FaPaperPlane className="w-3.5 h-3.5" />
                        Send Message
                      </>
                    )}
                  </button>

                  <div className="min-h-[46px]">
                    {submitStatus === "success" && (
                      <div className="p-2.5 text-[11px] animate-fade-in-up rounded-lg flex items-center gap-2.5"
                        style={{
                          border: "1px solid var(--color-accent)",
                          backgroundColor: "var(--color-bg-tertiary)",
                          color: "var(--color-accent)",
                        }}>
                        <span className="w-6 h-6 flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                          style={{ backgroundColor: "var(--color-accent)", color: "var(--color-text-light)" }}>✓</span>
                        Message sent! I usually respond within 24 hours.
                      </div>
                    )}
                    {submitStatus === "error" && (
                      <div className="p-2.5 text-[11px] animate-fade-in-up rounded-lg flex items-center gap-2.5"
                        style={{
                          border: "1px solid var(--color-border)",
                          backgroundColor: "var(--color-bg-tertiary)",
                          color: "var(--color-text-muted)",
                        }}>
                        <span className="text-sm flex-shrink-0">⚠️</span>
                        Something went wrong. Please try again.
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          </StaggerReveal>
        </div>
      </ScrollReveal>
    </section>
  );
}
