import React from "react";
import { useTheme } from "../../contexts/ThemeContext";


export const TrustSection: React.FC = () => {
  const { t, isDark } = useTheme();

  return(
    <section
      id="trusted"
      className="py-20 lg:py-24 fade-in"
      aria-label="Trusted by developers worldwide"
    >
      <div className="max-w-7xl mx-auto px-6 w-full text-center">
        <h2 className={`text-3xl md:text-4xl font-semibold mb-12 ${t.heading}`}>
          Trusted by developers worldwide
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center">
          <div
            className={`p-4 rounded-xl ${
              isDark ? "glass" : "bg-white"
            } flex justify-center items-center h-16 opacity-70 hover:opacity-100 transition duration-300`}
          >
            <span className={`text-2xl font-bold ${t.muted}`}>Meta</span>
          </div>
          <div
            className={`p-4 rounded-xl ${
              isDark ? "glass" : "bg-white"
            } flex justify-center items-center h-16 opacity-70 hover:opacity-100 transition duration-300`}
          >
            <span className={`text-2xl font-bold ${t.muted}`}>Amazon</span>
          </div>
          <div
            className={`p-4 rounded-xl ${
              isDark ? "glass" : "bg-white"
            } flex justify-center items-center h-16 opacity-70 hover:opacity-100 transition duration-300`}
          >
            <span className={`text-2xl font-bold ${t.muted}`}>Google</span>
          </div>
          <div
            className={`p-4 rounded-xl ${
              isDark ? "glass" : "bg-white"
            } flex justify-center items-center h-16 opacity-70 hover:opacity-100 transition duration-300`}
          >
            <span className={`text-2xl font-bold ${t.muted}`}>Stripe</span>
          </div>
          <div
            className={`p-4 rounded-xl ${
              isDark ? "glass" : "bg-white"
            } flex justify-center items-center h-16 opacity-70 hover:opacity-100 transition duration-300`}
          >
            <span className={`text-2xl font-bold ${t.muted}`}>OpenAI</span>
          </div>
          <div
            className={`p-4 rounded-xl ${
              isDark ? "glass" : "bg-white"
            } flex justify-center items-center h-16 opacity-70 hover:opacity-100 transition duration-300`}
          >
            <span className={`text-2xl font-bold ${t.muted}`}>Netflix</span>
          </div>
        </div>
      </div>
    </section>
  )
}