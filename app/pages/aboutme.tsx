"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    title: 'Frontend Developer and ICT Support',
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

// Group timeline by category
const groupedTimeline = timeline.reduce((acc, item) => {
  if (!acc[item.category]) {
    acc[item.category] = [];
  }
  acc[item.category].push(item);
  return acc;
}, {} as Record<string, TimelineItem[]>);

// Sort each category by year
Object.keys(groupedTimeline).forEach(category => {
  groupedTimeline[category].sort((a, b) => a.year - b.year);
});

// Category configuration
const categoryConfig = {
  education: {
    label: 'Education',
    icon: '🎓',
    color: '#3b82f6', // blue-500
    bgColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.3)'
  },
  certification: {
    label: 'Certifications',
    icon: '📜',
    color: '#10b981', // emerald-500
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)'
  },
  professional: {
    label: 'Professional',
    icon: '💼',
    color: '#8b5cf6', // violet-500
    bgColor: 'rgba(139, 92, 246, 0.1)',
    borderColor: 'rgba(139, 92, 246, 0.3)'
  },
  entrepreneurial: {
    label: 'Entrepreneurial',
    icon: '🚀',
    color: '#f59e0b', // amber-500
    bgColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.3)'
  }
};

// Tabs for navigation
const tabs = Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>;

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState<keyof typeof categoryConfig>('education');
  const [activeSubTab, setActiveSubTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const activeCategory = categoryConfig[activeTab];
  const activeItems = groupedTimeline[activeTab] || [];
  const activeTabIndex = tabs.indexOf(activeTab);

  // Reset sub-tab when main tab changes
  useEffect(() => {
    setActiveSubTab(0);
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        const currentIndex = tabs.indexOf(activeTab);
        switch (e.key) {
          case 'ArrowRight':
            e.preventDefault();
            setActiveTab(tabs[(currentIndex + 1) % tabs.length]);
            break;
          case 'ArrowLeft':
            e.preventDefault();
            setActiveTab(tabs[(currentIndex - 1 + tabs.length) % tabs.length]);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab]);

  // Navigation functions
  const goToNextTab = () => {
    const nextIndex = (activeTabIndex + 1) % tabs.length;
    setActiveTab(tabs[nextIndex]);
  };

  const goToPrevTab = () => {
    const prevIndex = (activeTabIndex - 1 + tabs.length) % tabs.length;
    setActiveTab(tabs[prevIndex]);
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full py-12 md:py-16 px-4 relative bg-gradient-to-b from-gray-900 to-black"
      id="aboutme"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50 backdrop-blur-sm mb-4">
            <span className="text-xs font-medium text-gray-300 tracking-wider">CAREER CHRONICLE</span>
            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
            <span className="text-xs font-medium text-gray-400 hidden sm:inline">PRESS ALT + ARROWS TO NAVIGATE</span>
            <span className="text-xs font-medium text-gray-400 sm:hidden">SWIPE OR USE ARROWS</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional Journey
          </h1>
          
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-6"></div>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            A structured overview of my academic foundation, technical certifications, 
            and professional experience demonstrating deliberate growth and specialization.
          </p>
        </div>

        {/* Executive Summary Card */}
        <div className="mb-12">
          <div className="border border-gray-800 bg-gray-900/50 backdrop-blur-sm rounded-lg p-6">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Left Profile Section */}
              <div className="lg:w-2/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-gray-700 flex items-center justify-center">
                    <span className="text-2xl">👨‍💻</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Brian Kareithi</h3>
                    <p className="text-gray-400 text-sm">Cybersecurity & Full-Stack Developer</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
                    <div className="text-xl font-bold text-white">5+</div>
                    <div className="text-xs text-gray-400 mt-1">Years in Tech</div>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
                    <div className="text-xl font-bold text-white">6</div>
                    <div className="text-xs text-gray-400 mt-1">Certifications</div>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
                    <div className="text-xl font-bold text-white">3</div>
                    <div className="text-xs text-gray-400 mt-1">Sectors</div>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
                    <div className="text-xl font-bold text-white">50+</div>
                    <div className="text-xs text-gray-400 mt-1">Projects</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {['Cybersecurity', 'Cloud Architecture', 'Full-Stack Development', 'Enterprise Security'].map((spec) => (
                    <span 
                      key={spec} 
                      className="px-3 py-1.5 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300 hover:border-gray-600 transition-colors"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Right Description Section */}
              <div className="lg:w-3/5">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Professional Philosophy</h4>
                  <p className="text-gray-300 leading-relaxed">
                    My career represents a deliberate progression from foundational education through 
                    specialized certification to practical application. Each phase builds upon previous 
                    knowledge, creating a comprehensive skill set that spans technical implementation, 
                    strategic planning, and entrepreneurial initiative.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-blue-400">✓</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Continuous Learning</h5>
                      <p className="text-gray-400 text-sm">Systematic knowledge acquisition through formal education and industry certifications</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-green-500/10 border border-green-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-green-400">✓</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Practical Application</h5>
                      <p className="text-gray-400 text-sm">Real-world implementation across public, private, and entrepreneurial sectors</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-purple-400">✓</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Future-Oriented</h5>
                      <p className="text-gray-400 text-sm">Focus on scalable solutions and mentorship for next-generation professionals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VS Code Inspired Tabbed Layout */}
        <div className="mb-16">
          {/* Tab Bar Container */}
          <div className="border border-gray-800 bg-gray-900/80 backdrop-blur-sm rounded-t-lg overflow-hidden">
            {/* Desktop Tabs Navigation */}
            <div className="hidden md:flex border-b border-gray-800">
              {tabs.map((tab) => {
                const config = categoryConfig[tab];
                const isActive = activeTab === tab;
                
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      relative px-6 py-3 text-sm font-medium transition-all duration-200
                      border-r border-gray-800 flex items-center gap-2 group
                      ${isActive 
                        ? 'text-white bg-gray-800/50' 
                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/30'
                      }
                    `}
                    style={{
                      borderBottom: isActive ? `2px solid ${config.color}` : '2px solid transparent'
                    }}
                  >
                    <span className="text-base">{config.icon}</span>
                    <span>{config.label}</span>
                    <span className="text-xs text-gray-500">
                      ({groupedTimeline[tab]?.length || 0})
                    </span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-50"></div>
                    )}
                  </button>
                );
              })}
              
              {/* Spacer to fill remaining space */}
              <div className="flex-1 border-b border-gray-800"></div>
            </div>

            {/* Mobile Tabs Navigation */}
            <div className="md:hidden flex items-center justify-between border-b border-gray-800 bg-gray-900/50 px-4 py-3">
              {/* Previous Button */}
              <button
                onClick={goToPrevTab}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-700 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/30 transition-all"
                aria-label="Previous category"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden xs:inline">Prev</span>
              </button>

              {/* Current Tab Display */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{activeCategory.icon}</span>
                  <span className="text-sm font-semibold text-white">{activeCategory.label}</span>
                  <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-0.5 rounded">
                    {activeItems.length}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {activeTabIndex + 1} of {tabs.length}
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={goToNextTab}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-700 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/30 transition-all"
                aria-label="Next category"
              >
                <span className="hidden xs:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Tab Indicators */}
            <div className="md:hidden flex justify-center gap-1 py-2 border-b border-gray-800 bg-gray-900/30">
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeTab === tab 
                      ? 'bg-blue-500 scale-125' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to ${categoryConfig[tab].label}`}
                />
              ))}
            </div>

            {/* Content Area */}
            <div className="flex flex-col lg:flex-row min-h-[600px]">
              {/* Left Sidebar - Subtabs (Desktop) */}
              <div className="hidden lg:block w-64 border-r border-gray-800 bg-gray-900/50">
                <div className="p-4 border-b border-gray-800">
                  <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="text-lg">{activeCategory.icon}</span>
                    {activeCategory.label}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {activeItems.length} items • Sorted by year
                  </p>
                </div>
                
                <div className="p-2">
                  {activeItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSubTab(index)}
                      className={`
                        w-full text-left px-3 py-2.5 rounded-lg mb-1 transition-all duration-200
                        flex items-center justify-between group
                        ${activeSubTab === index 
                          ? 'bg-gray-800/70 border border-gray-700' 
                          : 'hover:bg-gray-800/40'
                        }
                      `}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-medium ${activeSubTab === index ? 'text-white' : 'text-gray-400'}`}>
                            {item.year}
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500 truncate">{item.institution}</span>
                        </div>
                        <div className={`text-sm font-medium truncate ${activeSubTab === index ? 'text-white' : 'text-gray-300'}`}>
                          {item.title}
                        </div>
                      </div>
                      {activeSubTab === index && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 ml-2 flex-shrink-0"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Subtabs Navigation */}
              <div className="lg:hidden border-b border-gray-800 bg-gray-900/50">
                <div className="flex items-center justify-between px-4 py-3">
                  <button
                    onClick={() => setActiveSubTab(Math.max(0, activeSubTab - 1))}
                    disabled={activeSubTab === 0}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <div className="text-center">
                    <div className="text-sm font-semibold text-white mb-1">
                      Item {activeSubTab + 1} of {activeItems.length}
                    </div>
                    <div className="text-xs text-gray-400">
                      {activeItems[activeSubTab]?.title.substring(0, 30)}...
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveSubTab(Math.min(activeItems.length - 1, activeSubTab + 1))}
                    disabled={activeSubTab === activeItems.length - 1}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Subtabs Dots */}
                <div className="flex justify-center gap-1.5 pb-3">
                  {activeItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSubTab(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        activeSubTab === index 
                          ? 'bg-blue-500 scale-125' 
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                      aria-label={`Go to item ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div 
                ref={contentRef}
                className="flex-1 overflow-y-auto max-h-[600px]"
              >
                {activeItems.length > 0 && activeSubTab < activeItems.length && (
                  <div className="p-6 md:p-8">
                    <div className="mb-8">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-3xl">{activeCategory.icon}</span>
                        <div>
                          <h2 className="text-2xl font-bold text-white">
                            {activeItems[activeSubTab].title}
                          </h2>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-gray-400 text-sm">
                              {activeItems[activeSubTab].institution}
                            </span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                            <span className="text-gray-500 text-sm bg-gray-800/50 px-2 py-1 rounded">
                              {activeItems[activeSubTab].period}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border mb-4"
                          style={{
                            backgroundColor: activeCategory.bgColor,
                            borderColor: activeCategory.borderColor
                          }}
                        >
                          <span className="text-xs font-medium" style={{ color: activeCategory.color }}>
                            {activeCategory.label.toUpperCase()}
                          </span>
                        </div>
                        
                        <p className="text-gray-300 leading-relaxed mb-6">
                          {activeItems[activeSubTab].description}
                        </p>
                      </div>
                    </div>

                    {/* Significance & Metrics */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {activeItems[activeSubTab].significance && (
                        <div className="border border-gray-800 rounded-lg p-5 bg-gray-900/30">
                          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                            Strategic Significance
                          </h4>
                          <p className="text-white text-lg">
                            {activeItems[activeSubTab].significance}
                          </p>
                        </div>
                      )}
                      
                      {activeItems[activeSubTab].metrics && (
                        <div className="border border-gray-800 rounded-lg p-5 bg-gray-900/30">
                          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                            Key Metrics & Achievements
                          </h4>
                          <ul className="space-y-2.5">
                            {activeItems[activeSubTab].metrics!.map((metric, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 flex-shrink-0"></span>
                                <span className="text-gray-300">{metric}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Desktop Year Navigation */}
                    <div className="hidden md:block mt-8 pt-6 border-t border-gray-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-500">Item</span>
                          <div className="text-lg font-semibold text-white">
                            {activeSubTab + 1} of {activeItems.length}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => setActiveSubTab(Math.max(0, activeSubTab - 1))}
                            disabled={activeSubTab === 0}
                            className="px-4 py-2 rounded-lg border border-gray-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                          >
                            ← Previous
                          </button>
                          <button
                            onClick={() => setActiveSubTab(Math.min(activeItems.length - 1, activeSubTab + 1))}
                            disabled={activeSubTab === activeItems.length - 1}
                            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                          >
                            Next →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Bottom Status Bar */}
          <div className="bg-gray-900 border border-gray-800 border-t-0 rounded-b-lg px-4 py-2 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="hidden sm:inline">Active:</span>
                <span className="font-medium text-gray-300">{categoryConfig[activeTab].label}</span>
              </span>
              <span className="hidden md:inline">
                Items: {activeItems.length}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline">
                Press ALT + ←/→ to switch tabs
              </span>
              <span>
                Item: {activeSubTab + 1}/{activeItems.length}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Summary */}
        <div className="max-w-4xl mx-auto">
          <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/30">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">💡</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Key Insights</h3>
                <p className="text-gray-400">
                  This structured view demonstrates a methodical progression from foundational education 
                  through specialized certification to practical application across multiple sectors.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-800 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Progressive Development</h4>
                <p className="text-gray-400 text-sm">
                  Each phase builds upon previous knowledge, demonstrating cumulative growth
                </p>
              </div>
              <div className="p-4 border border-gray-800 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Diverse Experience</h4>
                <p className="text-gray-400 text-sm">
                  Exposure across public sector, private enterprise, and entrepreneurial ventures
                </p>
              </div>
              <div className="p-4 border border-gray-800 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Strategic Focus</h4>
                <p className="text-gray-400 text-sm">
                  Current emphasis on scalable solutions and professional mentorship
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}