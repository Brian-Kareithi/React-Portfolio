import { useEffect, useState } from "react";
import { FaDownload, FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadCV = () => {
    // Create a link to download the CV from Supabase
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
      {/* Particles Background */}
      <div className="particles-container">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 2}px`,
            height: `${Math.random() * 10 + 2}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 10}s`
          }}></div>
        ))}
      </div>
      
      {/* Bubbles Background */}
      <div className="bubbles-container">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="bubble" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 15 + 10}s`,
            width: `${Math.random() * 30 + 10}px`,
            height: `${Math.random() * 30 + 10}px`,
          }}></div>
        ))}
      </div>

      {/* Floating elements */}
      <div className="floating-element floating-element-1"></div>
      <div className="floating-element floating-element-2"></div>
      <div className="floating-element floating-element-3"></div>

      <div className="contact-container">
        <div className={`contact-header ${isVisible ? 'visible' : ''}`}>
          <h2>Let's Create Something Amazing Together!</h2>
          <p className="contact-subtitle">
            DISCUSS A PROJECT OR JUST WANT TO SAY HI? MY INBOX IS OPEN FOR ALL.
          </p>
          <p className="contact-tagline">
            <strong>"Turning Ideas Into Digital Reality"</strong>
          </p>
        </div>

        <div className="contact-details">
          <div className="contact-info">
            <div className="contact-item">
              <div className="icon-wrapper">
                <FaMapMarkerAlt className="contact-icon" />
              </div>
              <span>Remote · Worldwide</span>
            </div>
            <div className="contact-item">
              <div className="icon-wrapper">
                <div className="opportunity-indicator"></div>
              </div>
              <span>Open for opportunities: YES!</span>
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

            <a 
              href="https://www.instagram.com/kareithi._/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-card"
            >
              <div className="icon-wrapper">
                <FaInstagram className="contact-icon" />
              </div>
              <span>Instagram</span>
            </a>

            <button onClick={handleDownloadCV} className="contact-card cv-download">
              <div className="icon-wrapper">
                <FaDownload className="contact-icon" />
              </div>
              <span>Download CV</span>
            </button>
          </div>
        </div>

        <div className="footer-note">
          <p>Made with  <span className="heart">❤</span>  by Kareithi | © {new Date().getFullYear()}</p>
        </div>
      </div>
    </section>
  );
};