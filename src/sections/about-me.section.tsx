import { SectionTitle } from '../components/section-title.component';

const timeline = [
  {
    title: 'Experience',
    items: [
            {
        title: 'Software Developer Intern',
        place: 'Steadfast Academy',
        timePeriod: '2025 - Present',
        icon: '🚀',
        description: (
          <ul>
            <li>Developing scalable backend systems and APIs</li>
            <li>Implementing database solutions and cloud infrastructure</li>
            <li>Working with modern tech stack including Node.js and cloud services</li>
          </ul>
        ),
      },
      {
        title: 'Backend Developer',
        place: 'Thee Entity Limited',
        timePeriod: '2025 - Present',
        icon: '🚀',
        description: (
          <ul>
            <li>Developing scalable backend systems and APIs</li>
            <li>Implementing database solutions and cloud infrastructure</li>
            <li>Working with modern tech stack including Node.js and cloud services</li>
          </ul>
        ),
      },
      {
        title: 'Information Security Intern',
        place: 'ICT Authority of Kenya',
        timePeriod: '2022 - 2024',
        icon: '🔒',
        description: (
          <ul>
            <li>Analyzed and managed government email security systems</li>
            <li>Supported development of 15+ government websites</li>
            <li>Implemented automated SSL/TLS certificate monitoring</li>
            <li>Conducted vulnerability assessments and security audits</li>
          </ul>
        ),
      },
      {
        title: 'Freelance Developer',
        place: 'Fiverr & Upwork',
        timePeriod: '2022 - 2024',
        icon: '💻',
        description: (
          <ul>
            <li>Designed responsive websites for international clients</li>
            <li>Implemented security best practices for web applications</li>
            <li>Optimized website performance and SEO rankings</li>
            <li>Built custom web applications and e-commerce solutions</li>
          </ul>
        ),
      },
    ],
  },
  {
    title: 'Certifications',
    items: [
      {
        title: 'IBM Cybersecurity Analyst Professional Certificate',
        place: 'IBM',
        timePeriod: '2024',
        icon: '🏆',
        description: (
          <ul>
            <li>Cybersecurity compliance and system administration</li>
            <li>Network security and database vulnerabilities</li>
            <li>Incident response and digital forensics</li>
          </ul>
        ),
      },
      {
        title: 'Cisco Certified Network Associate (CCNA)',
        place: 'Cisco Networking Academy',
        timePeriod: '2023',
        icon: '🌐',
        description: (
          <ul>
            <li>Expertise in network fundamentals and security protocols</li>
            <li>Advanced routing and switching configurations</li>
            <li>Network automation and programmability</li>
          </ul>
        ),
      },
      {
        title: 'Google Cybersecurity Professional Certificate',
        place: 'Google',
        timePeriod: '2023',
        icon: '🛡️',
        description: (
          <ul>
            <li>Security operations and monitoring</li>
            <li>Threat detection and analysis</li>
            <li>Security information and event management (SIEM)</li>
          </ul>
        ),
      },
      {
        title: 'CompTIA Security+ (In Progress)',
        place: 'CompTIA',
        timePeriod: '2024',
        icon: '📜',
        description: (
          <ul>
            <li>Studying threats, attacks, and vulnerabilities</li>
            <li>Learning security architecture and technologies</li>
            <li>Preparing for risk management and incident response</li>
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
            <li>Specializing in cybersecurity and network infrastructure</li>
            <li>Current GPA: 2.6/4.0</li>
            <li>President of Cybersecurity Club and Tech Society</li>
            <li>Leading cybersecurity workshops and hackathons</li>
          </ul>
        ),
      },
      {
        title: 'Kenya Certificate of Secondary Education (KCSE)',
        place: 'Thika High School',
        timePeriod: '2017 - 2020',
        icon: '📚',
        description: (
          <ul>
            <li>Focus on Mathematics, Physics, and Computer Studies</li>
            <li>Participated in Science and Technology competitions</li>
            <li>Member of Computer Club and Debate Team</li>
          </ul>
        ),
      },
      {
        title: 'Kenya Certificate of Primary Education (KCPE)',
        place: 'Lily Academy',
        timePeriod: '2008 - 2016',
        icon: '✏️',
        description: (
          <ul>
            <li>Strong foundation in Mathematics and Sciences</li>
            <li>Early interest in technology and computing</li>
            <li>Participated in science fairs and tech exhibitions</li>
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
              <h4>Programming Languages</h4>
              <div className="skill-list">
                <span className="skill-tag">C#</span>
                <span className="skill-tag">C++</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Kotlin</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">Java</span>
                <span className="skill-tag">PHP</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>Frontend Development</h4>
              <div className="skill-list">
                <span className="skill-tag">Next.js</span>
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">Vue.js</span>
                <span className="skill-tag">Angular</span>
                <span className="skill-tag">HTML5 & CSS3</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>Backend Development</h4>
              <div className="skill-list">
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Express</span>
                <span className="skill-tag">Django</span>
                <span className="skill-tag">Flask</span>
                <span className="skill-tag">Spring Boot</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>Database Management</h4>
              <div className="skill-list">
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">PostgreSQL</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">Redis</span>
                <span className="skill-tag">SQLite</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>Cybersecurity</h4>
              <div className="skill-list">
                <span className="skill-tag">Network Security</span>
                <span className="skill-tag">Vulnerability Assessment</span>
                <span className="skill-tag">Penetration Testing</span>
                <span className="skill-tag">Digital Forensics</span>
                <span className="skill-tag">Incident Response</span>
                <span className="skill-tag">Cryptography</span>
                <span className="skill-tag">SIEM Tools</span>
                <span className="skill-tag">Firewall Configuration</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>DevOps & Cloud</h4>
              <div className="skill-list">
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">Proxmox</span>
                <span className="skill-tag">Kubernetes</span>
                <span className="skill-tag">AWS</span>
                <span className="skill-tag">Azure</span>
                <span className="skill-tag">Git & GitHub</span>
                <span className="skill-tag">CI/CD Pipelines</span>
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
      {/* Enhanced animated particles background */}
      <div className="particles-background">
        {[...Array(80)].map((_, i) => (
          <div key={i} className="particle" style={{
            '--delay': Math.random() * 5 + 's',
            '--size': Math.random() * 5 + 3 + 'px',
            '--distance': Math.random() * 25 + 15 + 'vmax',
            '--duration': Math.random() * 15 + 15 + 's',
            '--opacity': Math.random() * 0.6 + 0.2,
            '--left': Math.random() * 100 + '%',
            '--color': `hsl(${Math.random() * 60 + 180}, 85%, 75%)`,
          } as React.CSSProperties}></div>
        ))}
      </div>
      
      {/* Floating elements with vibrant colors */}
      <div className="floating-element el-1" style={{background: "radial-gradient(circle, #FF6B6B 0%, #FF8E53 50%, transparent 70%)"}}></div>
      <div className="floating-element el-2" style={{background: "radial-gradient(circle, #4ECDC4 0%, #556270 50%, transparent 70%)"}}></div>
      <div className="floating-element el-3" style={{background: "radial-gradient(circle, #FFD166 0%, #06D6A0 50%, transparent 70%)"}}></div>
      <div className="floating-element el-4" style={{background: "radial-gradient(circle, #118AB2 0%, #073B4C 50%, transparent 70%)"}}></div>
      
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
                I'm a passionate <strong>Cybersecurity Analyst</strong> and <strong>Full-Stack Developer</strong> with expertise in creating secure, scalable digital solutions. My journey spans from government security systems to cutting-edge web applications.
              </p>
              <p>
                I specialize in <strong>modern web technologies</strong> including React, Node.js, and cloud infrastructure, while maintaining deep knowledge in network security, vulnerability assessment, and incident response protocols.
              </p>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">25+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">8</div>
                <div className="stat-label">Certifications</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">3+</div>
                <div className="stat-label">Years Exp</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Technologies</div>
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