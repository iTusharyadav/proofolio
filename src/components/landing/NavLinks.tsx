import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { ArrowRight, BarChart3, Cpu, Lightbulb, Menu, Moon, ShieldCheck, Sun, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export function NavLinks(){
  const HEADER_HEIGHT = 88; // px - adjust if you change header padding
  const { t, isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  // Track touch active state
  const [touchActiveId, setTouchActiveId] = useState<string | null>(null);
  // Mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle touch events for mobile menu items
  const handleTouchStart = (id: string) => {
    setTouchActiveId(id);
  };
  
  const handleTouchEnd = () => {
    setTimeout(() => setTouchActiveId(null), 150);
  };
  
  const NavLinks = () => (
    <>
      <li>
        <a
          href="#features"
          onClick={(e) => handleNavigation(e, "features")}
          className={`${
            isDark
              ? "text-gray-200 hover:text-teal-300"
              : "text-gray-700 hover:text-teal-600"
          } transition`}
        >
          Features
        </a>
      </li>
      <li>
        <a
          href="#how"
          onClick={(e) => handleNavigation(e, "how")}
          className={`${
            isDark
              ? "text-gray-200 hover:text-teal-300"
              : "text-gray-700 hover:text-teal-600"
          } transition`}
        >
          How it works
        </a>
      </li>
      <li>
        <a
          href="#why"
          onClick={(e) => handleNavigation(e, "why")}
          className={`${
            isDark
              ? "text-gray-200 hover:text-teal-300"
              : "text-gray-700 hover:text-teal-600"
          } transition`}
        >
          Why Us
        </a>
      </li>
      <li>
        <a
          href="#faq"
          onClick={(e) => handleNavigation(e, "faq")}
          className={`${
            isDark
              ? "text-gray-200 hover:text-teal-300"
              : "text-gray-700 hover:text-teal-600"
          } transition`}
        >
          FAQ
        </a>
      </li>
    </>
  );

  // Helper function for smooth scrolling and closing mobile menu
  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - HEADER_HEIGHT;
      window.scrollTo({
        top: offsetTop > 0 ? offsetTop : 0,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  return(
    <>
      {/* Centered rounded navbar (single nav) */}
      <header className="fixed top-6 left-0 w-full z-50 flex justify-center">
        <nav
          className={`nav-outline pointer-events-auto ${
            isDark ? "bg-neutral-900/80" : "bg-white/95"
          } backdrop-blur-md rounded-3xl px-4 sm:px-8 py-3 flex items-center justify-between w-[95%] max-w-6xl transition-all duration-300`}
          role="navigation"
          aria-label="Main Navigation"
        >
          <Link to="/" className="flex items-center gap-3">
            <div
              className={`${
                isDark
                  ? "bg-gradient-to-br from-teal-400/30 to-cyan-400/20"
                  : "bg-gradient-to-br from-cyan-200/40 to-teal-200/30"
              } rounded-lg p-2 shadow`}
            >
              <BarChart3
                className={`${isDark ? "text-teal-300" : "text-teal-700"} h-6 w-6`}
              />
            </div>
            <div>
              <div className={`font-semibold leading-none ${t.heading}`}>
                DevScore
              </div>
              <div
                className={`text-xs ${t.muted} -mt-0.5 hidden sm:block`}
              >
                Developer Profile Analyzer
              </div>
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
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                isDark ? "glass" : "border border-gray-200 bg-white"
              } hover:scale-105 transition`}
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-yellow-300" />
              ) : (
                <Moon className="h-4 w-4 text-sky-600" />
              )}
              <span className="hidden sm:inline text-sm">
                {isDark ? "" : ""}
              </span>
            </button>
    
            {/* Hamburger Menu Toggle (Visible on Mobile) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden px-3 py-2 rounded-md ${
                isDark ? "glass" : "border border-gray-200 bg-white"
              } hover:scale-105 transition`}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
    
            {/* Get Started Button (Visible on Mobile) */}
            <div className="hidden lg:block">
              {user ? (
                <Link
                  to="/dashboard"
                  className="px-5 py-2 bg-gradient-to-r from-teal-400 to-cyan-300 text-black rounded-xl font-semibold shadow hover:scale-[1.02] transition"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/auth"
                  className="px-5 py-2 bg-gradient-to-r from-teal-400 to-cyan-300 text-black rounded-xl font-semibold shadow hover:scale-[1.02] transition"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
    
      {/* Mobile Sidebar Menu - Touch Optimized */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "translate-x-0 opacity-100 backdrop-blur-sm"
            : "translate-x-full opacity-0 pointer-events-none backdrop-blur-0"
        } ${
          isDark
            ? "bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900/90 border-l border-white/10"
            : "bg-gradient-to-b from-white via-white/95 to-white/90 border-l border-gray-200"
        } shadow-2xl`}
      >
        {/* Header with close button */}
        <div className="flex justify-end items-center p-6 border-b border-white/10">
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            className={`p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
              isDark
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
              onClick={(e) => handleNavigation(e, "features")}
              onTouchStart={() => handleTouchStart("features")}
              onTouchEnd={handleTouchEnd}
              className={`menu-item flex items-center py-4 px-5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                touchActiveId === "features" ? "touch-active" : ""
              } ${
                isDark
                  ? "bg-gray-800/30 text-gray-200 hover:bg-gray-800/50 hover:text-teal-300"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-teal-600"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/10 to-teal-400/0 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
    
              <div
                className={`mr-4 p-2.5 rounded-lg transition-all duration-300 menu-item-icon ${
                  isDark ? "bg-teal-400/10" : "bg-teal-100"
                }`}
              >
                <BarChart3
                  className={`h-5 w-5 transition-all duration-300 menu-item-icon-inner ${
                    isDark ? "text-teal-300" : "text-teal-600"
                  }`}
                />
              </div>
    
              <span className="text-lg font-medium transition-all duration-300 menu-item-text flex-1">
                Features
              </span>
    
              <ArrowRight
                className={`h-4 w-4 transition-all duration-300 menu-item-arrow ${
                  isDark ? "text-teal-300" : "text-teal-500"
                }`}
              />
            </a>
          </div>
    
          {/* How it works Menu Item */}
          <div className="relative">
            <a
              href="#how"
              onClick={(e) => handleNavigation(e, "how")}
              onTouchStart={() => handleTouchStart("how")}
              onTouchEnd={handleTouchEnd}
              className={`menu-item flex items-center py-4 px-5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                touchActiveId === "how" ? "touch-active" : ""
              } ${
                isDark
                  ? "bg-gray-800/30 text-gray-200 hover:bg-gray-800/50 hover:text-cyan-300"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-cyan-600"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
    
              <div
                className={`mr-4 p-2.5 rounded-lg transition-all duration-300 menu-item-icon ${
                  isDark ? "bg-cyan-400/10" : "bg-cyan-100"
                }`}
              >
                <Cpu
                  className={`h-5 w-5 transition-all duration-300 menu-item-icon-inner ${
                    isDark ? "text-cyan-300" : "text-cyan-600"
                  }`}
                />
              </div>
    
              <span className="text-lg font-medium transition-all duration-300 menu-item-text flex-1">
                How it works
              </span>
    
              <ArrowRight
                className={`h-4 w-4 transition-all duration-300 menu-item-arrow ${
                  isDark ? "text-cyan-300" : "text-cyan-500"
                }`}
              />
            </a>
          </div>
    
          {/* Why Us Menu Item */}
          <div className="relative">
            <a
              href="#why"
              onClick={(e) => handleNavigation(e, "why")}
              onTouchStart={() => handleTouchStart("why")}
              onTouchEnd={handleTouchEnd}
              className={`menu-item flex items-center py-4 px-5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                touchActiveId === "why" ? "touch-active" : ""
              } ${
                isDark
                  ? "bg-gray-800/30 text-gray-200 hover:bg-gray-800/50 hover:text-emerald-300"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-emerald-600"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/10 to-emerald-400/0 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
    
              <div
                className={`mr-4 p-2.5 rounded-lg transition-all duration-300 menu-item-icon ${
                  isDark ? "bg-emerald-400/10" : "bg-emerald-100"
                }`}
              >
                <ShieldCheck
                  className={`h-5 w-5 transition-all duration-300 menu-item-icon-inner ${
                    isDark ? "text-emerald-300" : "text-emerald-600"
                  }`}
                />
              </div>
    
              <span className="text-lg font-medium transition-all duration-300 menu-item-text flex-1">
                Why Us
              </span>
    
              <ArrowRight
                className={`h-4 w-4 transition-all duration-300 menu-item-arrow ${
                  isDark ? "text-emerald-300" : "text-emerald-500"
                }`}
              />
            </a>
          </div>
    
          {/* FAQ Menu Item */}
          <div className="relative">
            <a
              href="#faq"
              onClick={(e) => handleNavigation(e, "faq")}
              onTouchStart={() => handleTouchStart("faq")}
              onTouchEnd={handleTouchEnd}
              className={`menu-item flex items-center py-4 px-5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                touchActiveId === "faq" ? "touch-active" : ""
              } ${
                isDark
                  ? "bg-gray-800/30 text-gray-200 hover:bg-gray-800/50 hover:text-purple-300"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-purple-600"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/10 to-purple-400/0 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
    
              <div
                className={`mr-4 p-2.5 rounded-lg transition-all duration-300 menu-item-icon ${
                  isDark ? "bg-purple-400/10" : "bg-purple-100"
                }`}
              >
                <Lightbulb
                  className={`h-5 w-5 transition-all duration-300 menu-item-icon-inner ${
                    isDark ? "text-purple-300" : "text-purple-600"
                  }`}
                />
              </div>
    
              <span className="text-lg font-medium transition-all duration-300 menu-item-text flex-1">
                FAQ
              </span>
    
              <ArrowRight
                className={`h-4 w-4 transition-all duration-300 menu-item-arrow ${
                  isDark ? "text-purple-300" : "text-purple-500"
                }`}
              />
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
          <div
            className={`pt-6 mt-6 border-t border-white/10 flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
              isDark
                ? "bg-gray-800/40 hover:bg-gray-800/60"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  isDark ? "bg-yellow-400/10" : "bg-yellow-100"
                }`}
              >
                {isDark ? (
                  <Sun className="h-4 w-4 text-yellow-300" />
                ) : (
                  <Moon className="h-4 w-4 text-blue-600" />
                )}
              </div>
              <span
                className={`text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {isDark ? "Dark Mode" : "Light Mode"}
              </span>
            </div>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`relative w-14 h-7 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${
                isDark
                  ? "bg-gradient-to-r from-gray-700 to-gray-800"
                  : "bg-gradient-to-r from-gray-300 to-gray-400"
              }`}
            >
              {/* Thumb/knob with centered icon */}
              <div
                className={`absolute top-1/2 w-5 h-5 rounded-full transition-all duration-300 transform -translate-y-1/2 flex items-center justify-center ${
                  isDark
                    ? "bg-yellow-300 left-[calc(100%-1.25rem)]"
                    : "bg-blue-500 left-1"
                }`}
              >
                {isDark ? (
                  <Sun className="h-2.5 w-2.5 text-gray-800" />
                ) : (
                  <Moon className="h-2.5 w-2.5 text-white" />
                )}
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
    </>
  )
}