import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  Github, 
  Linkedin, 
  FileText, 
  Mail, 
  Heart, 
  MapPin, 
  Calendar,
  Users,
  Award,
  Shield,
  Sparkles,
  Send,
  CheckCircle
} from "lucide-react";

interface FooterProps {
  isDark: boolean;
}

interface QuickLink {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ isDark }) => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  
  // Theme-aware classes
  const t = {
    heading: isDark ? "text-gray-100" : "text-gray-900",
    sub: isDark ? "text-gray-300" : "text-gray-700",
    muted: isDark ? "text-gray-400" : "text-gray-500",
    border: isDark ? "border-white/10" : "border-gray-200",
    card: isDark ? "bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm" : "bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm",
  };

  const quickLinks: QuickLink[] = [
    { name: "Dashboard", path: "/dashboard", icon: <BarChart3 className="w-3 h-3" /> },
    { name: "Features", path: "#features", icon: <Award className="w-3 h-3" /> },
    { name: "How It Works", path: "#how", icon: <Users className="w-3 h-3" /> },
    { name: "Why Us", path: "#why", icon: <Shield className="w-3 h-3" /> },
    { name: "FAQ", path: "#faq", icon: <FileText className="w-3 h-3" /> },
  ];

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Blog", path: "/blog" },
    { name: "Press", path: "/press" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
    { name: "GDPR", path: "/gdpr" },
  ];

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      const offsetTop = element.offsetTop - 88;
      window.scrollTo({
        top: offsetTop > 0 ? offsetTop : 0,
        behavior: 'smooth'
      });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (email) {
      console.log("Newsletter subscription:", email);
      setSubscribed(true);
      setEmail("");
      
      // Reset subscription message after 3 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className={`relative overflow-hidden ${isDark ? "bg-gradient-to-b from-gray-900 to-black" : "bg-gradient-to-b from-gray-50 to-white"} border-t ${t.border}`} aria-label="Footer">
      {/* Background decorations */}
      {isDark && (
        <>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-400/20 to-transparent"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl"></div>
        </>
      )}
      
      {/* Inline styles for animations */}
      <style>
        {`
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes heartbeat {
            0% { transform: scale(1); }
            25% { transform: scale(1.1); }
            50% { transform: scale(1); }
            75% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes typewriter {
            from { width: 0; }
            to { width: 100%; }
          }
          
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .animate-gradient-x {
            background-size: 200% auto;
            animation: gradient-x 3s ease infinite;
          }
          
          .animate-heartbeat {
            animation: heartbeat 1.5s ease infinite;
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.5s ease-out;
          }
          
          .animate-typewriter {
            animation: typewriter 2s steps(40) 1s 1 normal both;
            white-space: nowrap;
            overflow: hidden;
            display: inline-block;
          }
          
          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
          }
          
          .animate-ping {
            animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          
          @keyframes ping {
            75%, 100% {
              transform: scale(2);
              opacity: 0;
            }
          }
          
          .animate-bounce {
            animation: bounce 1s infinite;
          }
          
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }
          
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}
      </style>
      
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Column - Enhanced with animation */}
          <div className="space-y-4">
            <div 
              className="flex items-center gap-3 group cursor-pointer"
              onMouseEnter={() => setHoveredLink("brand")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <div className={`
                ${isDark ? "bg-gradient-to-br from-teal-400/20 to-cyan-400/10" : "bg-gradient-to-br from-cyan-100 to-teal-100"} 
                rounded-xl p-3 shadow-lg transition-all duration-500 
                ${hoveredLink === "brand" ? "scale-110 rotate-6 shadow-teal-500/20" : ""}
                group-hover:shadow-2xl group-hover:shadow-teal-400/20
              `}>
                <BarChart3 className={`
                  ${isDark ? "text-teal-300" : "text-teal-600"} h-6 w-6 
                  transition-all duration-500 
                  ${hoveredLink === "brand" ? "scale-125" : ""}
                `} />
              </div>
              <div className="overflow-hidden">
                <h2 className="text-2xl font-bold">
                  <span className="relative overflow-visible">
                    <span className="relative z-10 bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
                      DevScore
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-400/20 via-cyan-300/20 to-teal-400/20 blur-xl animate-pulse"></span>
                  </span>
                  <Sparkles className="inline-block w-4 h-4 ml-2 text-amber-300 animate-spin-slow" />
                </h2>
                <p className={`${t.muted} text-sm mt-1 transform transition-transform duration-300 ${hoveredLink === "brand" ? "translate-x-2" : ""}`}>
                  Developer Profile Analyzer
                </p>
              </div>
            </div>
            <p className={`${t.sub} text-sm leading-relaxed transition-all duration-500 ${hoveredLink === "brand" ? "blur-sm opacity-50" : "blur-0 opacity-100"}`}>
              Empowering developers with actionable insights and growth strategies through comprehensive profile analysis.
            </p>
            
            {/* Contact Info with hover effects */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-2 group">
                <div className={`p-1.5 rounded-lg ${isDark ? "bg-gray-800" : "bg-gray-100"} transition-all duration-300 group-hover:scale-110 group-hover:bg-teal-500/10`}>
                  <MapPin className={`w-3 h-3 ${t.muted} transition-colors duration-300 group-hover:text-teal-400`} />
                </div>
                <span className={`${t.sub} text-xs transition-all duration-300 group-hover:translate-x-2 group-hover:text-teal-400`}>
                  Remote • Global Team
                </span>
              </div>
              <div className="flex items-center gap-2 group">
                <div className={`p-1.5 rounded-lg ${isDark ? "bg-gray-800" : "bg-gray-100"} transition-all duration-300 group-hover:scale-110 group-hover:bg-teal-500/10`}>
                  <Calendar className={`w-3 h-3 ${t.muted} transition-colors duration-300 group-hover:text-teal-400`} />
                </div>
                <span className={`${t.sub} text-xs transition-all duration-300 group-hover:translate-x-2 group-hover:text-teal-400`}>
                  Founded 2024
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links Column with enhanced hover */}
          <div>
            <h3 className={`${t.heading} font-semibold text-lg mb-4 flex items-center gap-2`}>
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-300 animate-pulse"></span>
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li 
                  key={index}
                  className="relative overflow-hidden"
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.path.startsWith('#') ? (
                    <button
                      onClick={() => scrollToSection(link.path)}
                      className={`
                        ${t.muted} hover:text-teal-400 transition-all duration-500 
                        text-sm flex items-center gap-2 w-full text-left
                        ${hoveredLink === link.name ? "translate-x-3" : ""}
                      `}
                    >
                      <span className={`
                        ${isDark ? "text-teal-400/60" : "text-teal-500/60"} 
                        transition-all duration-500
                        ${hoveredLink === link.name ? "scale-125 rotate-12" : ""}
                      `}>
                        {link.icon}
                      </span>
                      <span className="relative">
                        {link.name}
                        <span className={`
                          absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-teal-400 to-cyan-300 
                          transition-all duration-500 ${hoveredLink === link.name ? "w-full" : ""}
                        `}></span>
                      </span>
                      <span className={`
                        text-teal-400 opacity-0 -translate-x-2 transition-all duration-500
                        ${hoveredLink === link.name ? "opacity-100 translate-x-0" : ""}
                      `}>
                        →
                      </span>
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      className={`
                        ${t.muted} hover:text-teal-400 transition-all duration-500 
                        text-sm flex items-center gap-2
                        ${hoveredLink === link.name ? "translate-x-3" : ""}
                      `}
                    >
                      <span className={`
                        ${isDark ? "text-teal-400/60" : "text-teal-500/60"} 
                        transition-all duration-500
                        ${hoveredLink === link.name ? "scale-125 rotate-12" : ""}
                      `}>
                        {link.icon}
                      </span>
                      <span className="relative">
                        {link.name}
                        <span className={`
                          absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-teal-400 to-cyan-300 
                          transition-all duration-500 ${hoveredLink === link.name ? "w-full" : ""}
                        `}></span>
                      </span>
                      <span className={`
                        text-teal-400 opacity-0 -translate-x-2 transition-all duration-500
                        ${hoveredLink === link.name ? "opacity-100 translate-x-0" : ""}
                      `}>
                        →
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links Column */}
          <div>
            <h3 className={`${t.heading} font-semibold text-lg mb-4 flex items-center gap-2`}>
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-300 animate-pulse" style={{animationDelay: "0.2s"}}></span>
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li 
                  key={index}
                  onMouseEnter={() => setHoveredLink(`company-${link.name}`)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link
                    to={link.path}
                    className={`
                      ${t.muted} hover:text-teal-400 transition-all duration-500 
                      text-sm flex items-center gap-2 group
                    `}
                  >
                    <span className={`
                      w-1.5 h-1.5 rounded-full bg-current opacity-50 
                      transition-all duration-500 group-hover:opacity-100 
                      group-hover:scale-150 group-hover:bg-teal-400
                      ${hoveredLink === `company-${link.name}` ? "animate-ping" : ""}
                    `}></span>
                    <span className="relative">
                      {link.name}
                      <span className={`
                        absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-teal-400 to-cyan-300 
                        transition-all duration-500 group-hover:w-full
                      `}></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Social Links with enhanced animations */}
            <div className="mt-8">
              <h4 className={`${t.sub} text-sm font-medium mb-3`}>Connect With Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: <Github className="w-4 h-4" />, href: "https://github.com", label: "GitHub", color: "hover:bg-gray-900" },
                  { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com", label: "LinkedIn", color: "hover:bg-blue-600" },
                  { icon: <Mail className="w-4 h-4" />, href: "mailto:hello@devscore.com", label: "Email", color: "hover:bg-red-500" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      p-2.5 rounded-xl transition-all duration-500 transform
                      ${isDark 
                        ? "bg-gray-800/50 text-gray-300 hover:text-white" 
                        : "bg-white text-gray-600 hover:text-white border border-gray-200"
                      }
                      hover:scale-110 hover:shadow-2xl hover:-translate-y-1
                      ${social.color}
                      backdrop-blur-sm
                    `}
                    aria-label={social.label}
                  >
                    <div className="relative">
                      {social.icon}
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-400 rounded-full animate-ping opacity-75"></span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Column with success animation */}
          <div>
            <h3 className={`${t.heading} font-semibold text-lg mb-4 flex items-center gap-2`}>
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-300 animate-pulse" style={{animationDelay: "0.4s"}}></span>
              Stay Updated
            </h3>
            <p className={`${t.muted} text-sm mb-4 transition-all duration-500 ${subscribed ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
              Get the latest updates on new features and improvements.
            </p>
            
            {subscribed ? (
              <div className="animate-fade-in-up">
                <div className={`p-4 rounded-xl ${isDark ? "bg-teal-500/10 border border-teal-500/20" : "bg-teal-50 border border-teal-200"}`}>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-400 animate-bounce" />
                    <div>
                      <p className="text-teal-400 font-medium">Subscribed Successfully!</p>
                      <p className={`${t.muted} text-xs mt-1`}>Welcome to the DevScore community 🎉</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className={`
                      w-full px-4 py-2.5 rounded-xl text-sm
                      ${isDark 
                        ? "bg-gray-800/50 border border-white/10 text-white placeholder-gray-400" 
                        : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500"
                      }
                      focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-transparent
                      transition-all duration-500
                      group-hover:shadow-xl group-hover:shadow-teal-400/10
                      backdrop-blur-sm
                    `}
                    aria-label="Email address for newsletter"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 
                      bg-gradient-to-r from-teal-400 to-cyan-300 text-black text-xs font-semibold 
                      rounded-lg hover:opacity-90 transition-all duration-500
                      hover:shadow-xl hover:shadow-teal-300/30 hover:scale-105
                      flex items-center gap-1 group/btn"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3 h-3 transition-transform duration-500 group-hover/btn:translate-x-1" />
                  </button>
                </div>
                <p className={`${t.muted} text-xs leading-relaxed`}>
                  By subscribing, you agree to our Privacy Policy and consent to receive updates.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Animated Divider
        <div className="relative my-8">
          <div className={`h-px ${t.border} w-full`}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className={`${isDark ? "bg-gray-900" : "bg-white"} px-4`}>
              <Heart className="w-4 h-4 text-red-400 animate-heartbeat" />
            </div>
          </div>
        </div> */}

        {/* Bottom Bar with floating animation */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 animate-float">
          <div className={`${t.muted} text-sm text-center md:text-left flex items-center gap-2`}>
            <span>© {currentYear} DevScore. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <br className="md:hidden" />
            <span className="flex items-center">
              Made with 
              <Heart className="inline-block w-3.5 h-3.5 text-red-400 mx-1.5 animate-heartbeat" /> 
              for developers worldwide.
            </span>
          </div>
          
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
            {legalLinks.map((link, index) => (
              <a 
                key={index}
                href={link.path} 
                className={`
                  ${t.muted} hover:text-teal-400 text-xs transition-all duration-500
                  relative group
                `}
                onMouseEnter={() => setHoveredLink(`legal-${link.name}`)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.name}
                <span className={`
                  absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-300
                  transition-all duration-500 group-hover:w-full
                `}></span>
              </a>
            ))}
          </div>
        </div>

        {/* Attribution with typing effect */}
        <div className="text-center mt-8 space-y-2">
          <p className={`${t.muted} text-xs animate-typewriter overflow-hidden whitespace-nowrap border-r-2 border-r-teal-400 pr-1`}>
            DevScore is an open-source project. 
            <a 
              href="https://github.com/devscore" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 ml-1 font-medium group"
            >
              <span className="relative">
                Contribute on GitHub
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-teal-400 transition-all duration-500 group-hover:w-full"></span>
              </span>
            </a>
          </p>
          <p className={`${t.muted} text-xs flex items-center justify-center gap-2 flex-wrap`}>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              React
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" style={{animationDelay: "0.1s"}}></span>
              TypeScript
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" style={{animationDelay: "0.2s"}}></span>
              Tailwind CSS
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" style={{animationDelay: "0.3s"}}></span>
              Supabase
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;