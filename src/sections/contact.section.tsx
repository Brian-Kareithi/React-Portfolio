import { useEffect, useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className={`contact-header ${isVisible ? 'visible' : ''}`}>
          <h2>Reach Out to me!</h2>
          <p className="contact-subtitle">
            DISCUSS A PROJECT OR JUST WANT TO SAY HI? MY INBOX IS OPEN FOR ALL.
          </p>
          <p className="contact-tagline">
            <strong>"Kareithi"</strong>
          </p>
        </div>

        <div className="contact-details">
          <div className="contact-info">
            <div className="contact-item">
              <div className="icon-wrapper">
                <FaMapMarkerAlt className="contact-icon" />
              </div>
              <span>Remote</span>
            </div>
            <div className="contact-item">
              <div className="icon-wrapper">
                <div className="opportunity-indicator"></div>
              </div>
              <span>Open for opportunities: No</span>
            </div>
          </div>

          <div className="divider"></div>

          <div className="contact-grid">
            <a href="mailto:kareithibrian2@gmail.com" className="contact-card">
              <div className="icon-wrapper">
                <FaEnvelope className="contact-icon" />
              </div>
              <span>kareithibrian2@gmail.com</span>
            </a>

            <a href="tel:+254718593392" className="contact-card">
              <div className="icon-wrapper">
                <FaPhone className="contact-icon" />
              </div>
              <span>+254 718 593 392</span>
            </a>

            <a 
              href="https://github.com/Brian-Kareithi" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-card"
            >
              <div className="icon-wrapper">
                <FaGithub className="contact-icon" />
              </div>
              <span>GitHub</span>
            </a>

            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-card"
            >
              <div className="icon-wrapper">
                <FaLinkedin className="contact-icon" />
              </div>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="footer-note">
          <p>Made with <span className="heart">❤</span> by Kareithi</p>
        </div>
      </div>
    </section>
  );
};