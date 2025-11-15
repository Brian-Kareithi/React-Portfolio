"use client";
import { useEffect, useState } from "react";
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhone, FaSteam } from "react-icons/fa";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = 'https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/Brian%20Kareithi%20CV.pdf';
    link.target = '_blank';
    link.download = 'Brian_Kareithi_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="w-full min-h-screen py-16 px-4 relative" id="contact">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-200 max-w-xl mx-auto">
            Open to new opportunities and collaborations
          </p>
        </div>

        {/* Location & Availability */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center items-center">
          {/* Location */}
          <div className="flex items-center gap-3 p-3 border border-white/30 bg-white/10 backdrop-blur-2xl rounded-xl shadow-lg shadow-blue-500/5">
            <FaMapMarkerAlt className="text-xl text-blue-300" />
            <div className="text-left">
              <p className="text-white text-sm font-semibold">Remote - Worldwide</p>
              <p className="text-gray-300 text-xs">Available globally</p>
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3 p-3 border border-green-400/40 bg-green-500/15 backdrop-blur-2xl rounded-xl shadow-lg shadow-green-500/5">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <div className="text-left">
              <p className="text-white text-sm font-semibold">Available: Yes</p>
              <p className="text-gray-300 text-xs">Open to opportunities</p>
            </div>
          </div>
        </div>

        {/* Contact Cards Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Email */}
          <div className="border border-white/30 bg-white/10 backdrop-blur-2xl rounded-xl p-4 hover:border-blue-400/70 hover:shadow-xl hover:shadow-blue-500/15 transition-all duration-400 hover:scale-102">
            <div className="flex items-center gap-3 mb-3">
              <FaEnvelope className="text-xl text-blue-300" />
              <h3 className="text-base font-bold text-white">EMAIL</h3>
            </div>
            <p className="text-gray-200 text-sm">kareithibrian2@gmail.com</p>
          </div>

          {/* Phone */}
          <div className="border border-white/30 bg-white/10 backdrop-blur-2xl rounded-xl p-4 hover:border-green-400/70 hover:shadow-xl hover:shadow-green-500/15 transition-all duration-400 hover:scale-102">
            <div className="flex items-center gap-3 mb-3">
              <FaPhone className="text-xl text-green-300" />
              <h3 className="text-base font-bold text-white">PHONE</h3>
            </div>
            <p className="text-gray-200 text-sm">+254 718 593 392</p>
          </div>

          {/* GitHub */}
          <a 
            href="https://github.com/Brian-Kareithi"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/30 bg-white/10 backdrop-blur-2xl rounded-xl p-4 hover:border-purple-400/70 hover:shadow-xl hover:shadow-purple-500/15 transition-all duration-400 hover:scale-102 block"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaGithub className="text-xl text-purple-300" />
              <h3 className="text-base font-bold text-white">GITHUB</h3>
            </div>
            <p className="text-gray-200 text-sm">View Projects</p>
          </a>

          {/* LinkedIn */}
          <a 
            href="https://linkedin.com/in/brian-kareithi-04007637b/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/30 bg-white/10 backdrop-blur-2xl rounded-xl p-4 hover:border-blue-400/70 hover:shadow-xl hover:shadow-blue-500/15 transition-all duration-400 hover:scale-102 block"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaLinkedin className="text-xl text-blue-300" />
              <h3 className="text-base font-bold text-white">LINKEDIN</h3>
            </div>
            <p className="text-gray-200 text-sm">Connect</p>
          </a>

          {/* Steam */}
          <a 
            href="https://steamcommunity.com/profiles/76561199676892005/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/30 bg-white/10 backdrop-blur-2xl rounded-xl p-4 hover:border-gray-400/70 hover:shadow-xl hover:shadow-gray-500/15 transition-all duration-400 hover:scale-102 block"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaSteam className="text-xl text-gray-300" />
              <h3 className="text-base font-bold text-white">STEAM</h3>
            </div>
            <p className="text-gray-200 text-sm">Gaming Profile</p>
          </a>

          {/* Resume */}
          <button 
            onClick={handleDownloadCV}
            className="border border-white/30 bg-white/10 backdrop-blur-2xl rounded-xl p-4 hover:border-cyan-400/70 hover:shadow-xl hover:shadow-cyan-500/15 transition-all duration-400 hover:scale-102 w-full text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaDownload className="text-xl text-cyan-300" />
              <h3 className="text-base font-bold text-white">RESUME</h3>
            </div>
            <p className="text-gray-200 text-sm">Download PDF</p>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center border-t border-white/20 pt-6 mt-8">
          <div className="border border-white/30 bg-white/10 backdrop-blur-2xl rounded-xl p-6 shadow-xl shadow-blue-500/5">
            <p className="text-white text-base font-semibold mb-3">
              Brian Kareithi © {new Date().getFullYear()} | Cybersecurity & Full-Stack Developer
            </p>
            <div className="flex justify-center gap-5">
              <a 
                href="https://github.com/Brian-Kareithi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-300 transition-all duration-300 hover:scale-110"
              >
                <FaGithub className="text-xl" />
              </a>
              <a 
                href="https://linkedin.com/in/brian-kareithi-04007637b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-300 transition-all duration-300 hover:scale-110"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a 
                href="https://steamcommunity.com/profiles/76561199676892005/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gray-100 transition-all duration-300 hover:scale-110"
              >
                <FaSteam className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}