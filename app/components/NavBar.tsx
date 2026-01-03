"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [greeting, setGreeting] = useState({ text: '', icon: '' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'aboutme', label: 'About Me' },
    { id: 'techstack', label: 'Tech Stack' },  
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      let text = '';
      let icon = '';

      if (hour >= 5 && hour < 12) {
        text = 'Good Morning';
        icon = '☀️';
      } else if (hour >= 12 && hour < 17) {
        text = 'Good Afternoon';
        icon = '🌤️';
      } else {
        text = 'Good Evening';
        icon = '🌙';
      }

      setGreeting({ text, icon });
    };

    updateGreeting();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);

      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      );
      
      const current = sectionElements.find((section) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (current) {
        const currentIndex = sectionElements.indexOf(current);
        if (currentIndex !== -1) {
          setActiveSection(sections[currentIndex].id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 50;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Liquid Glass Navbar */}
      <nav className={`
        fixed z-50 
        transition-all duration-500 ease-out
        ${isScrolled 
          ? 'w-full top-0 left-0 right-0 rounded-none' 
          : 'w-[95%] top-4 left-[2.5%] right-[2.5%] rounded-2xl'
        }
        backdrop-blur-[2px]
        bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.04]
        border border-white/20
        shadow-[0_8px_32px_0_rgba(255,255,255,0.07)]
        before:absolute before:inset-0 before:rounded-inherit
        before:bg-gradient-to-br before:from-white/[0.15] before:via-transparent before:to-transparent
        before:content-[''] before:-z-10 before:opacity-0 hover:before:opacity-100
        before:transition-opacity before:duration-500
        after:absolute after:inset-0 after:rounded-inherit
        after:bg-gradient-to-tr after:from-transparent after:via-transparent after:to-white/[0.1]
        after:content-[''] after:-z-10 after:opacity-0 hover:after:opacity-100
        after:transition-opacity after:duration-500
      `}>
        <div className="flex items-center justify-between w-full px-8 py-4">
          {/* Greeting Text - Left side */}
          <div className="flex items-center space-x-2 text-white">
            <span className="text-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{greeting.icon}</span>
            <span className="font-medium hidden sm:block text-white/95 drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]">
              {greeting.text}
            </span>
          </div>
          
          {/* Desktop Navigation - Right side */}
          <div className="hidden md:flex items-center space-x-1">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`
                  relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300
                  overflow-hidden
                  ${activeSection === section.id 
                    ? 'text-white' 
                    : 'text-white/90 hover:text-white'
                  }
                  before:absolute before:inset-0 before:rounded-xl
                  before:bg-gradient-to-r before:from-white/[0.15] before:via-white/[0.08] before:to-white/[0.15]
                  before:content-[''] before:opacity-0 hover:before:opacity-100
                  before:transition-opacity before:duration-300
                  after:absolute after:inset-0 after:rounded-xl
                  after:bg-gradient-to-br after:from-transparent after:via-white/[0.05] after:to-transparent
                  after:content-[''] after:opacity-0 hover:after:opacity-100
                  after:transition-opacity after:duration-300
                `}
                onClick={() => scrollToSection(section.id)}
              >
                <span className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                  {section.label}
                </span>
                {activeSection === section.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle - Right side */}
          <button 
            className="md:hidden flex flex-col space-y-1.5 p-2 group"
            onClick={toggleMobileMenu}
          >
            <span className={`
              w-6 h-[1.5px] bg-gradient-to-r from-white/90 to-white/70 
              rounded-full transition-all duration-300 
              ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}
              group-hover:bg-white
            `}></span>
            <span className={`
              w-6 h-[1.5px] bg-gradient-to-r from-white/90 to-white/70 
              rounded-full transition-all duration-300 
              ${isMobileMenuOpen ? 'opacity-0' : ''}
              group-hover:bg-white
            `}></span>
            <span className={`
              w-6 h-[1.5px] bg-gradient-to-r from-white/90 to-white/70 
              rounded-full transition-all duration-300 
              ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}
              group-hover:bg-white
            `}></span>
          </button>
        </div>
      </nav>

      {/* Liquid Glass Mobile Side Menu */}
      <div className={`
        fixed top-0 right-0 h-full w-80 z-50
        transform transition-transform duration-500 ease-in-out
        backdrop-blur-[3px]
        bg-gradient-to-b from-white/[0.08] via-white/[0.06] to-white/[0.04]
        border-l border-white/15
        shadow-[0_0_60px_rgba(255,255,255,0.1)]
        before:absolute before:inset-0
        before:bg-gradient-to-tr before:from-white/[0.12] before:via-transparent before:to-transparent
        before:content-[''] before:-z-10 before:opacity-50
        after:absolute after:inset-0
        after:bg-gradient-to-bl after:from-transparent after:via-transparent after:to-white/[0.08]
        after:content-[''] after:-z-10 after:opacity-50
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/15">
            <div className="flex items-center space-x-3">
              <span className="text-2xl drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                {greeting.icon}
              </span>
              <span className="font-medium text-lg text-white/95 drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
                {greeting.text}
              </span>
            </div>
            <button 
              className="text-white/90 text-2xl p-2 hover:bg-white/10 rounded-xl transition-all duration-300
                       hover:text-white hover:scale-110 hover:rotate-90"
              onClick={toggleMobileMenu}
            >
              ×
            </button>
          </div>

          {/* Mobile Navigation */}
          <ul className="flex-1 p-6 space-y-3">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  className={`
                    relative w-full text-left px-4 py-4 rounded-xl font-medium 
                    transition-all duration-300 overflow-hidden
                    ${activeSection === section.id 
                      ? 'text-white' 
                      : 'text-white/90 hover:text-white'
                    }
                    before:absolute before:inset-0 before:rounded-xl
                    before:bg-gradient-to-r before:from-white/[0.12] before:via-white/[0.08] before:to-white/[0.12]
                    before:content-[''] before:opacity-0 hover:before:opacity-100
                    before:transition-opacity before:duration-300
                    after:absolute after:inset-0 after:rounded-xl
                    after:bg-gradient-to-br after:from-transparent after:via-white/[0.06] after:to-transparent
                    after:content-[''] after:opacity-0 hover:after:opacity-100
                    after:transition-opacity after:duration-300
                  `}
                  onClick={() => scrollToSection(section.id)}
                >
                  <span className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                    {section.label}
                  </span>
                  {activeSection === section.id && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[2px] h-3/5 
                                  bg-gradient-to-b from-transparent via-white/60 to-transparent" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Liquid Glass Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 
                    backdrop-blur-[1px]
                    bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.02]
                    transition-all duration-500"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
}