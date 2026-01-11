import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Github,
  Linkedin,
  FileText,
  Code,
  ArrowRight,
  X,
  Sun,
  Moon,
  Cpu,
  Zap,
  ShieldCheck,
  Users,
  Menu,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const HEADER_HEIGHT = 88; // px - adjust if you change header padding

// Helper component for FAQ details (to clean up the main component)
const FAQItem: React.FC<{ question: string; answer: string; isDark: boolean; }> = ({ question, answer, isDark }) => {
  const t = { muted: isDark ? "text-gray-400" : "text-gray-500" };

  return (
    <details data-aos="fade-up" className={`${isDark ? "glass hover:glass-strong" : "bg-white border border-gray-100 hover:border-gray-300"} rounded-lg p-5 transition-all duration-300`}>
      <summary className={`font-semibold cursor-pointer flex items-center justify-between transition-colors`}>
        <span className="flex-1">{question}</span>
        <span className={`ml-3 text-lg ${isDark ? "text-teal-300" : "text-teal-600"}`}>+</span>
      </summary>
      <div className={`${t.muted} mt-3 pt-3 border-t ${isDark ? "border-white/5" : "border-gray-100"} text-sm leading-relaxed`}>{answer}</div>
    </details>
  );
};

const Landing: React.FC = () => {
  const { user } = useAuth();
  // theme state (persisted)
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  // Mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // doc popup
  const [showDocPopup, setShowDocPopup] = useState(false);
  // Track touch active state
  const [touchActiveId, setTouchActiveId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("devscore_theme");
      const initial = saved === "light" ? "light" : "dark";
      setTheme(initial);
      if (initial === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    } catch {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }

    // ensure smooth programmatic scrolling & touch scroll
    document.documentElement.style.scrollBehavior = "smooth";
    // ensure body base colors set to match theme to avoid invisible content on first paint
    if (document.documentElement.classList.contains("dark")) {
      document.body.classList.remove("bg-white", "text-black");
      document.body.classList.add("bg-gray-900", "text-gray-100");
    } else {
      document.body.classList.remove("bg-gray-900", "text-gray-100");
      document.body.classList.add("bg-white", "text-gray-900");
    }

    // ✅ ADD THIS PART - For CSS targeting light/dark mode
    if (theme === 'light') {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("devscore_theme", next);
    } catch { }
    if (next === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.remove("bg-white", "text-black");
      document.body.classList.add("bg-gray-900", "text-gray-100");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900", "text-gray-100");
      document.body.classList.add("bg-white", "text-gray-900");
    }
  };

  // small inline CSS to keep everything inside the file (glass, float, snap fine-tuning)
  const inlineStyles = `
      /* float */
      @keyframes floatY { 0% { transform: translateY(0); } 50% { transform: translateY(-8px);} 100% { transform: translateY(0);} }
      .float-slow { animation: floatY 6s ease-in-out infinite; }

      /* small nav outline removal for the centered nav look */
      .nav-outline { box-shadow: 0 8px 32px rgba(2,6,23,0.45); border: 1px solid rgba(255,255,255,0.04); }

      /* make anchor jumps smooth and avoid tiny flicker */
      html { scroll-behavior: smooth; }

      /* Subtle Shine Effect for professional polish */
      .shine-effect { 
        position: relative; 
        overflow: hidden;
        transition: all 0.3s ease;
      }
        
      .shine-effect::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 50%;
        height: 100%;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%);
        transform: skewX(-30deg);
        transition: all 0.5s ease;
      }

      .shine-effect:hover::before {
        left: 150%;
      }

      /* Card glow on hover (dark mode only) */
      .card-glow-hover:hover {
        box-shadow: 0 0 40px rgba(52, 211, 163, 0.15), 0 0 10px rgba(52, 211, 163, 0.1); /* Teal glow */
      }
    `;

  const isDark = theme === "dark";

  // theme-aware small helpers
  const t = {
    heading: isDark ? "text-gray-100" : "text-gray-900",
    sub: isDark ? "text-gray-300" : "text-gray-700",
    muted: isDark ? "text-gray-400" : "text-gray-500",
    cardBg: isDark ? "glass" : "bg-white",
  };

  // Helper function for smooth scrolling and closing mobile menu
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - HEADER_HEIGHT;
      window.scrollTo({
        top: offsetTop > 0 ? offsetTop : 0,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const NavLinks = () => (
    <>
      <li><a href="#features" onClick={(e) => handleNavigation(e, 'features')} className={`${isDark ? "text-gray-200 hover:text-teal-300" : "text-gray-700 hover:text-teal-600"} transition`}>Features</a></li>
      <li><a href="#how" onClick={(e) => handleNavigation(e, 'how')} className={`${isDark ? "text-gray-200 hover:text-teal-300" : "text-gray-700 hover:text-teal-600"} transition`}>How it works</a></li>
      <li><a href="#why" onClick={(e) => handleNavigation(e, 'why')} className={`${isDark ? "text-gray-200 hover:text-teal-300" : "text-gray-700 hover:text-teal-600"} transition`}>Why Us</a></li>
      <li><a href="#faq" onClick={(e) => handleNavigation(e, 'faq')} className={`${isDark ? "text-gray-200 hover:text-teal-300" : "text-gray-700 hover:text-teal-600"} transition`}>FAQ</a></li>
    </>
  );

  return (
    <div className={`${isDark ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100" : "bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900"} min-h-screen`}>
      <style>{inlineStyles}</style>

      {/* Centered rounded navbar (single nav) */}
      <header data-aos="fade-down" className="fixed top-6 left-0 w-full z-50 flex justify-center">
        <nav
          className={`nav-outline pointer-events-auto ${isDark ? "bg-neutral-900/80" : "bg-white/95"} backdrop-blur-md rounded-3xl px-4 sm:px-8 py-3 flex items-center justify-between w-[95%] max-w-6xl transition-all duration-300`}
          role="navigation"
          aria-label="Main Navigation"
        >
          <Link to="/" className="flex items-center gap-3">
            <div className={`${isDark ? "bg-gradient-to-br from-teal-400/30 to-cyan-400/20" : "bg-gradient-to-br from-cyan-200/40 to-teal-200/30"} rounded-lg p-2 shadow`}>
              <BarChart3 className={`${isDark ? "text-teal-300" : "text-teal-700"} h-6 w-6`} />
            </div>
            <div>
              <div className={`font-semibold leading-none ${t.heading}`}>DevScore</div>
              <div className={`text-xs ${t.muted} -mt-0.5 hidden sm:block`}>Developer Profile Analyzer</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-10 text-base font-medium">
            <NavLinks />
          </ul>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${isDark ? "glass" : "border border-gray-200 bg-white"} hover:scale-105 transition`}
            >
              {isDark ? <Sun className="h-4 w-4 text-yellow-300" /> : <Moon className="h-4 w-4 text-sky-600" />}
              <span className="hidden sm:inline text-sm">{isDark ? "" : ""}</span>
            </button>

            {/* Hamburger Menu Toggle (Visible on Mobile) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden px-3 py-2 rounded-md ${isDark ? "glass" : "border border-gray-200 bg-white"} hover:scale-105 transition`}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Get Started Button (Visible on Mobile) */}
            <div className="hidden lg:block">
              {user ? (
                <Link to="/dashboard" className="px-5 py-2 bg-gradient-to-r from-teal-400 to-cyan-300 text-black rounded-xl font-semibold shadow hover:scale-[1.02] transition">Dashboard</Link>
              ) : (
                <Link to="/auth" className="px-5 py-2 bg-gradient-to-r from-teal-400 to-cyan-300 text-black rounded-xl font-semibold shadow hover:scale-[1.02] transition">Get Started</Link>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar Menu - Touch Optimized */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen
            ? 'translate-x-0 opacity-100 backdrop-blur-sm'
            : 'translate-x-full opacity-0 pointer-events-none backdrop-blur-0'
          } ${isDark
            ? "bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900/90 border-l border-white/10"
            : "bg-gradient-to-b from-white via-white/95 to-white/90 border-l border-gray-200"
          } shadow-2xl`}
      >
        {/* Header with close button */}
        <div className="flex justify-end items-center p-6 border-b border-white/10">
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            className={`p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${isDark
                ? "bg-gray-800/80 hover:bg-gray-700/80 hover:shadow-lg hover:shadow-gray-800/50 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 hover:shadow-lg hover:shadow-gray-300/50 text-gray-700"
              }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Menu Items Container */}
        <div className="flex flex-col p-8 space-y-4">
          {/* Features Menu Item */}
          <div className="relative">
            <a
              href="#features"
              onClick={(e) => handleNavigation(e, 'features')}
              onTouchStart={() => handleTouchStart('features')}
              onTouchEnd={handleTouchEnd}
              className={`menu-item flex items-center py-4 px-5 rounded-xl transition-all duration-300 relative overflow-hidden ${touchActiveId === 'features' ? 'touch-active' : ''
                } ${isDark
                  ? "bg-gray-800/30 text-gray-200 hover:bg-gray-800/50 hover:text-teal-300"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/10 to-teal-400/0 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

              <div className={`mr-4 p-2.5 rounded-lg transition-all duration-300 menu-item-icon ${isDark
                  ? "bg-teal-400/10"
                  : "bg-teal-100"
                }`}>
                <BarChart3 className={`h-5 w-5 transition-all duration-300 menu-item-icon-inner ${isDark
                    ? "text-teal-300"
                    : "text-teal-600"
                  }`} />
              </div>

              <span className="text-lg font-medium transition-all duration-300 menu-item-text flex-1">
                Features
              </span>

              <ArrowRight className={`h-4 w-4 transition-all duration-300 menu-item-arrow ${isDark ? "text-teal-300" : "text-teal-500"
                }`} />
            </a>
          </div>

          {/* How it works Menu Item */}
          <div className="relative">
            <a
              href="#how"
              onClick={(e) => handleNavigation(e, 'how')}
              onTouchStart={() => handleTouchStart('how')}
              onTouchEnd={handleTouchEnd}
              className={`menu-item flex items-center py-4 px-5 rounded-xl transition-all duration-300 relative overflow-hidden ${touchActiveId === 'how' ? 'touch-active' : ''
                } ${isDark
                  ? "bg-gray-800/30 text-gray-200 hover:bg-gray-800/50 hover:text-cyan-300"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-cyan-600"
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

              <div className={`mr-4 p-2.5 rounded-lg transition-all duration-300 menu-item-icon ${isDark
                  ? "bg-cyan-400/10"
                  : "bg-cyan-100"
                }`}>
                <Cpu className={`h-5 w-5 transition-all duration-300 menu-item-icon-inner ${isDark
                    ? "text-cyan-300"
                    : "text-cyan-600"
                  }`} />
              </div>

              <span className="text-lg font-medium transition-all duration-300 menu-item-text flex-1">
                How it works
              </span>

              <ArrowRight className={`h-4 w-4 transition-all duration-300 menu-item-arrow ${isDark ? "text-cyan-300" : "text-cyan-500"
                }`} />
            </a>
          </div>

          {/* Why Us Menu Item */}
          <div className="relative">
            <a
              href="#why"
              onClick={(e) => handleNavigation(e, 'why')}
              onTouchStart={() => handleTouchStart('why')}
              onTouchEnd={handleTouchEnd}
              className={`menu-item flex items-center py-4 px-5 rounded-xl transition-all duration-300 relative overflow-hidden ${touchActiveId === 'why' ? 'touch-active' : ''
                } ${isDark
                  ? "bg-gray-800/30 text-gray-200 hover:bg-gray-800/50 hover:text-emerald-300"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-emerald-600"
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/10 to-emerald-400/0 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

              <div className={`mr-4 p-2.5 rounded-lg transition-all duration-300 menu-item-icon ${isDark
                  ? "bg-emerald-400/10"
                  : "bg-emerald-100"
                }`}>
                <ShieldCheck className={`h-5 w-5 transition-all duration-300 menu-item-icon-inner ${isDark
                    ? "text-emerald-300"
                    : "text-emerald-600"
                  }`} />
              </div>

              <span className="text-lg font-medium transition-all duration-300 menu-item-text flex-1">
                Why Us
              </span>

              <ArrowRight className={`h-4 w-4 transition-all duration-300 menu-item-arrow ${isDark ? "text-emerald-300" : "text-emerald-500"
                }`} />
            </a>
          </div>

          {/* FAQ Menu Item */}
          <div className="relative">
            <a
              href="#faq"
              onClick={(e) => handleNavigation(e, 'faq')}
              onTouchStart={() => handleTouchStart('faq')}
              onTouchEnd={handleTouchEnd}
              className={`menu-item flex items-center py-4 px-5 rounded-xl transition-all duration-300 relative overflow-hidden ${touchActiveId === 'faq' ? 'touch-active' : ''
                } ${isDark
                  ? "bg-gray-800/30 text-gray-200 hover:bg-gray-800/50 hover:text-purple-300"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/10 to-purple-400/0 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

              <div className={`mr-4 p-2.5 rounded-lg transition-all duration-300 menu-item-icon ${isDark
                  ? "bg-purple-400/10"
                  : "bg-purple-100"
                }`}>
                <Lightbulb className={`h-5 w-5 transition-all duration-300 menu-item-icon-inner ${isDark
                    ? "text-purple-300"
                    : "text-purple-600"
                  }`} />
              </div>

              <span className="text-lg font-medium transition-all duration-300 menu-item-text flex-1">
                FAQ
              </span>

              <ArrowRight className={`h-4 w-4 transition-all duration-300 menu-item-arrow ${isDark ? "text-purple-300" : "text-purple-500"
                }`} />
            </a>
          </div>

          {/* CTA Button */}
          <div className="pt-6 mt-4 border-t border-white/10">
            {user ? (
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-teal-400 to-cyan-300 text-black rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-teal-300/20"
              >
                <span className="flex items-center gap-2">
                  Dashboard
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 hover:translate-x-1" />
                </span>
              </Link>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-teal-400 to-cyan-300 text-black rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-teal-300/20"
              >
                <span className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 hover:translate-x-1" />
                </span>
              </Link>
            )}
          </div>

          {/* Theme toggle */}
          {/* Theme toggle - Mobile Menu में */}
          <div className={`pt-6 mt-6 border-t border-white/10 flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 ${isDark ? "bg-gray-800/40 hover:bg-gray-800/60" : "bg-gray-50 hover:bg-gray-100"
            }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isDark ? "bg-yellow-400/10" : "bg-yellow-100"}`}>
                {isDark ?
                  <Sun className="h-4 w-4 text-yellow-300" /> :
                  <Moon className="h-4 w-4 text-blue-600" />
                }
              </div>
              <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                {isDark ? "Dark Mode" : "Light Mode"}
              </span>
            </div>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`relative w-14 h-7 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${isDark
                  ? "bg-gradient-to-r from-gray-700 to-gray-800"
                  : "bg-gradient-to-r from-gray-300 to-gray-400"
                }`}
            >
              

              {/* Thumb/knob with centered icon */}
              <div className={`absolute top-1/2 w-5 h-5 rounded-full transition-all duration-300 transform -translate-y-1/2 flex items-center justify-center ${isDark
                  ? "bg-yellow-300 left-[calc(100%-1.25rem)]"  // Right side for dark mode
                  : "bg-blue-500 left-1"  // Left side for light mode
                }`}>
                {isDark ?
                  <Sun className="h-2.5 w-2.5 text-gray-800" /> :
                  <Moon className="h-2.5 w-2.5 text-white" />
                }
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-all duration-300 animate-fadeIn"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content Container (No scroll-snap) */}
      <div
        className="pt-[120px] pb-12"
        role="main"
      >
        {/* HERO */}
        <section id="hero" className="min-h-[calc(100vh-120px)] flex items-center" aria-label="Hero">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 lg:py-0">
              <div data-aos="fade-right" className="lg:col-span-6 space-y-6">
                <div className={`${isDark ? "bg-gradient-to-r from-teal-500/10 to-cyan-400/5 text-teal-200 glass" : "bg-teal-50 text-teal-700 border border-teal-100"} inline-flex items-center gap-3 px-3 py-1 rounded-full text-sm`}>
                  <span className="font-semibold">New</span>
                  <span className={`${t.sub} text-xs`}>AI-assisted repo scoring • Secure & private</span>
                </div>

                <h1 className={`text-5xl md:text-6xl font-extrabold leading-tight ${t.heading}`}>
                  Discover your{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-cyan-300">Developer Potential</span>
                </h1>

                <p className={`${isDark ? "text-xl md:text-2xl text-gray-300" : "text-lg md:text-xl text-gray-700"} max-w-2xl`}>
                  Deep analysis across GitHub, LinkedIn, blogs and coding platforms — actionable insights, growth steps, and a single Developer Score to showcase your impact.
                </p>

                <div className="flex flex-wrap gap-4 items-center mt-6">
                  {user ? (
                    <Link to="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-400 to-cyan-300 text-black rounded-lg font-semibold shadow hover:scale-[1.02] transition">
                      Go to Dashboard <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <Link to="/auth" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-400 to-cyan-300 text-black rounded-lg font-semibold shadow hover:scale-[1.02] transition">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>

                {/* feature bullets */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4">
                    <div className={`rounded-md p-3 ${isDark ? "glass" : "bg-white"} w-16 h-16 flex items-center justify-center`}>
                      <Cpu className={`w-6 h-6 ${isDark ? "text-teal-300" : "text-teal-600"}`} />
                    </div>
                    <div>
                      <div className="text-base font-semibold">AI Insights</div>
                      <div className={`${t.muted} text-sm`}>Smart repo & content suggestions</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`rounded-md p-3 ${isDark ? "glass" : "bg-white"} w-16 h-16 flex items-center justify-center`}>
                      <ShieldCheck className={`w-6 h-6 ${isDark ? "text-teal-300" : "text-teal-600"}`} />
                    </div>
                    <div>
                      <div className="text-base font-semibold">Privacy First</div>
                      <div className={`${t.muted} text-sm`}>Service role key never exposed</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:col-span-2 lg:col-span-1">
                    <div className={`rounded-md p-3 ${isDark ? "glass" : "bg-white"} w-16 h-16 flex items-center justify-center`}>
                      <Zap className={`w-6 h-6 ${isDark ? "text-teal-300" : "text-teal-600"}`} />
                    </div>
                    <div>
                      <div className="text-base font-semibold">Fast Reports</div>
                      <div className={`${t.muted} text-sm`}>Generated via secure serverless API</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right preview card (Hidden on small screens, shown on tablet/desktop) */}
              <div data-aos="fade-left" className="lg:col-span-6 hidden md:block relative">
                <div className="absolute -right-20 -top-24 w-96 h-96 rounded-full bg-gradient-to-br from-teal-400/12 to-cyan-400/10 blur-3xl pointer-events-none" />
                <div className="absolute -left-28 bottom-8 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/8 to-pink-400/8 blur-3xl pointer-events-none" />

                <div className={`mx-auto max-w-xl transform hover:scale-[1.01] transition shadow-2xl rounded-2xl p-6 ${isDark ? "glass-strong" : "bg-white"} float-slow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className={`${t.muted} text-xs uppercase`}>Developer Report</div>
                      <div className={`text-lg font-semibold ${t.heading}`}>Overall score • 82</div>
                    </div>
                    <div className="text-right">
                      <div className={`${t.muted} text-sm`}>Generated</div>
                      <div className={`${t.muted} text-xs`}>Today • 12:32</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className={`rounded-lg p-3 ${isDark ? "glass" : "bg-gray-50"}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Github className={`${isDark ? "text-gray-200" : "text-gray-700"} w-5 h-5`} />
                          <div className="text-sm font-semibold">GitHub</div>
                        </div>
                        <div className="text-sm font-bold text-teal-400">88</div>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-teal-400 to-cyan-400" style={{ width: "88%" }} />
                      </div>
                    </div>

                    <div className={`rounded-lg p-3 ${isDark ? "glass" : "bg-gray-50"}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Linkedin className={`${isDark ? "text-gray-200" : "text-gray-700"} w-5 h-5`} />
                          <div className="text-sm font-semibold">LinkedIn</div>
                        </div>
                        <div className="text-sm font-bold text-emerald-300">76</div>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-400 to-sky-400" style={{ width: "76%" }} />
                      </div>
                    </div>

                    <div className={`rounded-lg p-3 ${isDark ? "glass" : "bg-gray-50"}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className={`${isDark ? "text-gray-200" : "text-gray-700"} w-5 h-5`} />
                          <div className="text-sm font-semibold">Blog</div>
                        </div>
                        <div className="text-sm font-bold text-cyan-300">70</div>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-teal-300" style={{ width: "70%" }} />
                      </div>
                    </div>

                    <div className={`rounded-lg p-3 ${isDark ? "glass" : "bg-gray-50"}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Code className={`${isDark ? "text-gray-200" : "text-gray-700"} w-5 h-5`} />
                          <div className="text-sm font-semibold">Coding</div>
                        </div>
                        <div className="text-sm font-bold text-teal-400">84</div>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-teal-400 to-emerald-300" style={{ width: "84%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className={`${t.muted} text-xs`}>Analyze more repos for better accuracy</div>
                    <div className="text-sm font-semibold text-teal-300">View Details →</div>
                  </div>
                </div>

                {/* Floating small stat cards */}
                <div
                  className={`absolute -left-6 -top-14 w-44 p-3 rounded-xl hidden lg:block
                    ${isDark ? "glass bg-black/30" : "bg-white"}
                    shadow-lg
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-md p-2 bg-gradient-to-br from-teal-400 to-cyan-300">
                      <Github className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <div className={`text-xs ${isDark ? "text-white" : "text-gray-900"}`}>
                        Commits
                      </div>
                      <div className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                        1,234
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`absolute -right-4 bottom-[-45px] w-44 p-3 rounded-xl hidden lg:block
                    ${isDark ? "bg-[#0b1220] shadow-xl" : "bg-white shadow-lg"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <div className={`text-xs ${isDark ? "text-white" : "text-gray-900"}`}>
                        Coding Score
                      </div>
                      <div className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                        84 / 100
                      </div>
                    </div>

                    <div className="ml-auto">
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full
                          ${isDark ? "bg-black/10" : "bg-gray-100"}
                        `}
                      >
                        <Code className="w-4 h-4 text-teal-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-20 lg:py-24" aria-label="Features">
          <div data-aos="fade-in" className="max-w-7xl mx-auto px-6 w-full">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
              <h2 className={`text-3xl md:text-4xl font-semibold ${t.heading}`}>What DevScore analyzes</h2>
              <button onClick={() => setShowDocPopup(true)} className={`hidden sm:block ${isDark ? "glass" : "bg-white border border-gray-200"} px-3 py-2 rounded-lg hover:scale-105 transition`}>Documentation</button>
            </div>

            {/* Layout: Optimised for all screen sizes */}
            <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                { icon: <Github className="h-6 w-6" />, title: "GitHub Activity", desc: "Repos, stars, commit patterns, PR cadence and code health." },
                { icon: <Linkedin className="h-6 w-6" />, title: "LinkedIn Network", desc: "Profile completeness, endorsements, engagement and network growth." },
                { icon: <FileText className="h-6 w-6" />, title: "Technical Blog", desc: "Post frequency, content depth, readability and reach." },
                { icon: <Code className="h-6 w-6" />, title: "Coding Platforms", desc: "Problems solved, ranks, contest performance and streaks." },
              ].map((f, i) => (
                <article key={i} className={`shine-effect card-glow-hover ${isDark ? "glass border border-white/5" : "bg-white border border-gray-100"} rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition`}>
                  <div className="flex flex-col gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isDark ? "bg-gradient-to-br from-teal-400/20 to-cyan-300/10" : "bg-gradient-to-br from-cyan-200 to-teal-200"}`}>{f.icon}</div>
                    <div>
                      <h3 className={`text-xl font-semibold ${t.heading}`}>{f.title}</h3>
                    </div>
                  </div>
                  <p className={`${t.sub} text-sm md:text-base mt-2`}>{f.desc}</p>
                  <div className={`${t.muted} text-xs mt-4`}>Included in every report • Fast analysis</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW */}
        <section id="how" className="py-20 lg:py-24" aria-label="How it works">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right" className="space-y-6">
                <h2 className={`text-3xl md:text-4xl font-semibold ${t.heading}`}>How it works</h2>
                <p className={`${t.sub} text-lg max-w-xl`}>
                  DevScore combines heuristics and heuristic-augmented AI to evaluate developer profiles. The scoring logic runs server-side using a secure service key — only the final reports are stored in your account.
                </p>

                <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                  {/* Animated connector line (Hidden on small screens) */}
                  <div className={`absolute top-1/2 left-0 right-0 h-px transform -translate-y-1/2 ${isDark ? "bg-white/10" : "bg-gray-200"} hidden sm:block`} />
                  <div className={`absolute top-1/2 left-1/3 right-1/3 h-px transform -translate-y-1/2 ${isDark ? "bg-teal-400/50" : "bg-teal-500/50"} z-10 transition-all duration-1000 hidden sm:block`} style={{ width: "calc(100% / 3)" }}></div>

                  <div className="z-20">
                    <div className={`p-4 rounded-md text-center ${isDark ? "glass-strong border border-white/10" : "bg-white border border-gray-100"} shadow-xl transform hover:-translate-y-1 transition`}>
                      <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-300 shadow-lg">
                        <Users className="w-5 h-5 text-black" />
                      </div>
                      <div className="font-semibold text-lg mt-1">1. Connect</div>
                      <div className={`${t.muted} text-sm mt-1`}>Signup & link profile accounts</div>
                    </div>
                  </div>

                  <div className="z-20">
                    <div className={`p-4 rounded-md text-center ${isDark ? "glass-strong border border-white/10" : "bg-white border border-gray-100"} shadow-xl transform hover:-translate-y-1 transition`}>
                      <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-300 shadow-lg">
                        <Cpu className="w-5 h-5 text-black" />
                      </div>
                      <div className="font-semibold text-lg mt-1">2. Analyze</div>
                      <div className={`${t.muted} text-sm mt-1`}>Secure server-side scoring logic</div>
                    </div>
                  </div>

                  <div className="z-20">
                    <div className={`p-4 rounded-md text-center ${isDark ? "glass-strong border border-white/10" : "bg-white border border-gray-100"} shadow-xl transform hover:-translate-y-1 transition`}>
                      <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-300 shadow-lg">
                        <Zap className="w-5 h-5 text-black" />
                      </div>
                      <div className="font-semibold text-lg mt-1">3. Improve</div>
                      <div className={`${t.muted} text-sm mt-1`}>Actionable tips & goal tracking</div>
                    </div>
                  </div>
                </div>
              </div>

              <div data-aos="fade-left" className={`h-full flex items-center justify-center mt-10 lg:mt-0`}>
                <div className={`p-8 rounded-2xl shadow-2xl w-full max-w-sm ${isDark ? "glass-strong border border-white/10" : "bg-white border border-gray-100"}`}>
                  <div className="text-center">
                    <div className={`${t.muted} text-xs uppercase font-bold`}>Free Access</div>
                    <div className={`text-4xl font-extrabold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-300`}>$0.00</div>
                    <div className={`text-xl font-semibold ${t.heading} mt-2`}>Start Your Analysis Today</div>
                    <p className={`${t.muted} text-sm mt-2`}>Get your first developer report and personalized growth plan instantly.</p>
                  </div>
                  <ul className="mt-6 space-y-3 text-left text-sm">
                    <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" /> Full GitHub Scorecard</li>
                    <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" /> LinkedIn Profile Audit</li>
                    <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" /> Basic AI Improvement Plan</li>
                    <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" /> Weekly Score Tracking</li>
                  </ul>
                  <div className="mt-6">
                    <Link to="/auth" className="block text-center px-5 py-3 bg-gradient-to-r from-teal-400 to-cyan-300 text-black rounded-lg font-semibold shadow-md hover:shadow-xl hover:scale-[1.01] transition">
                      Generate Your Free Report
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section id="why" className="py-20 lg:py-24" aria-label="Why choose us">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <h2 data-aos="fade-in" className={`text-3xl md:text-4xl font-semibold mb-12 text-center ${t.heading}`}>The DevScore Advantage</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <BarChart3 className="w-6 h-6 text-teal-300" />, title: "Accurate & Actionable", desc: "We don't just give a number — we provide clear, personalized steps to improve your profile and career growth.", animationDelay: "0s" },
                { icon: <ShieldCheck className="w-6 h-6 text-cyan-300" />, title: "Zero-Exposure Security", desc: "All sensitive scoring and API calls use secure, server-side architecture (Vercel Functions), ensuring your keys are never exposed.", animationDelay: "0.15s" },
                { icon: <Lightbulb className="w-6 h-6 text-yellow-300" />, title: "AI-Powered Insights", desc: "Leverage heuristic-augmented AI to identify undervalued projects and suggest optimized documentation and coding improvements.", animationDelay: "0.3s" },
              ].map((item, i) => (
                <div
                  key={i}
                  data-aos={i % 2 === 0 ? "fade-up" : "fade-down"}
                  className={`shine-effect card-glow-hover ${isDark ? "glass border border-white/5" : "bg-white border border-gray-100"} rounded-2xl p-8 shadow-xl hover:-translate-y-2 transition-all duration-500`}
                  style={{ transitionDelay: item.animationDelay }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r from-teal-500/10 to-cyan-500/10">
                    {item.icon}
                  </div>
                  <h3 className={`text-xl font-bold ${t.heading} mb-3`}>{item.title}</h3>
                  <p className={`${t.sub}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUSTED BY DEVELOPERS WORLDWIDE (Restored and made responsive) */}
        <section id="trusted" className="py-20 lg:py-24" aria-label="Trusted by developers worldwide">
          <div className="max-w-7xl mx-auto px-6 w-full text-center">
            <h2 data-aos="fade-in" className={`text-3xl md:text-4xl font-semibold mb-12 ${t.heading}`}>Trusted by developers worldwide</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center">
              {/* Company Logos (Responsive Grid) */}
              {['Meta', 'Amazon', 'Google', 'Stripe', 'OpenAI', 'Netflix'].map((company, index, arr) => {
                const half = Math.ceil(arr.length / 2)

                return (
                  <div data-aos={index < half ? 'fade-right' : 'fade-left'} key={index} className={`p-4 rounded-xl ${isDark ? "glass" : "bg-white"} flex justify-center items-center h-16 opacity-70 hover:opacity-100 transition duration-300`}>
                    <span className={`text-2xl font-bold ${t.muted}`}>{company}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-20 lg:py-24" aria-label="FAQ">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <h2 data-aos="fade-in" className={`text-3xl md:text-4xl font-semibold mb-12 text-center ${t.heading}`}>Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FAQItem question="How is the Developer Score calculated?" answer="The score is a complex, weighted combination of GitHub activity (commits, stars, code quality), LinkedIn presence (experience, endorsements), blogging metrics, and competitive coding performance. The algorithm is proprietary and uses heuristic-augmented AI." isDark={isDark} />
                <FAQItem question="Is my data safe and private?" answer="Yes — our architecture is designed for security. All sensitive operations, scoring, and third-party API calls run server-side using secure serverless functions and Supabase Row Level Security (RLS). Service role keys are never exposed in the browser." isDark={isDark} />
                <FAQItem question="What platforms do you connect to?" answer="Currently, we support in-depth analysis for GitHub, LinkedIn, and we offer optional analysis for custom technical blogs/portfolios and major coding platforms (e.g., LeetCode, HackerRank profiles)." isDark={isDark} />
                <FAQItem question="How long does it take to generate a report?" answer="Initial report generation is instantaneous once you provide your necessary profile links. Subsequent analysis updates typically complete within seconds due to efficient serverless processing." isDark={isDark} />
              </div>
              <div className="space-y-4">
                <FAQItem question="Is DevScore entirely free to use?" answer="Basic reports and core score tracking features are completely free. We plan to introduce premium tiers in the future for advanced features like in-depth AI goal setting, personalized technical writing reviews, and priority report generation." isDark={isDark} />
                <FAQItem question="Can I share my DevScore with recruiters or employers?" answer="Yes, the dashboard includes a feature to generate a shareable, verifiable link to your current Developer Score and key metric summaries. This is perfect for job applications and portfolio sites." isDark={isDark} />
                <FAQItem question="Can I export my reports?" answer="Currently, reports are viewable and shareable via a link. PDF and CSV export functionality for detailed reports and historical data is planned for the next major release." isDark={isDark} />
                <FAQItem question="I'm a new developer, will my score be low?" answer="The score is relative to your activity and progress. DevScore provides specific, achievable goals for beginners to increase their score quickly, focusing on fundamental public profile best practices." isDark={isDark} />
              </div>
            </div>
          </div>
        </section>

        {/* CTA & FOOTER */}
        <footer id="docs" className="py-12" aria-label="Call to action and footer">
          <div className="max-w-7xl mx-auto px-6 w-full">
            {/* CTA Box */}
            <div className={`py-16 text-center rounded-3xl mb-16 shadow-2xl ${isDark ? "bg-gray-800/70 border border-white/10" : "bg-white border border-gray-100"} transform hover:scale-[1.005] transition`}>
              <h2 data-aos="fade-in" className="text-4xl md:text-5xl font-extrabold mb-4">Ready to discover your developer score?</h2>
              <p data-aos="fade-out" className={`${t.sub} text-lg max-w-2xl mx-auto mb-8`}>Stop guessing where you stand. Get your personalized report and improvement plan in under 60 seconds.</p>
              {!user && (
                <Link data-aos="zoom-in" to="/auth" className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-400 to-cyan-300 text-black rounded-lg font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition">Get Started Free</Link>
              )}
            </div>

            {/* Footer Content */}
            <div className={`border-t ${isDark ? "border-white/6" : "border-gray-200"} pt-10`}>
              <div data-aos="fade-up" className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-md p-2 bg-gradient-to-br from-teal-400/20 to-cyan-300/10">
                      <BarChart3 className="h-6 w-6 text-teal-300" />
                    </div>
                    <div>
                      <div className="font-semibold">DevScore</div>
                      <div className={`${t.muted} text-sm`}>Analyze. Improve. Grow.</div>
                    </div>
                  </div>
                  
                  <div className={`${t.muted} mt-6 text-xs`}>© {new Date().getFullYear()} DevScore — All rights reserved.</div>
                </div>

                <div className="flex gap-4">
                  <a className={`${t.muted} text-sm hover:text-teal-300 transition`} href="https://github.com/iTusharyadav" target="_blank" rel="noreferrer">GitHub</a>
                  <a className={`${t.muted} text-sm hover:text-teal-300 transition`} href="https://www.linkedin.com/login" target="_blank" rel="noreferrer">LinkedIn</a>
                  <a className={`${t.muted} text-sm hover:text-teal-300 transition`} href="https://github.com/iTusharyadav/proofolio/blob/main/README.md" target="_blank" rel="noreferrer">Docs</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Documentation popup */}
      {showDocPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-4">
          <div className={`${isDark ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-white"} rounded-xl p-6 w-full max-w-md shadow-xl ${isDark ? "glass-strong" : ""}`}>
            <button onClick={() => setShowDocPopup(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
            <h3 className={`text-lg font-semibold ${t.heading}`}>Documentation — Coming Soon 🚀</h3>
            <p className={`${t.sub} text-sm mt-2`}>We're building a documentation hub with API references, onboarding guides and contribution guidelines.</p>

            <div className="mt-4 flex gap-2">
              <a className="px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-300 text-black rounded-md" href="/docs">View Docs (Soon)</a>
              <button onClick={() => setShowDocPopup(false)} className={`px-4 py-2 rounded-md ${isDark ? "border border-white/6" : "border border-gray-200"}`}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;