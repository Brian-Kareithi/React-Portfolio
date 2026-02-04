"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import DynamicBackground from "../components/DynamicBackground";
import Navbar from "../components/NavBar";

const roles = ["Fullstack Developer", "Grey Hat", "Cybersecurity and Robotics Enthusiast", "Gamer"];

export default function HomePage() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = roles[currentRole % roles.length];

    const handleTyping = () => {
      setDisplayText((prev) => {
        if (isDeleting) return prev.substring(0, prev.length - 1);
        return fullText.substring(0, prev.length + 1);
      });

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 75 : 150);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section id="HomePage" className="min-h-screen flex items-end justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-black to-blue-1000">
      
      <DynamicBackground />
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section
        id="home"
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-between min-h-screen pt-20 pb-8 lg:pt-32 lg:pb-12"
      >
        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-8 lg:gap-12 flex-1">
          {/* Text Container */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1 mt-8 lg:mt-0">
            <p className="text-white text-base sm:text-lg font-light mb-2 drop-shadow-lg">Hi, I am</p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-2xl leading-tight">
              Brian Kareithi
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white font-medium min-h-[28px] sm:min-h-[32px] drop-shadow-lg">
              <span>{displayText}</span>
              <span className="text-blue-300 ml-1 drop-shadow-lg">|</span>
            </p>
          </div>

          {/* Image Container */}
          <div className="flex-1 flex justify-center order-1 lg:order-2">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
              <img
                src="https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/kareithi.jpg"
                alt="Brian Kareithi"
                className="w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-300"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const next = target.nextElementSibling as HTMLElement;
                  if (next) next.style.display = "flex";
                }}
              />
              <div className="hidden w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-full items-center justify-center text-white text-2xl sm:text-4xl font-bold border-4 border-white/30 shadow-2xl">
                <span>BK</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== SOCIAL ICONS - At Bottom of Home Section ===== */}
        <div className="flex justify-center gap-4 sm:gap-6 mt-8 lg:mt-12">
          <a
            href="https://github.com/Brian-Kareithi"
            className="bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-full border border-white/20 hover:border-white/40 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={20} className="sm:w-6 sm:h-6 text-white drop-shadow" />
          </a>
          <a
            href="https://www.linkedin.com/in/brian-kareithi-04007637b/"
            className="bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-full border border-white/20 hover:border-white/40 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn size={20} className="sm:w-6 sm:h-6 text-white drop-shadow" />
          </a>
          <a
            href="mailto:kareithibrian2@gmail.com"
            className="bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-full border border-white/20 hover:border-white/40 transition-all shadow-lg hover:shadow-xl hover:shadow-red-500/20"
          >
            <IoMailOutline size={20} className="sm:w-6 sm:h-6 text-white drop-shadow" />
          </a>
        </div>
      </section>
    </section>
  );
}