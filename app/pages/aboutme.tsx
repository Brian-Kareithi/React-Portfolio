"use client";
import { useEffect, useRef } from "react";

interface TimelineItem {
  title: string;
  institution: string;
  period: string;
  year: number;
  description: string;
  category: 'education' | 'certification' | 'professional' | 'entrepreneurial';
  significance?: string;
  metrics?: string[];
}

const timeline: TimelineItem[] = [
  // Education
  {
    title: 'KCPE Certificate',
    institution: 'Lily Academy',
    period: '2013 - 2016',
    year: 2013,
    category: 'education',
    description: 'Primary education completion with distinction in mathematics and sciences.',
    significance: 'Foundation for analytical thinking',
    metrics: ['Distinction in STEM subjects', 'Early exposure to technology']
  },
  {
    title: 'KCSE - Science & Technology',
    institution: 'Thika High School',
    period: '2017 - 2020',
    year: 2017,
    category: 'education',
    description: 'Secondary education with focus on sciences and technology.',
    significance: 'Technical foundation development',
    metrics: ['STEM specialization', 'Science competitions participation']
  },
  {
    title: 'Bachelor of Science in Information Technology',
    institution: 'Umma University',
    period: '2021 - Present',
    year: 2021,
    category: 'education',
    description: 'Undergraduate degree in Information Technology with cybersecurity focus.',
    significance: 'Formal academic foundation in IT',
    metrics: ['Cybersecurity Club Leadership', 'AI/ML research focus']
  },

  // Certifications
  {
    title: 'Microsoft Azure Fundamentals',
    institution: 'Microsoft',
    period: '2022',
    year: 2022,
    category: 'certification',
    description: 'Foundational cloud services certification validating understanding of cloud concepts and Azure services.',
    significance: 'Entry into cloud computing',
    metrics: ['Cloud concepts mastery', 'Azure service fundamentals']
  },
  {
    title: 'CompTIA Security+',
    institution: 'CompTIA',
    period: '2022',
    year: 2022,
    category: 'certification',
    description: 'Industry-recognized certification validating baseline cybersecurity skills across multiple environments.',
    significance: 'Cybersecurity foundation establishment',
    metrics: ['Security principles application', 'Risk management fundamentals']
  },
  {
    title: 'AWS Cloud Practitioner',
    institution: 'Amazon Web Services',
    period: '2023',
    year: 2023,
    category: 'certification',
    description: 'Cloud services certification demonstrating AWS cloud concepts and architectural best practices.',
    significance: 'Multi-cloud expertise expansion',
    metrics: ['AWS architecture understanding', 'Cost optimization strategies']
  },
  {
    title: 'Google Cybersecurity Professional Certificate',
    institution: 'Google',
    period: '2023',
    year: 2023,
    category: 'certification',
    description: 'Comprehensive cybersecurity certification covering threat detection, incident response, and security operations.',
    significance: 'Enterprise security methodology',
    metrics: ['SIEM strategy development', 'Incident response automation']
  },
  {
    title: 'Cisco Certified Network Associate',
    institution: 'Cisco',
    period: '2023',
    year: 2023,
    category: 'certification',
    description: 'Networking certification validating skills in network fundamentals, access, IP connectivity, and security.',
    significance: 'Network infrastructure expertise',
    metrics: ['Enterprise network design', 'Network security implementation']
  },
  {
    title: 'IBM Cybersecurity Analyst Professional',
    institution: 'IBM',
    period: '2024',
    year: 2024,
    category: 'certification',
    description: 'Advanced certification in threat intelligence, security operations, and enterprise security management.',
    significance: 'Enterprise security operations',
    metrics: ['Threat intelligence mastery', 'SOC procedure implementation']
  },

  // Professional Experience
  {
    title: 'Information Security Specialist',
    institution: 'ICT Authority of Kenya',
    period: '2022 - 2024',
    year: 2022,
    category: 'professional',
    description: 'Secured government digital infrastructure, developed secure applications, and implemented security frameworks.',
    significance: 'Public sector security impact',
    metrics: ['50,000+ user accounts protected', '75% security incident reduction', 'Zero critical vulnerabilities']
  },
  {
    title: 'Freelance Full-Stack Developer',
    institution: 'Fiverr & Upwork',
    period: '2022 - 2024',
    year: 2022,
    category: 'professional',
    description: 'Delivered secure, high-performance web applications for diverse clients across multiple industries.',
    significance: 'Client-driven solution development',
    metrics: ['50+ projects delivered', '100% client satisfaction rate', 'Full-stack architecture expertise']
  },
  {
    title: 'Frontend Developer',
    institution: 'Steadfast Academy',
    period: '2025 - Present',
    year: 2025,
    category: 'professional',
    description: 'Architected and deployed scalable frontend systems with focus on performance optimization and user experience.',
    significance: 'Enterprise-scale frontend development',
    metrics: ['10,000+ users served', '40% UI performance improvement', 'React architecture migration']
  },

  // Entrepreneurial
  {
    title: 'Co-Founder & Backend Developer',
    institution: 'Thee Entity Limited',
    period: '2025 - Present',
    year: 2025,
    category: 'entrepreneurial',
    description: 'Established technology startup, designed cloud-native solutions, and implemented DevOps practices.',
    significance: 'Entrepreneurial venture initiation',
    metrics: ['60% infrastructure cost reduction', '15-minute deployment time', 'Cloud-native architecture']
  },

  // Vision
  {
    title: 'Cybersecurity Leadership & Innovation',
    institution: 'Future Focus',
    period: '2026 & Beyond',
    year: 2026,
    category: 'professional',
    description: 'Aspiring to lead enterprise security initiatives, contribute to open-source security tools, and mentor emerging professionals.',
    significance: 'Strategic career progression',
    metrics: ['Enterprise security leadership', 'Open-source contribution', 'Professional mentorship']
  },
];

