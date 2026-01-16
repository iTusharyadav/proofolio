import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Code, FileText, Github, Linkedin, X } from "lucide-react";

export const FeatureSection: React.FC = () => {
  const { isDark, t } = useTheme();
  const [showDocPopup, setShowDocPopup] = useState(false);

  return (
  <>
    <section
      id="features"
      className="py-20 lg:py-24 fade-in"
      aria-label="Features"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
          <h2 className={`text-3xl md:text-4xl font-semibold ${t.heading}`}>
            What DevScore analyzes
          </h2>
          <button
            onClick={() => setShowDocPopup(true)}
            className={`hidden sm:block ${
              isDark ? "glass" : "bg-white border border-gray-200"
            } px-3 py-2 rounded-lg hover:scale-105 transition`}
          >
            Documentation
          </button>
        </div>

        {/* Layout: Optimised for all screen sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {[
            {
              icon: <Github className="h-6 w-6" />,
              title: "GitHub Activity",
              desc: "Repos, stars, commit patterns, PR cadence and code health.",
            },
            {
              icon: <Linkedin className="h-6 w-6" />,
              title: "LinkedIn Network",
              desc: "Profile completeness, endorsements, engagement and network growth.",
            },
            {
              icon: <FileText className="h-6 w-6" />,
              title: "Technical Blog",
              desc: "Post frequency, content depth, readability and reach.",
            },
            {
              icon: <Code className="h-6 w-6" />,
              title: "Coding Platforms",
              desc: "Problems solved, ranks, contest performance and streaks.",
            },
          ].map((f, i) => (
            <article
              key={i}
              className={`shine-effect card-glow-hover ${
                isDark
                  ? "glass border border-white/5"
                  : "bg-white border border-gray-100"
              } rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition`}
            >
              <div className="flex flex-col gap-3">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    isDark
                      ? "bg-gradient-to-br from-teal-400/20 to-cyan-300/10"
                      : "bg-gradient-to-br from-cyan-200 to-teal-200"
                  }`}
                >
                  {f.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-semibold ${t.heading}`}>
                    {f.title}
                  </h3>
                </div>
              </div>
              <p className={`${t.sub} text-sm md:text-base mt-2`}>
                {f.desc}
              </p>
              <div className={`${t.muted} text-xs mt-4`}>
                Included in every report • Fast analysis
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
        {/* Documentation popup */}
      {showDocPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-4">
          <div
            className={`${
              isDark
                ? "bg-gradient-to-br from-gray-900 to-gray-800"
                : "bg-white"
            } rounded-xl p-6 w-full max-w-md shadow-xl ${
              isDark ? "glass-strong" : ""
            }`}
          >
            <button
              onClick={() => setShowDocPopup(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className={`text-lg font-semibold ${t.heading}`}>
              Documentation — Coming Soon 🚀
            </h3>
            <p className={`${t.sub} text-sm mt-2`}>
              We're building a documentation hub with API references, onboarding
              guides and contribution guidelines.
            </p>

            <div className="mt-4 flex gap-2">
              <a
                className="px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-300 text-black rounded-md"
                href="/docs"
              >
                View Docs (Soon)
              </a>
              <button
                onClick={() => setShowDocPopup(false)}
                className={`px-4 py-2 rounded-md ${
                  isDark ? "border border-white/6" : "border border-gray-200"
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
  </>
  )
}