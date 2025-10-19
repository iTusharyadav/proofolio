import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BarChart3, User, LogOut, Menu } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  // 👇 Detect click outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowEmail(false);
      }
    };

    if (showEmail) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmail]);

  const isHome = location.pathname === "/";
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-blue-600 text-white">
            <BarChart3 className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Proofolio
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          {!isHome && (
            <Link
              to="/"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Home
            </Link>
          )}

          {!isDashboard && user && (
            <Link
              to="/dashboard"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Dashboard
            </Link>
          )}

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowEmail((s) => !s)}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <User className="h-4 w-4 text-gray-700 dark:text-gray-200" />
              </button>

              {showEmail && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-md py-2 w-48">
                  <p className="text-sm px-3 py-2 text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700">
                    {user.email ?? "No email"}
                  </p>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left text-sm px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              className="text-sm font-medium bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          )}
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-gray-700 dark:text-gray-200"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-3 space-y-3">
          {!isHome && (
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 dark:text-gray-200 hover:text-blue-600"
            >
              Home
            </Link>
          )}
          {!isDashboard && user && (
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 dark:text-gray-200 hover:text-blue-600"
            >
              Dashboard
            </Link>
          )}
          {user ? (
            <>
              <button
                onClick={() => alert(user.email)}
                className="block text-gray-700 dark:text-gray-200 hover:text-blue-600"
              >
                Account
              </button>
              <button
                onClick={handleSignOut}
                className="block text-red-600 hover:text-red-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              onClick={() => setMenuOpen(false)}
              className="block bg-blue-600 text-white text-center px-3 py-2 rounded-md"
            >
              Get Started
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
