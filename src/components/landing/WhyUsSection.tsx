import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { BarChart3, Lightbulb, ShieldCheck } from "lucide-react";


export const WhyUsSection: React.FC = () => {
  const { t, isDark } = useTheme();

  return(
    <section
      id="why"
      className="py-20 lg:py-24"
      aria-label="Why choose us"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <h2
          className={`text-3xl md:text-4xl font-semibold mb-12 text-center ${t.heading} fade-in`}
        >
          The DevScore Advantage
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <BarChart3 className="w-6 h-6 text-teal-300" />,
              title: "Accurate & Actionable",
              desc: "We don't just give a number — we provide clear, personalized steps to improve your profile and career growth.",
              animationDelay: "0s",
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-cyan-300" />,
              title: "Zero-Exposure Security",
              desc: "All sensitive scoring and API calls use secure, server-side architecture (Vercel Functions), ensuring your keys are never exposed.",
              animationDelay: "0.15s",
            },
            {
              icon: <Lightbulb className="w-6 h-6 text-yellow-300" />,
              title: "AI-Powered Insights",
              desc: "Leverage heuristic-augmented AI to identify undervalued projects and suggest optimized documentation and coding improvements.",
              animationDelay: "0.3s",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`shine-effect card-glow-hover ${
                isDark
                  ? "glass border border-white/5"
                  : "bg-white border border-gray-100"
              } rounded-2xl p-8 shadow-xl transform hover:-translate-y-2 transition-all duration-500 fade-in`}
              style={{ transitionDelay: item.animationDelay }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r from-teal-500/10 to-cyan-500/10">
                {item.icon}
              </div>
              <h3 className={`text-xl font-bold ${t.heading} mb-3`}>
                {item.title}
              </h3>
              <p className={`${t.sub}`}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}