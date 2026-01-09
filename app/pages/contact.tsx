"use client";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    emailjs.init("Qpn7vRC-rFaXswyIE");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await emailjs.send(
        "service_v3qq6rr",
        "template_xzhm8p7",
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: "kareithibrian2@gmail.com",
        },
        "Qpn7vRC-rFaXswyIE"
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-gradient-to-b  to-black flex items-center justify-center py-8" id="contact">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Header - Compact */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-900/20 rounded-full mb-4 border border-blue-700/30">
            <FaEnvelope className="text-xl text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white tracking-tight">
            Get In Touch
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-base">
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </div>

        {/* Main Content - More compact grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Details Card */}
            <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 p-6">
              <h2 className="text-xl font-bold text-white mb-4 pb-3 border-b border-gray-700">
                Contact Details
              </h2>
              
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-800/30">
                    <FaEnvelope className="text-md text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-200 mb-1">Email</h3>
                    <a 
                      href="mailto:kareithibrian2@gmail.com" 
                      className="text-blue-300 hover:text-blue-200 transition-colors text-xs"
                    >
                      kareithibrian2@gmail.com
                    </a>
                    <p className="text-gray-400 text-xs mt-0.5">Replies within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-green-800/30">
                    <FaPhone className="text-md text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-200 mb-1">Phone</h3>
                    <a 
                      href="tel:+254718593392" 
                      className="text-green-300 hover:text-green-200 transition-colors text-xs"
                    >
                      +254 718 593 392
                    </a>
                    <p className="text-gray-400 text-xs mt-0.5">Mon-Fri, 9AM-6PM EAT</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-purple-800/30">
                    <FaMapMarkerAlt className="text-md text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-200 mb-1">Location</h3>
                    <p className="text-gray-300 text-xs">Remote Worldwide</p>
                    <p className="text-gray-400 text-xs mt-0.5">Global collaborations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 p-6">
              <h2 className="text-xl font-bold text-white mb-4 pb-3 border-b border-gray-700">
                Connect
              </h2>
              
              <p className="text-gray-300 mb-4 text-xs leading-relaxed">
                Follow my work and connect with me.
              </p>

              <div className="flex flex-col gap-2">
                <a 
                  href="https://github.com/Brian-Kareithi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 hover:shadow-lg group border border-gray-700"
                >
                  <FaGithub className="text-lg" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">GitHub</div>
                    <div className="text-xs text-gray-400">View my projects</div>
                  </div>
                </a>
                
                <a 
                  href="https://linkedin.com/in/brian-kareithi-04007637b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-800 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 hover:shadow-lg group border border-blue-700"
                >
                  <FaLinkedin className="text-lg" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">LinkedIn</div>
                    <div className="text-xs text-blue-300">Professional profile</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 p-8 h-full">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-2">Send a Message</h2>
                <p className="text-gray-300 text-xs">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 text-xs focus:outline-none focus:border-blue-500 focus:bg-gray-800 focus:ring-1 focus:ring-blue-900/50 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 text-xs focus:outline-none focus:border-blue-500 focus:bg-gray-800 focus:ring-1 focus:ring-blue-900/50 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry"
                    required
                      className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 text-xs focus:outline-none focus:border-blue-500 focus:bg-gray-800 focus:ring-1 focus:ring-blue-900/50 transition-all duration-200"
                    />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, and requirements..."
                    required
                    rows={5}
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 text-xs focus:outline-none focus:border-blue-500 focus:bg-gray-800 focus:ring-1 focus:ring-blue-900/50 transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium text-xs rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg border border-blue-500/30"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending Message...</span>
                    </>
                  ) : submitStatus === "success" ? (
                    <>
                      <FaCheckCircle className="text-md" />
                      <span>Message Sent Successfully!</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-md" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="p-3 bg-green-900/30 border border-green-800 rounded-lg text-green-300 text-xs">
                    <div className="flex items-center gap-1.5">
                      <FaCheckCircle className="text-green-400 text-sm" />
                      <span className="font-medium">Thank you for your message!</span>
                    </div>
                    <p className="mt-1 ml-6 text-green-400">
                      I've received your inquiry and will get back to you within 24 hours.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-300 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-red-900/50 flex items-center justify-center">
                        <span className="text-red-400 font-bold text-xs">!</span>
                      </div>
                      <span className="font-medium">Message failed to send</span>
                    </div>
                    <p className="mt-1 ml-6 text-red-400">
                      Please try again or email me directly.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Footer - Compact */}
        <div className="mt-10 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-xs">
            Brian Kareithi • Cybersecurity & Full-Stack Developer • {new Date().getFullYear()}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Building secure, scalable digital solutions
          </p>
        </div>
      </div>
    </section>
  );
}