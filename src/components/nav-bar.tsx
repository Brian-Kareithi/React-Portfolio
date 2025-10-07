import { useEffect, useState } from 'react';
import '../styles/nav-bar.css';

export function NavBar() {
  const [activeSection, setActiveSection] = useState('info');
  const [isScrolled, setIsScrolled] = useState(false);
  const [greeting, setGreeting] = useState({ text: '', icon: '' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'info', label: 'Home' },
    { id: 'about-me', label: 'About Me' },
    { id: 'tech-stack', label: 'Tech Stack' },
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
      const scrolled = window.scrollY > 50;
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
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
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="nav-container">
          <div className="nav-greeting">
            <span className="greeting-icon">{greeting.icon}</span>
            <span className="greeting-text">{greeting.text}</span>
          </div>
          
          <div className="nav-buttons">
            <ul className="nav-menu">
              {sections.map((section) => (
                <li key={section.id} className="nav-item">
                  <button
                    className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Side Menu */}
      <div className={`mobile-side-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <span className="mobile-greeting">{greeting.icon} {greeting.text}</span>
          <button className="mobile-close-btn" onClick={toggleMobileMenu}>×</button>
        </div>
        <ul className="mobile-nav-menu">
          {sections.map((section) => (
            <li key={section.id} className="mobile-nav-item">
              <button
                className={`mobile-nav-link ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && <div className="mobile-overlay" onClick={toggleMobileMenu}></div>}
    </>
  );
}