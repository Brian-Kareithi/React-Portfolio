import { Background } from '../components/background';
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
        description: 'Developing scalable backend systems and APIs with modern tech stack including Node.js and cloud services.'
      },
      {
        title: 'Backend Developer',
        place: 'Thee Entity Limited',
        timePeriod: '2025 - Present',
        icon: '🚀',
        description: 'Co-founded company and developing scalable backend systems with cloud infrastructure solutions.'
      },
      {
        title: 'Information Security Intern',
        place: 'ICT Authority of Kenya',
        timePeriod: '2022 - 2024',
        icon: '🔒',
        description: 'Managed government email security, developed 15+ websites, and conducted vulnerability assessments.'
      },
      {
        title: 'Freelance Developer',
        place: 'Fiverr & Upwork',
        timePeriod: '2022 - 2024',
        icon: '💻',
        description: 'Built responsive websites and web applications with security best practices for international clients.'
      },
    ],
  },
  {
    title: 'Certifications',
    items: [
      {
        title: 'IBM Cybersecurity Analyst',
        place: 'IBM',
        timePeriod: '2024',
        icon: '🏆',
        description: 'Cybersecurity compliance, network security, incident response, and digital forensics.'
      },
      {
        title: 'Cisco Certified Network Associate',
        place: 'Cisco',
        timePeriod: '2023',
        icon: '🌐',
        description: 'Network fundamentals, security protocols, routing configurations, and automation.'
      },
      {
        title: 'Google Cybersecurity',
        place: 'Google',
        timePeriod: '2023',
        icon: '🛡️',
        description: 'Security operations, threat detection, and security information event management.'
      },
    ],
  },
  {
    title: 'Education',
    items: [
      {
        title: 'BSc Information Technology',
        place: 'Umma University',
        timePeriod: '2021 - Present',
        icon: '🎓',
        description: 'Specializing in cybersecurity and network infrastructure. President of Cybersecurity Club.'
      },
      {
        title: 'KCSE',
        place: 'Thika High School',
        timePeriod: '2017 - 2020',
        icon: '📚',
        description: 'Focus on Mathematics, Physics, and Computer Studies. Science and Technology competitions.'
      },
    ],
  },
];

export const AboutMe = () => {
  return (
    <section className='about-me container' id='about-me'>
      <Background />
      
      <div className="about-header">
        <SectionTitle title='About' subTitle='ME' />
      </div>
      
      <div className="about-content">
        <div className='intro-card'>
          <div className="profile-summary">
            <div className="intro-text">
              <h2>Brian Kareithi</h2>
              <p>
                Passionate <strong>Cybersecurity Analyst</strong> and <strong>Full-Stack Developer</strong> creating secure, 
                scalable digital solutions. Expertise spans from government security systems to modern web applications.
              </p>
              <p>
                Specializing in <strong>React, Node.js, and cloud infrastructure</strong> with deep knowledge in 
                network security, vulnerability assessment, and incident response protocols.
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
            </div>
          </div>
        </div>
        
        <div className="timeline-section">
          {timeline.map(({ items, title }, idx) => (
            <div className='timeline-card' key={idx}>
              <h3 className="timeline-title">{title}</h3>
              {items.map(({ title, place, timePeriod, description, icon }, idx) => (
                <div className='timeline-item-container' key={idx}>
                  <div className='timeline-item'>
                    <div className="timeline-icon">{icon}</div>
                    <div className="timeline-content">
                      <h4 className='designation'>{title}</h4>
                      <p className='place'>{place} | {timePeriod}</p>
                      <p className='timeline-description'>{description}</p>
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