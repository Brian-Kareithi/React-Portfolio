import { useEffect, useState } from "react";
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Background } from '../components/background';

export const Contact = () => {
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
    <section id="contact" className="contact-section">
      <Background />
      
      <div className="contact-container">
        <div className={`contact-header ${isVisible ? 'visible' : ''}`}>
          <h2>Let's Connect</h2>
          <p className="contact-subtitle">
            Open to new opportunities and collaborations
          </p>
        </div>

        <div className="contact-content-wrapper">
          <div className="contact-details liquid-glass-panel">
            <div className="contact-info">
              <div className="contact-item liquid-glass-card">
                <div className="icon-wrapper liquid-glass-icon">
                  <FaMapMarkerAlt className="contact-icon" />
                </div>
                <span>Remote · Worldwide</span>
              </div>
              <div className="contact-item liquid-glass-card">
                <div className="icon-wrapper liquid-glass-icon">
                  <div className="opportunity-indicator"></div>
                </div>
                <span>Available For Opportunities: <strong>Yes</strong></span>
              </div>
            </div>

            <div className="liquid-divider"></div>

            <div className="contact-grid">
              <a href="mailto:kareithibrian2@gmail.com" className="contact-card liquid-glass-card email-card">
                <div className="icon-wrapper liquid-glass-icon">
                  <FaEnvelope className="contact-icon" />
                </div>
                <div className="contact-content">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">kareithibrian2@gmail.com</span>
                </div>
              </a>

              <a href="tel:+254718593392" className="contact-card liquid-glass-card phone-card">
                <div className="icon-wrapper liquid-glass-icon">
                  <FaPhone className="contact-icon" />
                </div>
                <div className="contact-content">
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">+254 718 593 392</span>
                </div>
              </a>

              <a 
                href="https://github.com/Brian-Kareithi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-card liquid-glass-card github-card"
              >
                <div className="icon-wrapper liquid-glass-icon">
                  <FaGithub className="contact-icon" />
                </div>
                <div className="contact-content">
                  <span className="contact-label">GitHub</span>
                  <span className="contact-value">View Projects</span>
                </div>
              </a>

              <a 
                href="https://linkedin.com/in/brian-kareithi-04007637b/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-card liquid-glass-card linkedin-card"
              >
                <div className="icon-wrapper liquid-glass-icon">
                  <FaLinkedin className="contact-icon" />
                </div>
                <div className="contact-content">
                  <span className="contact-label">LinkedIn</span>
                  <span className="contact-value">Connect</span>
                </div>
              </a>

              <button onClick={handleDownloadCV} className="contact-card liquid-glass-card cv-download">
                <div className="icon-wrapper liquid-glass-icon">
                  <FaDownload className="contact-icon" />
                </div>
                <div className="contact-content">
                  <span className="contact-label">Resume</span>
                  <span className="contact-value">Download PDF</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="footer-note liquid-glass-footer">
          <p>Brian Kareithi © {new Date().getFullYear()} | Cybersecurity & Full-Stack Developer</p>
        </div>
      </div>
    </section>
  );
};