// Sort timeline by year
const sortedTimeline = [...timeline].sort((a, b) => a.year - b.year);

// Category configuration
const categoryConfig = {
  education: {
    label: 'Education',
    color: 'border-blue-400/40 bg-blue-400/10',
    textColor: 'text-blue-400',
    icon: '🎓'
  },
  certification: {
    label: 'Certification',
    color: 'border-green-400/40 bg-green-400/10',
    textColor: 'text-green-400',
    icon: '📜'
  },
  professional: {
    label: 'Professional',
    color: 'border-purple-400/40 bg-purple-400/10',
    textColor: 'text-purple-400',
    icon: '💼'
  },
  entrepreneurial: {
    label: 'Entrepreneurial',
    color: 'border-amber-400/40 bg-amber-400/10',
    textColor: 'text-amber-400',
    icon: '🚀'
  }
};

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full py-16 md:py-24 px-4 relative bg-gradient-to-b  to-black"
      id="aboutme"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Professional Header */}
        <div className="text-center mb-20">
          <div className="mb-6">
            <div className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-4">
              <span className="text-sm font-medium text-white/80 tracking-wider">PROFESSIONAL CHRONOLOGY</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Academic & Professional<br />Trajectory
            </h1>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto"></div>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            A systematic progression of me through formal education, technical certifications, 
            and professional experience demonstrating continuous growth and specialization.
          </p>
        </div>

        {/* Executive Summary */}
        <div className="mb-16">
          <div className="border border-white/20 bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-1/3">
                <h3 className="text-2xl font-bold text-white mb-4">Brian Kareithi</h3>
                <div className="space-y-2">
                  <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">
                    Specializations
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Cybersecurity', 'Cloud Architecture', 'Full-Stack Development', 'Enterprise Security'].map((spec) => (
                      <span key={spec} className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-white/90">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <p className="text-gray-300 mb-6 leading-relaxed">
                  My professional journey represents a deliberate progression from foundational 
                  education through specialized certification to practical application. Each phase 
                  builds upon previous knowledge, creating a comprehensive skill set that spans 
                  technical implementation, strategic planning, and entrepreneurial initiative, skill set you cant find inside anyone else.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border border-white/10 rounded-lg">
                    <div className="text-2xl font-bold text-white">5+</div>
                    <div className="text-sm text-gray-400 mt-1">Years in Tech</div>
                  </div>
                  <div className="text-center p-4 border border-white/10 rounded-lg">
                    <div className="text-2xl font-bold text-white"> Over 6</div>
                    <div className="text-sm text-gray-400 mt-1">Certifications</div>
                  </div>
                  <div className="text-center p-4 border border-white/10 rounded-lg">
                    <div className="text-2xl font-bold text-white">3</div>
                    <div className="text-sm text-gray-400 mt-1">Sectors</div>
                  </div>
                  <div className="text-center p-4 border border-white/10 rounded-lg">
                    <div className="text-2xl font-bold text-white">50+</div>
                    <div className="text-sm text-gray-400 mt-1">Projects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
          
          {/* Timeline Items */}
          <div className="space-y-12">
            {sortedTimeline.map((item, index) => {
              const category = categoryConfig[item.category];
              const isLeft = index % 2 === 0;
              
              return (
                <div 
                  key={index}
                  className={`flex flex-col md:flex-row items-start relative ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-2 border-white/30 bg-black z-10"></div>
                  
                  {/* Content Container */}
                  <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                    isLeft ? 'md:pr-12' : 'md:pl-12 md:text-right'
                  }`}>
                    <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                      {/* Category Badge */}
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${category.color} mb-4`}>
                        <span className="text-xs">{category.icon}</span>
                        <span className={`text-xs font-medium ${category.textColor}`}>
                          {category.label}
                        </span>
                      </div>
                      
                      {/* Title & Institution */}
                      <h4 className="text-xl font-bold text-white mb-2">
                        {item.title}
                      </h4>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-400">{item.institution}</span>
                        <span className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded">
                          {item.period}
                        </span>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                        {item.description}
                      </p>
                      
                      {/* Significance */}
                      {item.significance && (
                        <div className="mb-4">
                          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                            Significance
                          </div>
                          <p className="text-sm text-white/80">
                            {item.significance}
                          </p>
                        </div>
                      )}
                      
                      {/* Metrics */}
                      {item.metrics && (
                        <div className="border-t border-white/10 pt-4">
                          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                            Key Metrics
                          </div>
                          <ul className={`space-y-1 ${isLeft ? '' : 'md:text-right'}`}>
                            {item.metrics.map((metric, i) => (
                              <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                                <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                                {metric}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Year Indicator */}
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 font-medium">
                            Commencement Year
                          </span>
                          <span className="text-sm text-white font-semibold">
                            {item.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing Remark - Refined */}
        <div className="mt-24">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 border-l-2 border-white/20 ml-6"></div>
              <div className="pl-12 relative">
                <div className="text-5xl text-white/20 font-serif mb-2">"</div>
                <p className="text-xl text-gray-300 italic leading-relaxed mb-6">
                  I understand that was a comprehensive review of my professional Journey. 
                  The subsequent sections will provide more concise overviews of my specific technical 
                  competencies and project implementations.
                </p>
                <div className="text-5xl text-white/20 font-serif text-right">"</div>
              </div>
            </div>
            
            {/* Key Takeaways */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-3">Progressive Learning</h4>
                <p className="text-gray-400 text-sm">
                  Each certification and role demonstrates cumulative knowledge acquisition and application.
                </p>
              </div>
              <div className="border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-3">Diverse Experience</h4>
                <p className="text-gray-400 text-sm">
                  Experience spans public sector, private enterprise, and entrepreneurial ventures.
                </p>
              </div>
              <div className="border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-3">Future Orientation</h4>
                <p className="text-gray-400 text-sm">
                  Current focus on scalable solutions and mentorship for next-generation professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}