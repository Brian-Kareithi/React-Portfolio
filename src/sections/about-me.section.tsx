import { SectionTitle } from '../components/section-title.component';

const timeline = [
  {
    title: 'Experience',
    items: [
      {
        title: 'Information Security Intern',
        place: 'ICT Authority of Kenya',
        timePeriod: '2024 - Present',
        icon: '🔒',
        description: (
          <ul>
            <li>Analyzing and managing government email security</li>
            <li>Supporting development of 15+ government websites</li>
            <li>Implementing automated SSL/TLS certificate monitoring</li>
          </ul>
        ),
      },
      {
        title: 'Freelance Web Developer',
        place: 'Remote',
        timePeriod: '2022 - 2024',
        icon: '💻',
        description: (
          <ul>
            <li>Designed responsive websites for small businesses</li>
            <li>Implemented security best practices</li>
            <li>Optimized website performance</li>
          </ul>
        ),
      },
    ],
  },
  {
    title: 'Certifications',
    items: [
      {
        title: 'Cisco Certified Network Associate (CCNA)',
        place: 'Cisco Networking Academy',
        timePeriod: '2023',
        icon: '🌐',
        description: (
          <ul>
            <li>Expertise in network fundamentals and security</li>
            <li>Hands-on experience with routing protocols</li>
          </ul>
        ),
      },
      {
        title: 'CompTIA Security+ (In Progress)',
        place: 'CompTIA',
        timePeriod: '2024',
        icon: '🛡️',
        description: (
          <ul>
            <li>Studying threats and vulnerabilities</li>
            <li>Learning security architecture technologies</li>
          </ul>
        ),
      },
    ],
  },
  {
    title: 'Education',
    items: [
      {
        title: 'Bachelor of Science in Information Technology',
        place: 'Umma University',
        timePeriod: '2021 - Present',
        icon: '🎓',
        description: (
          <ul>
            <li>Specializing in cybersecurity and networking</li>
            <li>Current GPA: 3.8/4.0</li>
            <li>President of Cybersecurity Club</li>
          </ul>
        ),
      },
    ],
  },
  {
    title: 'Skills',
    items: [
      {
        title: 'Technical Skills',
        place: '',
        timePeriod: '',
        icon: '⚙️',
        description: (
          <div className="skills-grid">
            <div className="skill-category">
              <h4>Cybersecurity</h4>
              <div className="skill-list">
                <span className="skill-tag">Network Security</span>
                <span className="skill-tag">Vulnerability Assessment</span>
                <span className="skill-tag">Incident Response</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>Development</h4>
              <div className="skill-list">
                <span className="skill-tag">React</span>
                <span className="skill-tag">Flutter</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Python</span>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
];

export const AboutMe = () => {
  return (
    <section
      className='about-me container'
      id='about-me'
    >
      {/* Animated particles background */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            '--delay': Math.random() * 5 + 's',
            '--size': Math.random() * 4 + 2 + 'px',
            '--distance': Math.random() * 20 + 10 + 'vmax',
            '--duration': Math.random() * 10 + 10 + 's',
            '--opacity': Math.random() * 0.5 + 0.1,
            '--left': Math.random() * 100 + '%',
          } as React.CSSProperties}></div>
        ))}
      </div>
      
      <div className="about-header">
        <SectionTitle
          title='About'
          subTitle='ME'
        />
      </div>
      <div className="about-content">
        <div className='intro-card'>
          <div className="profile-summary">
            <div className="intro-text">
              <h2>👋 Hey, I'm Brian Kareithi</h2>
              <p>
                I'm an aspiring <strong>Cybersecurity Analyst</strong> and <strong>Full-Stack Developer</strong> with a passion for creating secure, efficient digital solutions.
              </p>
              <p>
                I work extensively with <strong>web and mobile technologies</strong> including React, Flutter, Node.js, and Python, while maintaining strong foundations in networking principles and Linux administration.
              </p>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">3</div>
                <div className="stat-label">Certifications</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">2+</div>
                <div className="stat-label">Years Exp</div>
              </div>
            </div>
          </div>
        </div>
        <div className="timeline-section">
          {timeline.map(({ items, title }, idx) => (
            <div
              className='timeline-card'
              key={idx}
            >
              <h1 className="timeline-title">{title}</h1>
              {items.map(({ title, place, timePeriod, description, icon }, idx) => (
                <div
                  className='timeline-item-container'
                  key={idx}
                >
                  <div className='timeline-item'>
                    <div className="timeline-icon">{icon}</div>
                    <div className="timeline-content">
                      <p className='designation'>{title}</p>
                      <p className='place'>
                        {place} {timePeriod && '|'} {timePeriod}
                      </p>
                      <div className='timeline-description'>{description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};