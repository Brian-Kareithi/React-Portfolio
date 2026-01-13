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
      {/* Transparent Glass Navbar */}
      <nav className={`
        fixed z-50 
        transition-all duration-500 ease-out
        ${isScrolled 
          ? 'w-full top-0 left-0 right-0 rounded-none' 
          : 'w-[95%] top-4 left-[2.5%] right-[2.5%] rounded-2xl'
        }
        backdrop-blur-[1px]
        bg-white/[0.02]
        before:absolute before:inset-0 before:rounded-inherit
        before:bg-gradient-to-br before:from-white/[0.05] before:via-transparent before:to-transparent
        before:content-[''] before:-z-10 before:opacity-0 hover:before:opacity-50
        before:transition-opacity before:duration-500
        ${isScrolled ? '' : 'border border-white/30'}
      `}>
        <div className="flex items-center justify-between w-full px-4 sm:px-6 md:px-8 py-3">
          {/* Greeting Text - Left side */}
          <div className="flex items-center space-x-2">
            <span className="text-base md:text-lg">{greeting.icon}</span>
            <span className="font-medium hidden sm:block text-white text-sm md:text-base">
              {greeting.text}
            </span>
          </div>
          
          {/* Desktop Navigation - Right side */}
          <div className="hidden md:flex items-center space-x-1">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`
                  relative px-3 md:px-4 lg:px-5 py-2 rounded-xl font-medium transition-all duration-300
                  overflow-hidden text-sm md:text-base
                  ${activeSection === section.id 
                    ? 'text-white' 
                    : 'text-white/80 hover:text-white'
                  }
                  before:absolute before:inset-0 before:rounded-xl
                  before:bg-white/[0.03]
                  before:content-[''] before:opacity-0 hover:before:opacity-100
                  before:transition-opacity before:duration-300
                `}
                onClick={() => scrollToSection(section.id)}
              >
                <span className="relative z-10">
                  {section.label}
                </span>
                {activeSection === section.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[1px] bg-white/40" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle - Right side */}
          <button 
            className="md:hidden flex flex-col space-y-1.5 p-2 group"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className={`
              w-5 h-[1.5px] bg-white/90 
              rounded-full transition-all duration-300 
              ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}
              group-hover:bg-white
            `}></span>
            <span className={`
              w-5 h-[1.5px] bg-white/90 
              rounded-full transition-all duration-300 
              ${isMobileMenuOpen ? 'opacity-0' : ''}
              group-hover:bg-white
            `}></span>
            <span className={`
              w-5 h-[1.5px] bg-white/90 
              rounded-full transition-all duration-300 
              ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}
              group-hover:bg-white
            `}></span>
          </button>
        </div>
      </nav>

      {/* Responsive Mobile Side Menu - Only visible on mobile */}
      <div className={`
        fixed top-0 right-0 h-full z-50
        transform transition-transform duration-500 ease-in-out
        backdrop-blur-[2px]
        bg-white/[0.03]
        border-l border-white/30
        before:absolute before:inset-0
        before:bg-gradient-to-tr before:from-white/[0.08] before:via-transparent before:to-transparent
        before:content-[''] before:-z-10
        md:hidden
        w-full max-w-xs
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">
                {greeting.icon}
              </span>
              <span className="font-medium text-white text-lg">
                {greeting.text}
              </span>
            </div>
            <button 
              className="text-white/90 text-3xl p-1 hover:bg-white/5 rounded-xl transition-all duration-300
                       hover:text-white hover:scale-110 hover:rotate-90 ml-2"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          {/* Mobile Navigation */}
          <ul className="flex-1 p-5 space-y-3">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  className={`
                    relative w-full text-left px-5 py-4 rounded-xl font-medium 
                    transition-all duration-300 overflow-hidden text-base
                    ${activeSection === section.id 
                      ? 'text-white' 
                      : 'text-white/80 hover:text-white'
                    }
                    before:absolute before:inset-0 before:rounded-xl
                    before:bg-white/[0.03]
                    before:content-[''] before:opacity-0 hover:before:opacity-100
                    before:transition-opacity before:duration-300
                  `}
                  onClick={() => scrollToSection(section.id)}
                >
                  <span className="relative z-10">
                    {section.label}
                  </span>
                  {activeSection === section.id && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[2px] h-3/5 bg-white/40" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Menu Footer */}
          <div className="p-5 pt-0">
            <div className="text-center text-white/60 text-sm">
              Navigate through sections
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden
                    bg-black/[0.15]
                    transition-all duration-500"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
}