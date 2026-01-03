"use client";
import { useEffect, useRef } from "react";

interface TimelineItem {
  title: string;
  place: string;
  timePeriod: string;
  icon: string;
  description: string;
  year: number;
}

const timeline: TimelineItem[] = [
  // Education & Early Years
  {
    title: 'KCPE',
    place: 'Lily Academy',
    timePeriod: '2013 - 2016',
    year: 2013,
    icon: '✏️',
    description: 'Built strong foundation in mathematics and sciences. Showed early aptitude for logical thinking and problem-solving. Participated in science fairs and coding clubs, developing a passion for technology at a young age.'
  },
  {
    title: 'KCSE - Science & Technology',
    place: 'Thika High School',
    timePeriod: '2017 - 2020',
    year: 2017,
    icon: '📚',
    description: 'Graduated with distinction in STEM subjects. Led school tech team to national competitions, winning 3 innovation awards. Developed early passion for problem-solving through technology and started learning basic programming.'
  },
  {
    title: 'Microsoft Azure Fundamentals',
    place: 'Microsoft',
    timePeriod: '2022',
    year: 2022,
    icon: '🔷',
    description: 'Earned foundational knowledge of cloud services and Microsoft Azure. This certification marked my entry into cloud computing, sparking interest in scalable infrastructure solutions.'
  },
  {
    title: 'CompTIA Security+',
    place: 'CompTIA',
    timePeriod: '2022',
    year: 2022,
    icon: '🔐',
    description: 'Achieved baseline security certification, validating my cybersecurity knowledge. Applied security principles across various environments, setting the stage for professional security work.'
  },
  {
    title: 'Information Security Specialist',
    place: 'ICT Authority of Kenya',
    timePeriod: '2022 - 2024',
    year: 2022,
    icon: '🔒',
    description: 'Secured government digital infrastructure protecting 50,000+ user accounts, reducing security incidents by 75%. Developed 15+ secure web applications with zero critical vulnerabilities. This role transformed my theoretical knowledge into practical security expertise.'
  },
  {
    title: 'Full-Stack Developer',
    place: 'Fiverr & Upwork',
    timePeriod: '2022 - 2024',
    year: 2022,
    icon: '💻',
    description: 'Delivered 50+ projects with 100% client satisfaction. Specialized in building secure, high-performance applications. Learned to manage client expectations while delivering quality work, honing both technical and business skills.'
  },
  {
    title: 'AWS Cloud Practitioner',
    place: 'Amazon Web Services',
    timePeriod: '2023',
    year: 2023,
    icon: '☁️',
    description: 'Certified in AWS cloud services. Implemented scalable solutions reducing operational costs by 30%. This certification expanded my cloud expertise beyond Azure into the AWS ecosystem.'
  },
  {
    title: 'Google Cybersecurity Professional',
    place: 'Google',
    timePeriod: '2023',
    year: 2023,
    icon: '🛡️',
    description: 'Developed comprehensive SIEM strategies processing 1M+ events daily. Created automated incident response playbooks that improved security team efficiency by 45%. Google\'s methodology enhanced my approach to security operations.'
  },
  {
    title: 'Cisco Certified Network Associate',
    place: 'Cisco',
    timePeriod: '2023',
    year: 2023,
    icon: '🌐',
    description: 'Designed and secured enterprise networks serving 500+ devices. Reduced network downtime by 80% through proactive monitoring. This certification deepened my understanding of network infrastructure and security.'
  },
  {
    title: 'BSc Information Technology',
    place: 'Umma University',
    timePeriod: '2021 - Present',
    year: 2021,
    icon: '🎓',
    description: 'Maintaining excellent academic performance while leading Cybersecurity Club of 200+ members. Organized 15+ workshops on ethical hacking and secure coding. Research focus on AI-powered threat detection systems.'
  },
  {
    title: 'IBM Cybersecurity Analyst Professional',
    place: 'IBM',
    timePeriod: '2024',
    year: 2024,
    icon: '🏆',
    description: 'Mastered advanced threat intelligence and security operations. Implemented SOC procedures reducing incident response time by 65%. IBM\'s enterprise approach gave me insights into large-scale security operations.'
  },
  {
    title: 'Co-Founder & Backend Developer',
    place: 'Thee Entity Limited',
    timePeriod: '2025 - Present',
    year: 2025,
    icon: '💼',
    description: 'Established tech startup from ground up. Designed cloud-native solutions reducing client infrastructure costs by 60%. Implemented CI/CD pipelines cutting deployment time from 2 hours to 15 minutes. My journey from developer to entrepreneur began here.'
  },
  {
    title: 'Frontend Developer',
    place: 'Steadfast Academy',
    timePeriod: '2025 - Present',
    year: 2025,
    icon: '🚀',
    description: 'Architected and deployed scalable frontend systems serving 10,000+ users, improving UI performance by 40%. Led migration from legacy frontend to modern React architecture. This role challenged me to think at scale.'
  },
  {
    title: 'Future Vision',
    place: 'Cybersecurity Leadership',
    timePeriod: '2026 & Beyond',
    year: 2026,
    icon: '⭐',
    description: 'Aspiring to lead security initiatives at enterprise scale. Planning to contribute to open-source security tools and mentor the next generation of cybersecurity professionals. Continuous learning and innovation remain my guiding principles.'
  },
];

