"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import DynamicBackground from "../components/DynamicBackground";
import Navbar from "../components/NavBar";


const roles = ["Fullstack Developer", "Grey Hat", "Cybersecurity Enthusiast", "Gamer"];

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
    <main className="relative flex flex-col items-center justify-start min-h-screen overflow-x-hidden scroll-smooth">
      <DynamicBackground />
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section
        id="home"
        className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center min-h-screen pt-32"
      >
        {/* Text Container */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <p className="text-white text-lg font-light mb-2 drop-shadow-lg">Hi, I am</p>
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-2xl">
            Brian Kareithi
          </h1>
          <p className="text-xl lg:text-2xl text-white font-medium min-h-[32px] drop-shadow-lg">
            <span>{displayText}</span>
            <span className="text-blue-300 ml-1 drop-shadow-lg">|</span>
          </p>
        </div>

        {/* Image Container */}
        <div className="flex justify-center lg:justify-end lg:w-1/2 mt-12 lg:mt-0">
          <div className="relative w-64 h-64 lg:w-80 lg:h-80">
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
            <div className="hidden w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-full items-center justify-center text-white text-4xl font-bold border-4 border-white/30 shadow-2xl">
              <span>BK</span>
            </div>
          </div>
        </div>

        {/* ===== SOCIAL ICONS - Only in Home Section ===== */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-6">
          <a
            href="https://github.com/Brian-Kareithi"
            className="bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/20 hover:border-white/40 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={24} className="text-white drop-shadow" />
          </a>
          <a
            href="https://www.linkedin.com/in/brian-kareithi-04007637b/"
            className="bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/20 hover:border-white/40 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn size={24} className="text-white drop-shadow" />
          </a>
          <a
            href="mailto:kareithibrian2@gmail.com"
            className="bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/20 hover:border-white/40 transition-all shadow-lg hover:shadow-xl hover:shadow-red-500/20"
          >
            <IoMailOutline size={24} className="text-white drop-shadow" />
          </a>
        </div>
      </section>

 

    </main>
  );
}