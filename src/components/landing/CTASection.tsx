import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export const CTASection: React.FC = () => {
  const { t, isDark } = useTheme();
  const { user } = useAuth();

  return(
    <section className="py-20" aria-label="Call to action">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div
          className={`py-16 text-center rounded-3xl shadow-2xl ${
            isDark
              ? "bg-gray-800/70 border border-white/10"
              : "bg-white border border-gray-100"
          } transform hover:scale-[1.005] transition`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Ready to discover your developer score?
          </h2>
          <p className={`${t.sub} text-lg max-w-2xl mx-auto mb-8`}>
            Stop guessing where you stand. Get your personalized report and
            improvement plan in under 60 seconds.
          </p>
          {user ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-400 to-cyan-300 text-black rounded-lg font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition"
            >
              Go to Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-400 to-cyan-300 text-black rounded-lg font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}