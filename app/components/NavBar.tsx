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
      {/* Enhanced Translucent Navbar */}
      <nav className={`
        fixed z-50 
        transition-all duration-500 ease-out
        ${isScrolled 
          ? 'w-full top-0 left-0 right-0 rounded-none border-b border-white/10' 
          : 'w-[95%] top-4 left-[2.5%] right-[2.5%] rounded-2xl'
        }
        backdrop-blur-md bg-white/5 border border-white/10
        shadow-lg hover:shadow-xl
      `}>
        <div className="flex items-center justify-between w-full px-8 py-4">
          {/* Greeting Text - Left side */}
          <div className="flex items-center space-x-2 text-white">
            <span className="text-lg">{greeting.icon}</span>
            <span className="font-medium hidden sm:block">{greeting.text}</span>
          </div>
          
          {/* Desktop Navigation - Right side */}
          <div className="hidden md:flex items-center space-x-1">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`
                  px-5 py-2.5 rounded-lg font-medium transition-all duration-300
                  ${activeSection === section.id 
                    ? 'bg-white/15 text-white font-semibold shadow-md' 
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                  }
                `}
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle - Right side */}
          <button 
            className="md:hidden flex flex-col space-y-1 p-2 text-white"
            onClick={toggleMobileMenu}
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Side Menu */}
      <div className={`
        fixed top-0 right-0 h-full w-80 z-50
        transform transition-transform duration-500 ease-in-out
        backdrop-blur-xl bg-white/10 border-l border-white/10
        shadow-2xl
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center space-x-2 text-white">
              <span className="text-xl">{greeting.icon}</span>
              <span className="font-medium text-lg">{greeting.text}</span>
            </div>
            <button 
              className="text-white text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={toggleMobileMenu}
            >
              ×
            </button>
          </div>

          {/* Mobile Navigation */}
          <ul className="flex-1 p-6 space-y-4">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  className={`
                    w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300
                    ${activeSection === section.id 
                      ? 'bg-white/15 text-white font-semibold shadow-md' 
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                    }
                  `}
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
}