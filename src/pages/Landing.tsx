import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Github,
  Linkedin,
  FileText,
  Code,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Landing: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("opacity-100", "translate-y-0");
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => document.querySelectorAll(".fade-in").forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 pt-20 transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-6 py-24">
        <section className="text-center fade-in opacity-0 translate-y-6 transition-all duration-700">
          <div className="flex justify-center mb-6">
            <div className="rounded-md bg-blue-600 p-3 text-white"><BarChart3 className="h-8 w-8" /></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">Discover Your <span className="text-blue-600 dark:text-blue-400">Developer Potential</span></h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">Comprehensive analysis across GitHub, LinkedIn, blogs, and coding sites — actionable insights to grow your profile.</p>

          <div className="flex justify-center gap-4">
            {user ? (
              <Link to="/dashboard" className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition">
                Go to Dashboard <ArrowRight className="inline ml-2 h-4 w-4" />
              </Link>
            ) : (
              <>
                <Link to="/auth" className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition">Get Started</Link>
                <Link to="/auth" className="px-6 py-3 border rounded-md text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">Learn More</Link>
              </>
            )}
          </div>
        </section>

        <section className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Github className="h-6 w-6" />, title: "GitHub Activity", desc: "Repos, stars, commit frequency & code quality." },
            { icon: <Linkedin className="h-6 w-6" />, title: "LinkedIn Network", desc: "Network strength & engagement." },
            { icon: <FileText className="h-6 w-6" />, title: "Technical Blog", desc: "Post frequency, depth & reach." },
            { icon: <Code className="h-6 w-6" />, title: "Coding Platforms", desc: "Problems solved, rank & contests." },
          ].map((f, i) => (
            <article key={i} className="fade-in opacity-0 translate-y-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-700 mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{f.desc}</p>
            </article>
          ))}
        </section>

        <section className="mt-16 bg-blue-600 dark:bg-blue-700 rounded-xl p-8 text-white grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold">4.9</div>
            <div className="text-sm">Average rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">10K+</div>
            <div className="text-sm">Developers analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">85%</div>
            <div className="text-sm">Improved their scores</div>
          </div>
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Ready to discover your developer score?</h2>
          {!user && <Link to="/auth" className="px-6 py-3 bg-blue-600 text-white rounded-md">Get Started Free</Link>}
        </section>
      </main>
    </div>
  );
};

export default Landing;