// Sort timeline by year
const sortedTimeline = [...timeline].sort((a, b) => a.year - b.year);

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full py-20 px-4 relative"
      id="aboutme"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            My Journey
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
            From early education to professional achievements - A timeline of growth, learning, and impact
          </p>
        </div>

        {/* Intro Card - Liquid Glass */}
        <div className="border border-white/20 bg-white/5 backdrop-blur-xl rounded-3xl p-8 mb-12 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 hover:border-white/30">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Brian Kareithi
              </h3>
              <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                <strong className="text-blue-300 font-semibold">My story is one of continuous growth</strong> - from a curious student fascinated by technology to a cybersecurity professional and entrepreneur. Each step in my journey has built upon the last, creating a unique blend of technical expertise and strategic thinking.
              </p>
              <p className="text-lg text-gray-200 leading-relaxed">
                <strong className="text-blue-300 font-semibold">What drives me:</strong> Solving complex problems • Building secure systems • Mentoring others • Continuous learning • Making technology accessible and safe for everyone
              </p>
            </div>
            
            {/* Personal Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="border border-white/20 bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center hover:border-blue-400/60 hover:bg-blue-500/10 transition-all duration-300 hover:scale-105 group">
                <div className="text-3xl font-bold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors">8+</div>
                <div className="text-sm font-semibold text-white uppercase tracking-wide">Years</div>
                <div className="text-xs text-gray-300 mt-1">Tech Journey</div>
              </div>
              <div className="border border-white/20 bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center hover:border-green-400/60 hover:bg-green-500/10 transition-all duration-300 hover:scale-105 group">
                <div className="text-3xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors">6</div>
                <div className="text-sm font-semibold text-white uppercase tracking-wide">Certs</div>
                <div className="text-xs text-gray-300 mt-1">Professional Growth</div>
              </div>
              <div className="border border-white/20 bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center hover:border-purple-400/60 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105 group">
                <div className="text-3xl font-bold text-purple-300 mb-2 group-hover:text-purple-200 transition-colors">3</div>
                <div className="text-sm font-semibold text-white uppercase tracking-wide">Roles</div>
                <div className="text-xs text-gray-300 mt-1">Diverse Experience</div>
              </div>
            </div>
          </div>
        </div>

        {/* Single Timeline - From 2013 to 2026 */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-cyan-400 to-purple-400 rounded-full"></div>
          
          {/* Year Markers */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-full h-full">
            {[2013, 2016, 2019, 2022, 2025, 2026].map((year, index) => (
              <div 
                key={year}
                className="absolute"
                style={{ top: `${(index / 5) * 100}%` }}
              >
                <div className="relative -left-16 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1">
                  <span className="text-sm text-gray-300">{year}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Timeline Items */}
          <div className="space-y-6 md:space-y-8">
            {sortedTimeline.map((item, index) => (
              <div 
                key={index}
                className={`flex flex-col md:flex-row items-start gap-6 relative ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Circle */}
                <div className="absolute left-5 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full border-2 md:border-4 border-black/50 z-10"></div>
                
                {/* Timeline Content Card - Liquid Glass */}
                <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'
                }`}>
                  <div className="border border-white/20 bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 hover:border-white/30 hover:scale-[1.02] group">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                          {item.icon}
                        </div>
                        <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                          <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                            {item.title}
                          </h4>
                          <span className="text-blue-300 font-semibold text-sm mt-1 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30 backdrop-blur-sm inline-block">
                            {item.timePeriod}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-cyan-300 font-medium mb-4 text-sm bg-cyan-500/10 px-3 py-1 rounded-full inline-block border border-cyan-400/30 backdrop-blur-sm">
                      {item.place}
                    </p>
                    
                    <p className="text-gray-200 leading-relaxed mb-6">
                      {item.description}
                    </p>
                    
                    {/* Year Indicator */}
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                        Year: {item.year}
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div 
                            key={i}
                            className={`w-1 h-1 rounded-full ${
                              i <= index % 4 
                                ? 'bg-cyan-400' 
                                : 'bg-gray-600'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Empty space for alternate side on desktop */}
                <div className="hidden md:block md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>


        <div className="mt-20 border border-white/20 bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-blue-500/10">
          <h3 className="text-3xl font-bold text-white mb-6 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Im sure that was a long Scroll dont worry the rest will be brief
          </h3>
          
        </div>
      </div>
    </section>
  );
}