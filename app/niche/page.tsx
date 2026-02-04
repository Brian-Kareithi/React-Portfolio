"use client";

import { useState } from "react";
import { 
  Wifi, 
  CloudUpload, 
  Server, 
  Cpu, 
  Zap, 
  Lock, 
  Activity,
  HardDrive,
  Radio,
  Home,
  Smartphone,
  Clock,
  Shield,
  Database,
  Network,
  Terminal,
  Brain
} from "lucide-react";

const niches = [
  {
    id: "home-automation",
    title: "Home Automation System",
    description: "Intelligent IoT network that responds to presence and creates ambient experiences",
    icon: <Home className="w-6 h-6" />,
    status: "Active Development",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    features: [
      "Phone detection via WiFi presence",
      "RGB lighting automation",
      "Multi-room device coordination",
      "Voice command integration"
    ],
    components: [
      "Raspberry Pi 4 Controller",
      "ESP32 Microcontrollers",
      "Custom REST API",
      "MQTT Protocol"
    ]
  },
  {
    id: "media-server",
    title: "Personal Media & Backup Server",
    description: "High-performance home server with automated backup and media streaming capabilities",
    icon: <Server className="w-6 h-6" />,
    status: "Operational",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    features: [
      "2TB RAID 1 Storage",
      "16GB DDR4 RAM",
      "Automated photo backup",
      "4K Media Streaming"
    ],
    stats: [
      { label: "Storage Used", value: "1.2TB", color: "bg-purple-500" },
      { label: "Uptime", value: "99.8%", color: "bg-green-500" },
      { label: "Services", value: "12+", color: "bg-blue-500" }
    ]
  },
  {
    id: "robotics",
    title: "Robotics & Embedded Systems",
    description: "Building intelligent robots and automation systems for real-world applications",
    icon: <Cpu className="w-6 h-6" />,
    status: "Experimental",
    color: "bg-green-500/20 text-green-400 border-green-500/30",
    projects: [
      "Line-following robot with computer vision",
      "Home surveillance drone prototype",
      "Voice-controlled assistant robot",
      "Automated plant watering system"
    ],
    technologies: [
      "Arduino",
      "Raspberry Pi",
      "ROS (Robot Operating System)",
      "Computer Vision (OpenCV)"
    ]
  }
];

const services = [
  {
    name: "Nextcloud",
    description: "Self-hosted cloud storage and collaboration platform",
    icon: <CloudUpload className="w-5 h-5" />,
    status: "Active",
    port: 8080
  },
  {
    name: "Plex Media Server",
    description: "Media streaming and organization for all devices",
    icon: <HardDrive className="w-5 h-5" />,
    status: "Active",
    port: 32400
  },
  {
    name: "Home Assistant",
    description: "Open-source home automation platform",
    icon: <Zap className="w-5 h-5" />,
    status: "Active",
    port: 8123
  },
  {
    name: "Pi-hole",
    description: "Network-wide ad blocking and DNS sinkhole",
    icon: <Shield className="w-5 h-5" />,
    status: "Active",
    port: 53
  },
  {
    name: "Jellyfin",
    description: "Free software media system alternative to Plex",
    icon: <Activity className="w-5 h-5" />,
    status: "Standby",
    port: 8096
  },
  {
    name: "Git Server",
    description: "Self-hosted Git repository manager",
    icon: <Terminal className="w-5 h-5" />,
    status: "Active",
    port: 3000
  }
];

