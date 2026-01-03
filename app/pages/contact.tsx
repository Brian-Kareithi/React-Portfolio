"use client";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

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
    <section className="min-h-screen w-full bg-white flex items-center justify-center" id="contact">
      <div className="max-w-4xl mx-auto w-full py-16 px-4">
        {/* Header - Moved down with pt-16 and centered */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Contact Me
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-base">
            I'm always happy to discuss opportunities, answer questions, or explore new ideas.
          </p>
        </div>

        {/* Main content container */}
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            {/* Left Column - Contact Information */}
            <div className="space-y-6">
              {/* Contact Information Section */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-6 text-sm">
                  Reach me directly via email or phone for questions or collaborations.
                </p>
                <div className="w-full h-px bg-gray-200 mb-6"></div>

                {/* Contact Details */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="text-lg text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-800 mb-1">Email</h3>
                      <p className="text-gray-700 text-sm">kareithibrian2@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-50 border border-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaPhone className="text-lg text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-800 mb-1">Phone</h3>
                      <p className="text-gray-700 text-sm">+254 718 593 392</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-50 border border-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaMapMarkerAlt className="text-lg text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-800 mb-1">Location</h3>
                      <p className="text-gray-700 text-sm">Remote - Worldwide</p>
                      <p className="text-gray-500 text-xs">Available globally</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gray-200 my-6"></div>

              {/* Connect with Me Section */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Connect with Me
                </h2>
                <p className="text-gray-600 mb-4 text-sm">
                  Stay connected on social media for collaborations or updates.
                </p>

                <div className="flex gap-3">
                  <a 
                    href="https://github.com/Brian-Kareithi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-800 transition-all duration-200 text-sm"
                  >
                    <FaGithub className="text-base" />
                    <span className="font-medium">GitHub</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/brian-kareithi-04007637b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 border border-blue-600 rounded-lg text-white transition-all duration-200 text-sm"
                  >
                    <FaLinkedin className="text-base" />
                    <span className="font-medium">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <div className="border border-gray-200 bg-gray-50 rounded-lg p-6 h-full">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-0 transition-all duration-200"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-0 transition-all duration-200"
                    />
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter subject"
                      required
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-0 transition-all duration-200"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message"
                      required
                      rows={4}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-0 transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed border border-blue-600 rounded text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : submitStatus === "success" ? (
                      <>
                        <FaCheckCircle className="text-base" />
                        Message Sent!
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div className="p-2 bg-green-50 border border-green-200 rounded text-green-700 text-xs text-center">
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-2 bg-red-50 border border-red-200 rounded text-red-700 text-xs text-center">
                      Failed to send message. Please try again or email me directly.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-xs">
            Brian Kareithi © {new Date().getFullYear()} | Cybersecurity Professional & Full-Stack Developer
          </p>
        </div>
      </div>
    </section>
  );
}