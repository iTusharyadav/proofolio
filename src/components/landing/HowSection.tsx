import { CheckCircle, Cpu, Users, Zap } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext"
import { Link } from "react-router-dom";


export const HowSection: React.FC = () => {
  const { t, isDark } = useTheme();

  return (
    <section
      id="how"
      className="py-20 lg:py-24"
      aria-label="How it works"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 fade-in">
            <h2 className={`text-3xl md:text-4xl font-semibold ${t.heading}`}>
              How it works
            </h2>
            <p className={`${t.sub} text-lg max-w-xl`}>
              DevScore combines heuristics and heuristic-augmented AI to
              evaluate developer profiles. The scoring logic runs server-side
              using a secure service key — only the final reports are stored in
              your account.
            </p>

            <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              {/* Animated connector line (Hidden on small screens) */}
              {/* <div
                className={`absolute top-1/2 left-0 right-0 h-px transform -translate-y-1/2 ${
                  isDark ? "bg-white/10" : "bg-gray-200"
                } hidden sm:block`}
              />
              <div
                className={`absolute top-1/2 left-1/3 right-1/3 h-px transform -translate-y-1/2 ${
                  isDark ? "bg-teal-400/50" : "bg-teal-500/50"
                } z-10 transition-all duration-1000 hidden sm:block`}
                style={{ width: "calc(100% / 3)" }}
              ></div> */}

              <div className="z-20">
                <div
                  className={`p-4 rounded-md text-center ${
                    isDark
                      ? "glass-strong border border-white/10"
                      : "bg-white border border-gray-100"
                  } shadow-xl transform hover:-translate-y-1 transition`}
                >
                  <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-300 shadow-lg">
                    <Users className="w-5 h-5 text-black" />
                  </div>
                  <div className="font-semibold text-lg mt-1">
                    1. Connect
                  </div>
                  <div className={`${t.muted} text-sm mt-1`}>
                    Signup & link profile accounts
                  </div>
                </div>
              </div>

              <div className="z-20">
                <div
                  className={`p-4 rounded-md text-center ${
                    isDark
                      ? "glass-strong border border-white/10"
                      : "bg-white border border-gray-100"
                  } shadow-xl transform hover:-translate-y-1 transition`}
                >
                  <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-300 shadow-lg">
                    <Cpu className="w-5 h-5 text-black" />
                  </div>
                  <div className="font-semibold text-lg mt-1">
                    2. Analyze
                  </div>
                  <div className={`${t.muted} text-sm mt-1`}>
                    Secure server-side scoring logic
                  </div>
                </div>
              </div>

              <div className="z-20">
                <div
                  className={`p-4 rounded-md text-center ${
                    isDark
                      ? "glass-strong border border-white/10"
                      : "bg-white border border-gray-100"
                  } shadow-xl transform hover:-translate-y-1 transition`}
                >
                  <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-300 shadow-lg">
                    <Zap className="w-5 h-5 text-black" />
                  </div>
                  <div className="font-semibold text-lg mt-1">
                    3. Improve
                  </div>
                  <div className={`${t.muted} text-sm mt-1`}>
                    Actionable tips & goal tracking
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`h-full flex items-center justify-center fade-in mt-10 lg:mt-0`}
          >
            <div
              className={`p-8 rounded-2xl shadow-2xl w-full max-w-sm ${
                isDark
                  ? "glass-strong border border-white/10"
                  : "bg-white border border-gray-100"
              }`}
            >
              <div className="text-center">
                <div className={`${t.muted} text-xs uppercase font-bold`}>
                  Free Access
                </div>
                <div
                  className={`text-4xl font-extrabold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-300`}
                >
                  $0.00
                </div>
                <div className={`text-xl font-semibold ${t.heading} mt-2`}>
                  Start Your Analysis Today
                </div>
                <p className={`${t.muted} text-sm mt-2`}>
                  Get your first developer report and personalized growth plan
                  instantly.
                </p>
              </div>
              <ul className="mt-6 space-y-3 text-left text-sm">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />{" "}
                  Full GitHub Scorecard
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />{" "}
                  LinkedIn Profile Audit
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />{" "}
                  Basic AI Improvement Plan
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />{" "}
                  Weekly Score Tracking
                </li>
              </ul>
              <div className="mt-6">
                <Link
                  to="/auth"
                  className="block text-center px-5 py-3 bg-gradient-to-r from-teal-400 to-cyan-300 text-black rounded-lg font-semibold shadow-md hover:shadow-xl hover:scale-[1.01] transition"
                >
                  Generate Your Free Report
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}