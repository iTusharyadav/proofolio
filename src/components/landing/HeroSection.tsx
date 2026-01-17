import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Cpu, FileText, Github, Linkedin, ShieldCheck, Zap } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { isDark, t } = useTheme();
  const { user } = useAuth();

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-120px)] flex items-center"
      aria-label="Hero"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 lg:py-0">
          <div className="lg:col-span-6 space-y-6 fade-in">
            <div
              className={`${
                isDark
                  ? "bg-gradient-to-r from-teal-500/10 to-cyan-400/5 text-teal-200 glass"
                  : "bg-teal-50 text-teal-700 border border-teal-100"
              } inline-flex items-center gap-3 px-3 py-1 rounded-full text-sm`}
            >
              <span className="font-semibold">New</span>
              <span className={`${t.sub} text-xs`}>
                AI-assisted repo scoring • Secure & private
              </span>
            </div>

            <h1
              className={`text-5xl md:text-6xl font-extrabold leading-tight ${t.heading}`}
            >
              Discover your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-cyan-300">
                Developer Potential
              </span>
            </h1>

            <p
              className={`${
                isDark
                  ? "text-xl md:text-2xl text-gray-300"
                  : "text-lg md:text-xl text-gray-700"
              } max-w-2xl`}
            >
              Deep analysis across GitHub, LinkedIn, blogs and coding
              platforms — actionable insights, growth steps, and a single
              Developer Score to showcase your impact.
            </p>

            <div className="flex flex-wrap gap-4 items-center mt-6">
              {user ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-400 to-cyan-300 text-black rounded-lg font-semibold shadow hover:scale-[1.02] transition"
                >
                  Go to Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-400 to-cyan-300 text-black rounded-lg font-semibold shadow hover:scale-[1.02] transition"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>

            {/* feature bullets */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-md p-3 ${
                    isDark ? "glass" : "bg-white"
                  } w-16 h-16 flex items-center justify-center`}
                >
                  <Cpu
                    className={`w-6 h-6 ${
                      isDark ? "text-teal-300" : "text-teal-600"
                    }`}
                  />
                </div>
                <div>
                  <div className="text-base font-semibold">AI Insights</div>
                  <div className={`${t.muted} text-sm`}>
                    Smart repo & content suggestions
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`rounded-md p-3 ${
                    isDark ? "glass" : "bg-white"
                  } w-16 h-16 flex items-center justify-center`}
                >
                  <ShieldCheck
                    className={`w-6 h-6 ${
                      isDark ? "text-teal-300" : "text-teal-600"
                    }`}
                  />
                </div>
                <div>
                  <div className="text-base font-semibold">
                    Privacy First
                  </div>
                  <div className={`${t.muted} text-sm`}>
                    Service role key never exposed
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:col-span-2 lg:col-span-1">
                <div
                  className={`rounded-md p-3 ${
                    isDark ? "glass" : "bg-white"
                  } w-16 h-16 flex items-center justify-center`}
                >
                  <Zap
                    className={`w-6 h-6 ${
                      isDark ? "text-teal-300" : "text-teal-600"
                    }`}
                  />
                </div>
                <div>
                  <div className="text-base font-semibold">
                    Fast Reports
                  </div>
                  <div className={`${t.muted} text-sm`}>
                    Generated via secure serverless API
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right preview card (Hidden on small screens, shown on tablet/desktop) */}
          <div className="lg:col-span-6 hidden md:block relative fade-in">
            <div className="absolute -right-20 -top-24 w-96 h-96 rounded-full bg-gradient-to-br from-teal-400/12 to-cyan-400/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-28 bottom-8 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/8 to-pink-400/8 blur-3xl pointer-events-none" />

            <div
              className={`mx-auto max-w-xl transform hover:scale-[1.01] transition shadow-2xl rounded-2xl p-6 ${
                isDark ? "glass-strong" : "bg-white"
              } float-slow`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className={`${t.muted} text-xs uppercase`}>
                    Developer Report
                  </div>
                  <div
                    className={`text-lg font-semibold ${t.heading}`}
                  >
                    Overall score • 82
                  </div>
                </div>
                <div className="text-right">
                  <div className={`${t.muted} text-sm`}>Generated</div>
                  <div className={`${t.muted} text-xs`}>Today • 12:32</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`rounded-lg p-3 ${
                    isDark ? "glass" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Github
                        className={`${
                          isDark ? "text-gray-200" : "text-gray-700"
                        } w-5 h-5`}
                      />
                      <div className="text-sm font-semibold">GitHub</div>
                    </div>
                    <div className="text-sm font-bold text-teal-400">
                      88
                    </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full mt-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-400 to-cyan-400"
                      style={{ width: "88%" }}
                    />
                  </div>
                </div>

                <div
                  className={`rounded-lg p-3 ${
                    isDark ? "glass" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Linkedin
                        className={`${
                          isDark ? "text-gray-200" : "text-gray-700"
                        } w-5 h-5`}
                      />
                      <div className="text-sm font-semibold">LinkedIn</div>
                    </div>
                    <div className="text-sm font-bold text-emerald-300">
                      76
                    </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full mt-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-sky-400"
                      style={{ width: "76%" }}
                    />
                  </div>
                </div>

                <div
                  className={`rounded-lg p-3 ${
                    isDark ? "glass" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText
                        className={`${
                          isDark ? "text-gray-200" : "text-gray-700"
                        } w-5 h-5`}
                      />
                      <div className="text-sm font-semibold">Blog</div>
                    </div>
                    <div className="text-sm font-bold text-cyan-300">
                      70
                    </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full mt-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-teal-300"
                      style={{ width: "70%" }}
                    />
                  </div>
                </div>

                <div
                  className={`rounded-lg p-3 ${
                    isDark ? "glass" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Code
                        className={`${
                          isDark ? "text-gray-200" : "text-gray-700"
                        } w-5 h-5`}
                      />
                      <div className="text-sm font-semibold">Coding</div>
                    </div>
                    <div className="text-sm font-bold text-teal-400">
                      84
                    </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full mt-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-400 to-emerald-300"
                      style={{ width: "84%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className={`${t.muted} text-xs`}>
                  Analyze more repos for better accuracy
                </div>
                <div className="text-sm font-semibold text-teal-300">
                  View Details →
                </div>
              </div>
            </div>

            {/* Floating small stat cards */}
            <div className="absolute -left-6 -top-8 w-44 p-3 rounded-xl glass shadow-lg hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="rounded-md p-2 bg-gradient-to-br from-teal-400 to-cyan-300">
                  <Github className="w-4 h-4 text-black" />
                </div>
                <div>
                  <div className="text-xs text-gray-300">Commits</div>
                  <div className="text-sm font-semibold">1,234</div>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-6 w-44 p-3 rounded-xl glass shadow-lg hidden lg:block">
              <div className="flex items-center gap-3">
                <div>
                  <div className="text-xs text-gray-300">Coding Score</div>
                  <div className="text-sm font-semibold">84 / 100</div>
                </div>
                <div className="ml-auto">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full glass">
                    <Code className="w-4 h-4 text-teal-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}