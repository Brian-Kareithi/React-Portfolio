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
            <li>
              Analyzing and managing government email security, implementing advanced threat detection systems that reduced phishing incidents by 35%.
            </li>
            <li>
              Supporting development and maintenance of 15+ government websites, including the Deputy President's site, ensuring 99.9% uptime.
            </li>
            <li>
              Implementing automated SSL/TLS certificate monitoring system that eliminated certificate expiration issues.
            </li>
            <li>
              Assisting with national internet budget records across 47 counties, optimizing resource allocation.
            </li>
            <li>
              Leading Umma University's cybersecurity team in national CTF competitions, achieving top 3 rankings consistently.
            </li>
            <li>
              Developed and delivered cybersecurity training modules for 200+ new networking students.
            </li>
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
            <li>
              Designed and developed responsive websites for small businesses using React, Node.js, and MongoDB.
            </li>
            <li>
              Implemented security best practices, reducing client vulnerability to attacks by 60%.
            </li>
            <li>
              Optimized website performance, achieving Google PageSpeed scores of 90+ for all projects.
            </li>
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
            <li>Expertise in network fundamentals, IP connectivity, and security fundamentals</li>
            <li>Hands-on experience with routing protocols including OSPF and EIGRP</li>
            <li>VLAN configuration and troubleshooting in enterprise environments</li>
            <li>Network access control and infrastructure security implementation</li>
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
            <li>Studying threats, attacks, and vulnerabilities</li>
            <li>Learning technologies and tools for security architecture</li>
            <li>Mastering risk management and cryptography concepts</li>
          </ul>
        ),
      },
      {
        title: 'Linux Professional Certification',
        place: 'IBM SkillsBuild',
        timePeriod: '2022',
        icon: '🐧',
        description: (
          <ul>
            <li>System administration and automation with Bash scripting</li>
            <li>Security hardening and intrusion detection</li>
            <li>Network services configuration and troubleshooting</li>
            <li>Containerization with Docker and Kubernetes fundamentals</li>
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
            <li>Specializing in cybersecurity, networking, and software development</li>
            <li>Current GPA: 3.8/4.0</li>
            <li>Relevant coursework: Network Security, Cryptography, Secure Coding Practices, Digital Forensics</li>
            <li>President of Cybersecurity Club, organizing workshops and hackathons</li>
          </ul>
        ),
      },
      {
        title: 'Cisco Networking Academy',
        place: 'Cisco',
        timePeriod: '2022 - 2023',
        icon: '📚',
        description: (
          <ul>
            <li>Completed CCNA curriculum with honors</li>
            <li>Participated in advanced networking simulations</li>
            <li>Mentored fellow students in networking concepts</li>
          </ul>
        ),
      },
      {
        title: 'Kenya Certificate of Secondary Education',
        place: 'Thika High School',
        timePeriod: '2016 - 2020',
        icon: '🏫',
        description: (
          <ul>
            <li>Graduated with an A- mean grade</li>
            <li>Top performer in Mathematics and Physics</li>
            <li>Captain of the school's debate team</li>
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
                <span className="skill-tag">Security Auditing</span>
                <span className="skill-tag">Cryptography</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>Development</h4>
              <div className="skill-list">
                <span className="skill-tag">React</span>
                <span className="skill-tag">Flutter</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Java</span>
                <span className="skill-tag">C#</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">SQL</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>Networking</h4>
              <div className="skill-list">
                <span className="skill-tag">CCNA</span>
                <span className="skill-tag">TCP/IP</span>
                <span className="skill-tag">Routing & Switching</span>
                <span className="skill-tag">Firewalls</span>
                <span className="skill-tag">VPNs</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>Systems</h4>
              <div className="skill-list">
                <span className="skill-tag">Linux Administration</span>
                <span className="skill-tag">Windows Server</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">AWS Fundamentals</span>
                <span className="skill-tag">Virtualization</span>
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
                I'm an aspiring <strong>Cybersecurity Analyst</strong> and <strong>Full-Stack Developer</strong> with a passion for creating secure, efficient digital solutions. With expertise spanning both defensive security measures and development practices, I bridge the gap between creating functional applications and ensuring they remain protected against threats.
              </p>
              <p>
                I work extensively with <strong>web and mobile technologies</strong> including React, Flutter, Node.js, Java, and C#, while maintaining strong foundations in networking principles and Linux administration. My approach combines technical excellence with strategic thinking to solve complex security challenges.
              </p>
              <p>
                When I'm not coding or securing systems, I enjoy mentoring students in cybersecurity, contributing to open-source projects, and staying updated with the latest infosec developments. Outside the tech world, I'm passionate about automotive engineering and football tactics analysis.
              </p>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">3</div>
                <div className="stat-label">Certifications</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">2+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Client Satisfaction</div>
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