"use client";
import { useEffect, useRef } from "react";

interface TimelineItem {
  title: string;
  place: string;
  timePeriod: string;
  icon: string;
  description: string;
}

interface TimelineSection {
  title: string;
  items: TimelineItem[];
}

const timeline: TimelineSection[] = [
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

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full py-20 px-4 relative"
      id="about-me"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
        </div>

        {/* Intro Card - Liquid Glass */}
        <div className="border border-white/20 bg-white/5 backdrop-blur-xl rounded-3xl p-8 mb-12 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 hover:border-white/30">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Brian Kareithi
              </h3>
              <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                <strong className="text-blue-300 font-semibold">Results-Driven Cybersecurity Analyst & Full-Stack Developer</strong> with proven track record of 
                delivering secure, scalable solutions that drive business growth. Specialized in transforming complex 
                challenges into efficient, high-performance digital systems.
              </p>
              <p className="text-lg text-gray-200 leading-relaxed">
                <strong className="text-blue-300 font-semibold">Expertise:</strong> React/Next.js ecosystems • Node.js microservices • Cloud security architecture • 
                Threat intelligence • API optimization • CI/CD automation • Zero-trust implementation
              </p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="border border-white/20 bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center hover:border-blue-400/60 hover:bg-blue-500/10 transition-all duration-300 hover:scale-105 group">
                <div className="text-3xl font-bold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors">50+</div>
                <div className="text-sm font-semibold text-white uppercase tracking-wide">Projects</div>
                <div className="text-xs text-gray-300 mt-1">100% Success Rate</div>
              </div>
              <div className="border border-white/20 bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center hover:border-green-400/60 hover:bg-green-500/10 transition-all duration-300 hover:scale-105 group">
                <div className="text-3xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors">75%</div>
                <div className="text-sm font-semibold text-white uppercase tracking-wide">Security</div>
                <div className="text-xs text-gray-300 mt-1">Incident Reduction</div>
              </div>
              <div className="border border-white/20 bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center hover:border-purple-400/60 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105 group">
                <div className="text-3xl font-bold text-purple-300 mb-2 group-hover:text-purple-200 transition-colors">3.8</div>
                <div className="text-sm font-semibold text-white uppercase tracking-wide">GPA</div>
                <div className="text-xs text-gray-300 mt-1">Academic Excellence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Sections */}
        <div className="space-y-12">
          {timeline.map((section, sectionIndex) => (
            <div 
              key={sectionIndex} 
              className="border border-white/20 bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 hover:border-white/30"
            >
              <h3 className="text-3xl font-bold text-white mb-8 pb-4 border-b border-white/20 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {section.title}
              </h3>
              
              <div className="space-y-6">
                {section.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="flex flex-col md:flex-row gap-6 p-6 border border-white/20 bg-white/5 backdrop-blur-lg rounded-2xl hover:border-blue-400/60 hover:bg-blue-500/10 transition-all duration-500 hover:scale-[1.02] group"
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                          {item.title}
                        </h4>
                        <span className="text-blue-300 font-semibold text-sm mt-1 md:mt-0 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30 backdrop-blur-sm">
                          {item.timePeriod}
                        </span>
                      </div>
                      <p className="text-cyan-300 font-medium mb-3 text-sm bg-cyan-500/10 px-3 py-1 rounded-full inline-block border border-cyan-400/30 backdrop-blur-sm">
                        {item.place}
                      </p>
                      <p className="text-gray-200 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}