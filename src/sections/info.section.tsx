import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { IoMailOutline } from 'react-icons/io5';
import { Background } from '../components/background';
import { GlowLink } from '../components/glow-box-link';

// Roles outside component to prevent re-renders
const roles = ['Fullstack Developer', 'Grey Hat', 'Cybersecurity Enthusiast', 'Gamer'];

export const InfoSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = roles[currentRole % roles.length];

    const handleTyping = () => {
      setDisplayText(prev => {
        if (isDeleting) return prev.substring(0, prev.length - 1);
        return fullText.substring(0, prev.length + 1);
      });

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentRole(prev => (prev + 1) % roles.length);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 75 : 150);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole]);

  return (
    <div className="hero-section" id="info">
      <Background />

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-text">
          <p className="greeting">Hi, I am</p>
          <h1 className="name">Brian Kareithi</h1>
          <p className="role-text">
            <span className="animated-text">{displayText}</span>
            <span className="cursor">|</span>
          </p>
        </div>

        {/* Hero Image */}
        <div className="hero-image">
          <div className="image-container">
            <img
              src="https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/kareithi.jpg"
              alt="Brian Kareithi"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const next = target.nextElementSibling as HTMLElement;
                if (next) next.style.display = 'flex';
              }}
            />
            <div className="image-fallback" style={{ display: "none" }}>
              <span>BK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Social Icons */}
      <div className="bottom-bar">
        <div className="social-icons-wrapper">
          <GlowLink
            href="https://github.com/Brian-Kareithi"
            color="#A7EBF2"
            icon={<FaGithub size={28} />}
            aria-label="github"
            className="social-icon liquid-glass"
          />
          <GlowLink
            href="https://www.linkedin.com/in/brian-kareithi-04007637b/"
            color="#54ACBF"
            icon={<FaLinkedinIn size={28} />}
            aria-label="linkedin"
            className="social-icon liquid-glass"
          />
          <GlowLink
            href="mailto:kareithibrian2@gmail.com"
            icon={<IoMailOutline size={30} />}
            color="#26658C"
            aria-label="mail"
            className="social-icon liquid-glass"
          />
        </div>
      </div>
    </div>
  );
};