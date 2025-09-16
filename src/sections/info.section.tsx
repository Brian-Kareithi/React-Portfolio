import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { IoMailOutline } from 'react-icons/io5';

import { FloatingButton } from '../components/floating-button';
import { GlowLink } from '../components/glow-box-link';

export const InfoSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = ['Software Developer', 'Cybersecurity Enthusiast', 'Gamer'];

  useEffect(() => {
    const handleTyping = () => {
      const current = currentRole % roles.length;
      const fullText = roles[current];

      if (isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(typingSpeed / 1.5);
      } else {
        setDisplayText(fullText.substring(0, displayText.length + 1));
      }

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentRole((currentRole + 1) % roles.length);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole, roles, typingSpeed]);

  return (
    <div className='hero-section'>
      <div className="hero-background"></div>
      
      {/* Animated particles for wow effect */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="particle" style={{
            '--delay': Math.random() * 5 + 's',
            '--size': Math.random() * 6 + 2 + 'px',
            '--distance': Math.random() * 30 + 10 + 'vmax',
            '--duration': Math.random() * 10 + 10 + 's',
            '--opacity': Math.random() * 0.5 + 0.1,
            '--left': Math.random() * 100 + '%',
          } as React.CSSProperties}></div>
        ))}
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <div className="button-group">
            <FloatingButton
              label='About Me'
              className='first'
              href='/#about-me'
            />
            <FloatingButton
              label='Tech'
              className='sec'
              href='/#tech-stack'
            />
          </div>
          
          <p className="greeting">Hi, I am</p>
          <h1 className="name">Brian Kareithi</h1>
          <p className="role-text">
            <span className="static-text">Aspiring </span>
            <span className="animated-text">{displayText}</span>
            <span className="cursor">|</span>
          </p>
        </div>
        
        <div className="hero-image">
          <div className="image-container">
            <img 
              src="./assets/kareithi.jpg" 
              alt="Brian Kareithi" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const next = target.nextElementSibling as HTMLElement;
                if (next) next.style.display = 'block';
              }}
            />
            <div className="image-fallback" style={{ display: "none" }}>
              <span>BK</span>
            </div>
          </div>
          {/* Decorative elements around the image */}
          <div className="floating-element el-1"></div>
          <div className="floating-element el-2"></div>
          <div className="floating-element el-3"></div>
        </div>
      </div>

      <div className='bottom-bar'>
        <GlowLink
          href='https://github.com/Brian-Kareithi'
          color='rgba(255, 255, 255, 0.4)'
          icon={<FaGithub />}
          aria-label='github'
          className="social-icon"
        />
        <GlowLink
          href='https://www.linkedin.com/in/brian-kareithi'
          color='rgb(0, 160, 220, 0.6)'
          icon={<FaLinkedinIn />}
          aria-label='linkedin'
          className="social-icon"
        />
        <GlowLink
          href='mailto:kareithibrian2@gmail.com'
          icon={<IoMailOutline />}
          color=' rgb(18, 122, 209,0.7)'
          aria-label='mail'
          className="social-icon"
        />
      </div>
    </div>
  );
};