export default function Niche() {
  const [activeTab, setActiveTab] = useState("overview");
  const [automationStatus, setAutomationStatus] = useState({
    phoneDetected: true,
    lightsActive: true,
    backupRunning: false,
    serverOnline: true
  });

  return (
    <section className="min-h-screen w-full py-12 md:py-16 px-4 relative bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-300 tracking-wider">TECHNICAL PASSIONS & PERSONAL PROJECTS</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Home Lab & Robotics
          </h1>
          
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-6"></div>
          
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Where professional skills meet personal passion. A living ecosystem of automation, 
            robotics, and self-hosted services that breathe intelligence into everyday life.
          </p>
        </div>

        {/* Live Status Dashboard */}
        <div className="mb-16">
          <div className="border border-gray-800 rounded-xl p-6 bg-gray-900/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Ecosystem Dashboard</h3>
                <p className="text-gray-400">Real-time status of my automated environment</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800/50">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-gray-300">All Systems Operational</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className={`border rounded-lg p-5 ${automationStatus.phoneDetected ? 'border-green-500/50 bg-green-500/5' : 'border-gray-700 bg-gray-800/30'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${automationStatus.phoneDetected ? 'bg-green-500/20' : 'bg-gray-700'}`}>
                    <Smartphone className={`w-5 h-5 ${automationStatus.phoneDetected ? 'text-green-400' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Phone Detection</div>
                    <div className={`text-lg font-semibold ${automationStatus.phoneDetected ? 'text-green-400' : 'text-gray-500'}`}>
                      {automationStatus.phoneDetected ? 'Connected' : 'Offline'}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`border rounded-lg p-5 ${automationStatus.lightsActive ? 'border-blue-500/50 bg-blue-500/5' : 'border-gray-700 bg-gray-800/30'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${automationStatus.lightsActive ? 'bg-blue-500/20' : 'bg-gray-700'}`}>
                    <Zap className={`w-5 h-5 ${automationStatus.lightsActive ? 'text-blue-400' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">RGB Lighting</div>
                    <div className={`text-lg font-semibold ${automationStatus.lightsActive ? 'text-blue-400' : 'text-gray-500'}`}>
                      {automationStatus.lightsActive ? 'Active' : 'Standby'}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`border rounded-lg p-5 ${automationStatus.backupRunning ? 'border-purple-500/50 bg-purple-500/5' : 'border-gray-700 bg-gray-800/30'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${automationStatus.backupRunning ? 'bg-purple-500/20' : 'bg-gray-700'}`}>
                    <CloudUpload className={`w-5 h-5 ${automationStatus.backupRunning ? 'text-purple-400' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Backup Status</div>
                    <div className={`text-lg font-semibold ${automationStatus.backupRunning ? 'text-purple-400' : 'text-gray-500'}`}>
                      {automationStatus.backupRunning ? 'Running' : 'Idle'}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`border rounded-lg p-5 ${automationStatus.serverOnline ? 'border-amber-500/50 bg-amber-500/5' : 'border-gray-700 bg-gray-800/30'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${automationStatus.serverOnline ? 'bg-amber-500/20' : 'bg-gray-700'}`}>
                    <Server className={`w-5 h-5 ${automationStatus.serverOnline ? 'text-amber-400' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Home Server</div>
                    <div className={`text-lg font-semibold ${automationStatus.serverOnline ? 'text-amber-400' : 'text-gray-500'}`}>
                      {automationStatus.serverOnline ? 'Online' : 'Offline'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Automation Flow Visualization */}
            <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/30">
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Wifi className="w-5 h-5 text-blue-500" />
                Automation Workflow
              </h4>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-3">
                    <Smartphone className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-sm font-medium text-white">Phone Connects to WiFi</div>
                  <div className="text-xs text-gray-400 mt-1">Presence detection triggers automation</div>
                </div>

                <div className="hidden md:block">
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
                  <div className="text-center text-xs text-gray-500 mt-1">Triggers</div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-3">
                    <Zap className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="text-sm font-medium text-white">RGB Lights Activate</div>
                  <div className="text-xs text-gray-400 mt-1">Ambient lighting adjusts to presence</div>
                </div>

                <div className="hidden md:block">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-purple-500"></div>
                  <div className="text-center text-xs text-gray-500 mt-1">Then</div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-3">
                    <CloudUpload className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="text-sm font-medium text-white">Auto Backup Starts</div>
                  <div className="text-xs text-gray-400 mt-1">Photos sync to home server</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Niche Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8">Technical Passion Projects</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {niches.map((niche) => (
              <div key={niche.id} className={`border rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 ${niche.color.split(' ')[1]}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${niche.color.split(' ')[0]}`}>
                    {niche.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{niche.title}</h4>
                    <div className="text-sm px-3 py-1 rounded-full border border-gray-700 bg-gray-800/50 inline-block mt-1">
                      {niche.status}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6">{niche.description}</p>
                
                {niche.features && (
                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-400 mb-3">Key Features</div>
                    <ul className="space-y-2">
                      {niche.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {niche.stats && (
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {niche.stats.map((stat, idx) => (
                      <div key={idx} className="text-center p-3 border border-gray-800 rounded-lg">
                        <div className={`text-lg font-bold ${stat.color.split(' ')[0].replace('bg-', 'text-')}`}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Home Server Services */}
        <div className="mb-16">
          <div className="border border-gray-800 rounded-xl p-6 bg-gray-900/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Home Server Services</h3>
                <p className="text-gray-400">2TB Storage • 16GB RAM • 12+ Running Services</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-gray-300">6 Active Services</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, idx) => (
                <div key={idx} className="border border-gray-800 rounded-lg p-5 hover:border-gray-700 hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center">
                        {service.icon}
                      </div>
                      <div>
                        <h5 className="font-semibold text-white">{service.name}</h5>
                        <div className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${
                          service.status === 'Active' 
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {service.status}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-4">{service.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Port: {service.port}</span>
                    <span className="text-gray-300">HTTP/HTTPS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8">Home Lab Technology Stack</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border border-gray-800 rounded-xl p-6 text-center hover:border-blue-500/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Raspberry Pi 4</h4>
              <p className="text-sm text-gray-400">4GB RAM • 64-bit • ARM Cortex-A72</p>
            </div>
            
            <div className="border border-gray-800 rounded-xl p-6 text-center hover:border-green-500/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">ESP32</h4>
              <p className="text-sm text-gray-400">WiFi • Bluetooth • Dual Core • IoT</p>
            </div>
            
            <div className="border border-gray-800 rounded-xl p-6 text-center hover:border-purple-500/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">2TB HDD RAID</h4>
              <p className="text-sm text-gray-400">RAID 1 • 7200 RPM • NAS Storage</p>
            </div>
            
            <div className="border border-gray-800 rounded-xl p-6 text-center hover:border-amber-500/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
                <Network className="w-6 h-6 text-amber-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Custom Network</h4>
              <p className="text-sm text-gray-400">VLAN • QoS • IoT Isolation</p>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="border border-gray-800 rounded-xl p-8 bg-gradient-to-br from-gray-900 to-gray-950">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="lg:w-1/3">
              <div className="w-16 h-16 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6">
                <Radio className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Why Home Automation?</h3>
              <p className="text-gray-400">
                It's about building intelligent systems that adapt to life, not forcing life to adapt to technology.
              </p>
            </div>
            
            <div className="lg:w-2/3">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-800 rounded-lg p-5">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-green-400" />
                    Privacy First
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Self-hosted solutions ensure complete data ownership and eliminate third-party surveillance.
                  </p>
                </div>
                
                <div className="border border-gray-800 rounded-lg p-5">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-400" />
                    Continuous Learning
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Every automation is an opportunity to explore new protocols, languages, and system architectures.
                  </p>
                </div>
                
                <div className="border border-gray-800 rounded-lg p-5">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-400" />
                    Efficiency
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Automating repetitive tasks creates more time for meaningful work and creative projects.
                  </p>
                </div>
                
                <div className="border border-gray-800 rounded-lg p-5">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-400" />
                    Security Research
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Building and securing personal systems provides invaluable insights for enterprise security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            This ecosystem represents the intersection of professional expertise and personal curiosity. 
            Every automation is a solution to a real problem, every service a learning opportunity.
          </p>
          <a 
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 border border-gray-700 rounded-lg bg-gray-800/50 hover:bg-gray-800 hover:border-gray-600 transition-all"
          >
            <span className="font-medium text-gray-300 hover:text-white">Back to Portfolio</span>
          </a>
        </div>
      </div>
    </section>
  );
}