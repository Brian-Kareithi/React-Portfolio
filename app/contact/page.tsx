"use client";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaPaperPlane, FaClock, FaCode, FaHandshake } from "react-icons/fa";

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

  return (
    <section id="contact" className="w-full pt-24 md:pt-32 pb-8 md:pb-10 px-4 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
        <div className="absolute top-0 left-0 w-1/3 h-px"
          style={{ background: `linear-gradient(to right, transparent, var(--color-accent-secondary))` }} />
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-10 animate-fade-in-up">
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase mb-2"
              style={{ color: "var(--color-text-muted)" }}>
              Connect
            </p>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-7 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
              <h2 className="text-2xl md:text-3xl font-bold leading-tight"
                style={{ color: "var(--color-text-primary)" }}>
                Get In Touch
              </h2>
              <div className="w-7 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
            </div>
            <p className="max-w-lg mx-auto text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}>
              Have a project, collaboration idea, or just want to connect? I&apos;m always open to meaningful conversations.
            </p>
          </div>

          <StaggerReveal staggerDelay={120}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
            {/* Information Container */}
            <div className="lg:col-span-2 p-4 md:p-5 rounded-xl relative overflow-hidden"
              style={{
                background: "var(--color-glass-bg)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid var(--color-glass-border-strong)",
                boxShadow: "0 4px 20px var(--color-glass-shadow), inset 0 1px 0 var(--color-glass-border)"
              }}>
              {/* Glass reflection effect */}
              <div className="absolute top-0 right-0 w-1/3 h-1/2 rounded-full opacity-10"
                style={{
                  background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
                  transform: "translate(30%, -30%)"
                }} />
              <div className="absolute bottom-0 left-0 w-1/4 h-1/4 rounded-full opacity-5"
                style={{
                  background: "radial-gradient(circle, var(--color-accent-secondary) 0%, transparent 70%)",
                  transform: "translate(-30%, 30%)"
                }} />

              <div className="relative z-10">
                <p className="text-[10px] font-medium tracking-[0.3em] uppercase mb-4 flex items-center gap-2"
                  style={{ color: "var(--color-text-muted)" }}>
                  <span className="w-4 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
                  Info
                </p>

                <div className="space-y-2.5">
                  {[
                    { icon: FaEnvelope, label: "Email", value: "kareithibrian2@gmail.com", href: "mailto:kareithibrian2@gmail.com" },
                    { icon: FaPhone, label: "Phone", value: "+254 718 593 392", href: "tel:+254718593392" },
                    { icon: FaMapMarkerAlt, label: "Location", value: "Nairobi, Kenya", href: "#" },
                  ].map((item) => (
                    <div key={item.label} 
                      className="group flex items-center gap-3 p-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        background: "var(--color-glass-item-bg)",
                        border: "1px solid var(--color-glass-border)",
                        backdropFilter: "blur(10px)",
                      }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0"
                        style={{
                          background: "var(--color-glass-icon-bg)",
                          border: "1px solid var(--color-glass-border)",
                          color: "var(--color-accent)"
                        }}>
                        <item.icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[8px] tracking-wider uppercase mb-0.5"
                          style={{ color: "var(--color-text-muted)" }}>
                          {item.label}
                        </p>
                        <a href={item.href} 
                          className="text-xs font-medium truncate block transition-colors hover:text-accent"
                          style={{ color: "var(--color-text-primary)" }}>
                          {item.value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <p className="text-[10px] font-medium tracking-[0.3em] uppercase mb-2.5 flex items-center gap-2"
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
                        className="group w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                        style={{
                          background: "var(--color-glass-icon-bg)",
                          border: "1px solid var(--color-glass-border)",
                          color: "var(--color-text-secondary)",
                          backdropFilter: "blur(10px)",
                        }}>
                        <item.icon className="w-4 h-4 transition-colors duration-300 group-hover:text-accent" 
                          style={{ color: "inherit" }} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quick stats */}
                <div className="mt-5 pt-4 grid grid-cols-2 gap-2"
                  style={{ borderTop: "1px solid var(--color-glass-border)" }}>
                  <div className="text-center p-2 rounded-lg"
                    style={{
                      background: "var(--color-glass-item-bg)",
                      border: "1px solid var(--color-glass-border)"
                    }}>
                    <p className="text-lg font-bold" style={{ color: "var(--color-accent)" }}>24h</p>
                    <p className="text-[8px] uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                      Response
                    </p>
                  </div>
                  <div className="text-center p-2 rounded-lg"
                    style={{
                      background: "var(--color-glass-item-bg)",
                      border: "1px solid var(--color-glass-border)"
                    }}>
                    <p className="text-lg font-bold" style={{ color: "var(--color-accent)" }}>100%</p>
                    <p className="text-[8px] uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                      Satisfaction
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Container */}
            <div className="lg:col-span-3 p-4 md:p-5 rounded-xl relative overflow-hidden"
              style={{
                background: "var(--color-glass-bg)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid var(--color-glass-border-strong)",
                boxShadow: "0 4px 20px var(--color-glass-shadow), inset 0 1px 0 var(--color-glass-border)"
              }}>
              {/* Glass reflection effect */}
              <div className="absolute top-0 left-0 w-1/3 h-1/2 rounded-full opacity-10"
                style={{
                  background: "radial-gradient(circle, var(--color-accent-secondary) 0%, transparent 70%)",
                  transform: "translate(-30%, -30%)"
                }} />
              <div className="absolute bottom-0 right-0 w-1/4 h-1/4 rounded-full opacity-5"
                style={{
                  background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
                  transform: "translate(30%, 30%)"
                }} />

              <div className="relative z-10">
                <p className="text-[10px] font-medium tracking-[0.3em] uppercase mb-4 flex items-center gap-2"
                  style={{ color: "var(--color-text-muted)" }}>
                  <span className="w-4 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
                  Message
                </p>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Name Field */}
                    <div className="relative group">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 transition-all duration-300"
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
                        className="w-full pl-9 pr-3.5 py-2.5 text-sm outline-none transition-all duration-300 rounded-lg"
                        style={{
                          background: "var(--color-glass-input-bg)",
                          backdropFilter: "blur(10px)",
                          border: `1px solid ${activeField === "name" ? "var(--color-accent)" : "var(--color-glass-border)"}`,
                          boxShadow: activeField === "name" ? "0 0 0 2.5px var(--color-accent-glow)" : "none",
                          color: "var(--color-text-primary)",
                        }}
                      />
                    </div>

                    {/* Email Field */}
                    <div className="relative group">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 transition-all duration-300"
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
                        className="w-full pl-9 pr-3.5 py-2.5 text-sm outline-none transition-all duration-300 rounded-lg"
                        style={{
                          background: "var(--color-glass-input-bg)",
                          backdropFilter: "blur(10px)",
                          border: `1px solid ${activeField === "email" ? "var(--color-accent)" : "var(--color-glass-border)"}`,
                          boxShadow: activeField === "email" ? "0 0 0 2.5px var(--color-accent-glow)" : "none",
                          color: "var(--color-text-primary)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="relative group">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 transition-all duration-300"
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
                      className="w-full pl-9 pr-3.5 py-2.5 text-sm outline-none transition-all duration-300 rounded-lg"
                      style={{
                        background: "var(--color-glass-input-bg)",
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${activeField === "subject" ? "var(--color-accent)" : "var(--color-glass-border)"}`,
                        boxShadow: activeField === "subject" ? "0 0 0 2.5px var(--color-accent-glow)" : "none",
                        color: "var(--color-text-primary)",
                      }}
                    />
                  </div>

                  {/* Message Field */}
                  <div className="relative group">
                    <div className="absolute left-3.5 top-3 z-10 transition-all duration-300"
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
                      className="w-full pl-9 pr-3.5 py-2.5 text-sm outline-none transition-all duration-300 rounded-lg resize-none"
                      style={{
                        background: "var(--color-glass-input-bg)",
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${activeField === "message" ? "var(--color-accent)" : "var(--color-glass-border)"}`,
                        boxShadow: activeField === "message" ? "0 0 0 2.5px var(--color-accent-glow)" : "none",
                        color: "var(--color-text-primary)",
                      }}
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting}
                    className="w-full py-2.5 text-sm font-semibold tracking-wider uppercase transition-all duration-300 rounded-lg flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                    style={{
                      background: "var(--color-accent-gradient)",
                      color: "var(--color-text-light)",
                      opacity: isSubmitting ? 0.6 : 1,
                      boxShadow: !isSubmitting ? "0 3px 14px var(--color-accent-glow)" : "none",
                    }}>
                    {/* Button shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{
                        background: "linear-gradient(90deg, transparent, white, transparent)",
                        transform: "skewX(-20deg)"
                      }} />
                    
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
                        <FaPaperPlane className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        Send Message
                      </>
                    )}
                  </button>

                  <div className="min-h-[46px]">
                    {submitStatus === "success" && (
                      <div className="p-2.5 text-[11px] animate-fade-in-up rounded-lg flex items-center gap-2.5"
                        style={{
                          border: "1px solid var(--color-accent)",
                          background: "var(--color-glass-item-bg)",
                          backdropFilter: "blur(10px)",
                          color: "var(--color-accent)",
                        }}>
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                          style={{ backgroundColor: "var(--color-accent)", color: "var(--color-text-light)" }}>✓</span>
                        Message sent! I respond within 24h.
                      </div>
                    )}
                    {submitStatus === "error" && (
                      <div className="p-2.5 text-[11px] animate-fade-in-up rounded-lg flex items-center gap-2.5"
                        style={{
                          border: "1px solid var(--color-glass-border)",
                          background: "var(--color-glass-item-bg)",
                          backdropFilter: "blur(10px)",
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

          {/* Bottom Info Cards */}
          <StaggerReveal staggerDelay={120}>
          <div className="grid md:grid-cols-3 gap-3 mb-0">
            {[
              { 
                icon: FaClock,
                title: "Response Time", 
                desc: "I aim to respond to all inquiries within 24 hours during business days.",
              },
              { 
                icon: FaHandshake,
                title: "Open To", 
                desc: "Freelance projects, full-time positions, research collaborations, and speaking engagements.",
              },
              { 
                icon: FaCode,
                title: "Preferred Stack", 
                desc: "React, Next.js, Node.js, TypeScript, PostgreSQL, and cloud-native architectures.",
              },
            ].map((item, index) => (
              <div key={item.title} 
                className="group p-3.5 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 relative overflow-hidden"
                style={{
                  background: "var(--color-glass-bg)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid var(--color-glass-border-strong)",
                  boxShadow: "0 2px 10px var(--color-glass-shadow)"
                }}>
                {/* Glass reflection */}
                <div className="absolute -top-8 -right-8 w-14 h-14 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)"
                  }} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0"
                      style={{
                        background: "var(--color-glass-icon-bg)",
                        border: "1px solid var(--color-glass-border)",
                        color: "var(--color-accent)"
                      }}>
                      <item.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-mono opacity-30" style={{ color: "var(--color-text-muted)" }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 className="font-semibold text-xs mb-1.5"
                    style={{ color: "var(--color-text-primary)" }}>
                    {item.title}
                  </h4>
                  <p className="text-[11px] leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          </StaggerReveal>
        </div>
      </ScrollReveal>
    </section>
  );
}