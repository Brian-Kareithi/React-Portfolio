import { Background } from '../components/background';
import { SectionTitle } from '../components/section-title.component';

const timeline = [
  {
    title: 'Professional Journey',
    items: [
      {
        title: 'Software Developer Intern',
        place: 'Steadfast Academy',
        timePeriod: '2025 - Present',
        icon: '🚀',
        description: 'Architected and deployed scalable backend systems serving 10,000+ users, improving API response times by 40% through optimized database queries and caching strategies. Led migration from monolithic to microservices architecture.'
      },
      {
        title: 'Co-Founder & Backend Developer',
        place: 'Thee Entity Limited',
        timePeriod: '2025 - Present',
        icon: '💼',
        description: 'Established tech startup from ground up, designing cloud-native solutions that reduced client infrastructure costs by 60%. Implemented CI/CD pipelines cutting deployment time from 2 hours to 15 minutes.'
      },
      {
        title: 'Information Security Specialist',
        place: 'ICT Authority of Kenya',
        timePeriod: '2022 - 2024',
        icon: '🔒',
        description: 'Secured government digital infrastructure protecting 50,000+ user accounts, reducing security incidents by 75%. Developed 15+ secure web applications with zero critical vulnerabilities post-deployment. Implemented automated threat detection systems.'
      },
      {
        title: 'Full-Stack Developer',
        place: 'Fiverr & Upwork',
        timePeriod: '2022 - 2024',
        icon: '💻',
        description: 'Delivered 50+ projects with 100% client satisfaction rate. Specialized in building secure, high-performance applications that consistently exceeded client expectations and project deadlines by 15%.'
      },
    ],
  },
  {
    title: 'Certifications & Expertise',
    items: [
      {
        title: 'IBM Cybersecurity Analyst Professional',
        place: 'IBM',
        timePeriod: '2024',
        icon: '🏆',
        description: 'Mastered advanced threat intelligence and security operations. Implemented SOC procedures that reduced incident response time by 65%. Expertise in NIST framework compliance and risk assessment methodologies.'
      },
      {
        title: 'Cisco Certified Network Associate',
        place: 'Cisco',
        timePeriod: '2023',
        icon: '🌐',
        description: 'Designed and secured enterprise networks serving 500+ devices. Reduced network downtime by 80% through proactive monitoring and automated failover systems. Implemented zero-trust architecture principles.'
      },
      {
        title: 'Google Cybersecurity Professional',
        place: 'Google',
        timePeriod: '2023',
        icon: '🛡️',
        description: 'Developed comprehensive SIEM strategies processing 1M+ events daily. Created automated incident response playbooks that improved security team efficiency by 45%. Specialized in cloud security hardening.'
      },
    ],
  },
  {
    title: 'Education & Leadership',
    items: [
      {
        title: 'BSc Information Technology',
        place: 'Umma University',
        timePeriod: '2021 - Present',
        icon: '🎓',
        description: 'Maintained 3.8 GPA while leading Cybersecurity Club of 200+ members. Organized 15+ workshops on ethical hacking and secure coding practices. Research focus on AI-powered threat detection systems.'
      },
      {
        title: 'KCSE - Science & Technology',
        place: 'Thika High School',
        timePeriod: '2017 - 2020',
        icon: '📚',
        description: 'Graduated with distinction in STEM subjects. Led school tech team to national competitions, winning 3 innovation awards. Developed early passion for problem-solving through technology.'
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
        <div className='intro-card liquid-glass-card'>
          <div className="profile-summary">
            <div className="intro-text">
              <h2>Brian Kareithi</h2>
              <p>
                <strong>Results-Driven Cybersecurity Analyst & Full-Stack Developer</strong> with proven track record of 
                delivering secure, scalable solutions that drive business growth. Specialized in transforming complex 
                challenges into efficient, high-performance digital systems.
              </p>
              <p>
                <strong>Expertise:</strong> React/Next.js ecosystems • Node.js microservices • Cloud security architecture • 
                Threat intelligence • API optimization • CI/CD automation • Zero-trust implementation
              </p>
            </div>
            <div className="stats-grid">
              <div className="stat-item liquid-glass-stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Projects Delivered</div>
                <div className="stat-subtitle">100% Success Rate</div>
              </div>
              <div className="stat-item liquid-glass-stat">
                <div className="stat-number">75%</div>
                <div className="stat-label">Security Improvement</div>
                <div className="stat-subtitle">Incident Reduction</div>
              </div>
              <div className="stat-item liquid-glass-stat">
                <div className="stat-number">3.8</div>
                <div className="stat-label">GPA</div>
                <div className="stat-subtitle">Academic Excellence</div>
              </div>
            </div>
          </div>
          <div className="liquid-shine"></div>
        </div>
        
        <div className="timeline-section">
          {timeline.map(({ items, title }, idx) => (
            <div className='timeline-card liquid-glass-card' key={idx}>
              <h3 className="timeline-title">{title}</h3>
              <div className="timeline-items">
                {items.map(({ title, place, timePeriod, description, icon }, idx) => (
                  <div className='timeline-item-container' key={idx}>
                    <div className='timeline-item'>
                      <div className="timeline-icon liquid-glass-icon">{icon}</div>
                      <div className="timeline-content">
                        <h4 className='designation'>{title}</h4>
                        <p className='place'>{place} | {timePeriod}</p>
                        <p className='timeline-description'>{description}</p>
                      </div>
                      <div className="timeline-connector"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="liquid-shine"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};