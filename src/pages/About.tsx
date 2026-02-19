import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import {
    BarChart3,
    ArrowRight,
    X,
    Sun,
    Moon,
    Zap,
    ShieldCheck,
    Menu,
    Github,
    Linkedin,
    MessageSquare,
    Cpu,
    Bookmark,
    Globe,
    Code
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const About: React.FC = () => {
    useAuth();
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem("devscore_theme");
            const initial = saved === "light" ? "light" : "dark";
            setTheme(initial);
            if (initial === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        } catch {
            document.documentElement.classList.add("dark");
            setTheme("dark");
        }

        // For CSS targeting light/dark mode
        if (theme === "light") {
            document.body.classList.add("light");
            document.body.classList.remove("dark");
        } else {
            document.body.classList.add("dark");
            document.body.classList.remove("light");
        }

        if (document.documentElement.classList.contains("dark")) {
            document.body.classList.remove("bg-white", "text-black");
            document.body.classList.add("bg-gray-900", "text-gray-100");
        } else {
            document.body.classList.remove("bg-gray-900", "text-gray-100");
            document.body.classList.add("bg-white", "text-gray-900");
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
            document.body.classList.add("dark");
            document.body.classList.remove("light");
            document.body.classList.remove("bg-white", "text-black");
            document.body.classList.add("bg-gray-900", "text-gray-100");
        } else {
            document.documentElement.classList.remove("dark");
            document.body.classList.add("light");
            document.body.classList.remove("dark");
            document.body.classList.remove("bg-gray-900", "text-gray-100");
            document.body.classList.add("bg-white", "text-gray-900");
        }
    };

    const isDark = theme === "dark";
    const t = {
        heading: isDark ? "text-gray-100" : "text-gray-900",
        sub: isDark ? "text-gray-300" : "text-gray-700",
        muted: isDark ? "text-gray-400" : "text-gray-500",
        border: isDark ? "border-white/10" : "border-gray-200",
        cardBg: isDark ? "glass" : "bg-white",
    };

    const inlineStyles = `
    .glass { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); }
    .nav-outline { box-shadow: 0 8px 32px rgba(2,6,23,0.45); border: 1px solid rgba(255,255,255,0.04); }
    @keyframes pulse-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .animate-pulse-slow { animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
  `;

    const NavLinks = () => (
        <>
            <li><Link to="/#features" className={`${isDark ? "text-gray-200 hover:text-teal-300" : "text-gray-700 hover:text-teal-600"} transition font-medium`}>Features</Link></li>
            <li><Link to="/#how" className={`${isDark ? "text-gray-200 hover:text-teal-300" : "text-gray-700 hover:text-teal-600"} transition font-medium`}>How it works</Link></li>
            <li><Link to="/#why" className={`${isDark ? "text-gray-200 hover:text-teal-300" : "text-gray-700 hover:text-teal-600"} transition font-medium`}>Why Us</Link></li>
            <li><Link to="/#faq" className={`${isDark ? "text-gray-200 hover:text-teal-300" : "text-gray-700 hover:text-teal-600"} transition font-medium`}>FAQ</Link></li>
        </>
    );

    return (
        <div className={`${isDark ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100" : "bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900"} min-h-screen`}>
            <style>{inlineStyles}</style>

            {/* Navbar */}
            <header className="fixed top-6 left-0 w-full z-50 flex justify-center">
                <nav className={`nav-outline pointer-events-auto ${isDark ? "bg-neutral-900/80" : "bg-white/95"} backdrop-blur-md rounded-3xl px-8 py-3 flex items-center justify-between w-[95%] max-w-6xl border ${t.border} shadow-2xl`}>
                    <Link to="/" className="flex items-center gap-3">
                        <div className={`${isDark ? "bg-gradient-to-br from-teal-400/30 to-cyan-400/20" : "bg-gradient-to-br from-cyan-200/40 to-teal-200/30"} rounded-lg p-2 shadow-lg`}>
                            <BarChart3 className={`${isDark ? "text-teal-300" : "text-teal-700"} h-6 w-6`} />
                        </div>
                        <span className={`text-xl font-bold tracking-tight ${t.heading}`}>DevScore</span>
                    </Link>

                    <ul className="hidden lg:flex items-center gap-10">
                        <NavLinks />
                    </ul>

                    <div className="flex items-center gap-4">
                        <button onClick={toggleTheme} className={`p-2 rounded-xl ${isDark ? "hover:bg-white/10" : "hover:bg-black/5"} transition-colors`}>
                            {isDark ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5 text-sky-600" />}
                        </button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                        <Link to="/auth" className="hidden lg:block px-6 py-2 bg-gradient-to-r from-teal-400 to-cyan-300 text-black rounded-xl font-bold hover:scale-[1.02] transition">
                            Get Started
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="pt-40 pb-32">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Main Title */}
                    <section className="mb-20" data-aos="fade-up">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 inline-block">
                            <span className={isDark ? "text-white" : "text-gray-900"}>About </span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-cyan-300">Us</span>
                        </h1>
                        <p className={`text-2xl md:text-3xl font-medium leading-tight opacity-90 max-w-2xl ${t.heading}`}>
                            We are building the definitive standard for developer impact and professional growth.
                        </p>
                    </section>

                    {/* Intro Text */}
                    <section className={`mb-24 space-y-8 text-lg md:text-xl ${t.sub} leading-relaxed font-medium`} data-aos="fade-up">
                        <p>
                            Proofolio (the engine behind DevScore) started with a simple observation: the traditional résumé is dying. For developers, a PDF of bullet points can never truly capture the complexity of a 1,000-commit repository, the depth of a technical blog post, or the consistency of a competitive coding streak.
                        </p>
                        <p>
                            Our mission is to provide a single, unified lens through which developers can visualize their own progress and showcase their expertise to the world. We believe in "Proof over Promises."
                        </p>
                    </section>

                    {/* Functional Deep Dive */}
                    <section className="mb-32 space-y-20">
                        <div className="grid md:grid-cols-2 gap-12 items-start" data-aos="fade-up">
                            <div>
                                <h2 className={`text-3xl font-black mb-6 ${t.heading}`}>Engineering Analytics</h2>
                                <p className={`${t.sub} mb-6`}>
                                    We don't just count commits. Our algorithm analyzes your contribution patterns, code health, documentation standards, and repository impact across GitHub. We look for the "Signal in the Noise."
                                </p>
                                <div className="flex items-center gap-3 text-teal-400 font-bold">
                                    <Github className="h-5 w-5" />
                                    <span>GitHub Deep Analysis</span>
                                </div>
                            </div>
                            <div className={`p-8 rounded-[2rem] border ${t.border} ${t.cardBg} shadow-xl relative overflow-hidden group`}>
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Code className="w-24 h-24 text-teal-400 -rotate-12" />
                                </div>
                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className={`p-3 rounded-xl ${isDark ? "bg-teal-500/20" : "bg-teal-50"}`}>
                                            <Github className="w-6 h-6 text-teal-400" />
                                        </div>
                                        <div className="text-right">
                                            <div className="text-teal-400 text-xs font-bold tracking-widest uppercase">Analysis Status</div>
                                            <div className={`text-sm font-bold ${t.heading}`}>Active</div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-xs mb-2">
                                                <span className={t.muted}>Code Efficiency</span>
                                                <span className="text-teal-400 font-bold">85%</span>
                                            </div>
                                            <div className={`h-1.5 w-full ${isDark ? "bg-white/5" : "bg-gray-100"} rounded-full overflow-hidden`}>
                                                <div className="h-full w-[85%] bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs mb-2">
                                                <span className={t.muted}>Documentation Depth</span>
                                                <span className="text-cyan-400 font-bold">72%</span>
                                            </div>
                                            <div className={`h-1.5 w-full ${isDark ? "bg-white/5" : "bg-gray-100"} rounded-full overflow-hidden`}>
                                                <div className="h-full w-[72%] bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`mt-6 pt-6 border-t ${t.border} flex justify-between items-center`}>
                                        <span className={`text-xs ${t.muted}`}>Weekly Commits</span>
                                        <div className="flex gap-1 items-end h-6">
                                            {[30, 60, 45, 90, 55, 70, 40].map((h, i) => (
                                                <div key={i} className="w-1 bg-teal-500/30 rounded-full" style={{ height: `${h}%` }}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-start" data-aos="fade-up">
                            <div className={`order-2 md:order-1 p-8 rounded-[2rem] border ${t.border} ${t.cardBg} shadow-xl relative overflow-hidden group`}>
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Globe className="w-24 h-24 text-blue-400 rotate-12" />
                                </div>
                                <div className="flex gap-4 items-center mb-8 relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center shadow-inner">
                                        <Linkedin className="h-7 w-7 text-blue-400" />
                                    </div>
                                    <div>
                                        <div className={`text-xl font-bold ${t.heading}`}>Professional Network</div>
                                        <div className="text-teal-400 text-xs font-bold uppercase tracking-wider">Connected</div>
                                    </div>
                                </div>
                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className={`text-2xl font-black ${t.heading}`}>+12.4%</div>
                                            <div className={`text-xs ${t.muted}`}>Monthly Reach Growth</div>
                                        </div>
                                        <div className="flex gap-1 items-end h-10">
                                            {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                                <div key={i} className="w-1.5 bg-blue-500/40 rounded-full" style={{ height: `${h}%` }}></div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={`p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-gray-50"} border ${t.border}`}>
                                        <div className={`text-xs font-bold mb-2 uppercase tracking-tighter ${t.muted}`}>Top Endorsements</div>
                                        <div className="flex flex-wrap gap-2">
                                            {["React", "Node.js", "Team Lead"].map(skill => (
                                                <span key={skill} className={`text-[10px] px-2 py-0.5 rounded-md ${isDark ? "bg-blue-500/10 text-blue-300" : "bg-blue-50 text-blue-700"} font-bold border border-blue-500/20`}>{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <h2 className={`text-3xl font-black mb-6 ${t.heading}`}>Professional Footprint</h2>
                                <p className={`${t.sub} mb-6`}>
                                    Collaboration is key. We evaluate your network growth, endorsements, and community engagement. DevScore integrates with LinkedIn to measure your professional reach and industry influence.
                                </p>
                                <div className="flex items-center gap-3 text-blue-500 font-bold">
                                    <Linkedin className="h-5 w-5" />
                                    <span>LinkedIn Integration</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-start" data-aos="fade-up">
                            <div>
                                <h2 className={`text-3xl font-black mb-6 ${t.heading}`}>Thought Leadership</h2>
                                <p className={`${t.sub} mb-6`}>
                                    Great code deserves great communication. Our technical blog analyzer looks at your post frequency, content depth, readability, and overall impact on platforms like Medium, Dev.to, or custom domains.
                                </p>
                                <div className="flex items-center gap-3 text-emerald-500 font-bold">
                                    <Bookmark className="h-5 w-5" />
                                    <span>Blog Analysis</span>
                                </div>
                            </div>
                            <div className={`p-8 rounded-[2rem] border ${t.border} ${t.cardBg} shadow-xl relative overflow-hidden group`}>
                                <div className="absolute -bottom-6 -right-6 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <MessageSquare className="w-32 h-32 text-emerald-400" />
                                </div>
                                <div className="space-y-6 relative z-10">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className={`p-3 rounded-xl ${isDark ? "bg-emerald-500/20" : "bg-emerald-50"}`}>
                                            <Bookmark className="w-6 h-6 text-emerald-500" />
                                        </div>
                                        <span className={`font-bold text-lg ${t.heading}`}>Article Insights</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className={`p-4 rounded-2xl ${isDark ? "bg-white/5" : "bg-gray-50"} border ${t.border}`}>
                                            <div className="text-emerald-500 font-black text-xl">24</div>
                                            <div className={`text-[10px] uppercase font-bold tracking-tighter ${t.muted}`}>Articles Found</div>
                                        </div>
                                        <div className={`p-4 rounded-2xl ${isDark ? "bg-white/5" : "bg-gray-50"} border ${t.border}`}>
                                            <div className="text-emerald-500 font-black text-xl">6m</div>
                                            <div className={`text-[10px] uppercase font-bold tracking-tighter ${t.muted}`}>Avg. Read Time</div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className={`p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-gray-50"} border ${t.border} animate-pulse-slow`}>
                                            <div className={`h-2.5 w-full ${isDark ? "bg-white/10" : "bg-gray-200"} rounded-full mb-3`}></div>
                                            <div className={`h-2 w-2/3 ${isDark ? "bg-white/5" : "bg-gray-100"} rounded-full`}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Under the Hood */}
                    <section className={`mb-32 p-12 rounded-[3rem] ${t.cardBg} border ${t.border}`} data-aos="zoom-in">
                        <div className="max-w-2xl">
                            <h2 className={`text-4xl font-black mb-8 ${t.heading}`}>Under the Hood</h2>
                            <div className={`space-y-6 ${t.sub}`}>
                                <div className="flex gap-4">
                                    <Cpu className="h-6 w-6 text-teal-400 shrink-0" />
                                    <div>
                                        <span className={`font-bold ${t.heading}`}>Heuristic-Augmented AI</span>
                                        <p>We combine traditional scoring heuristics with AI models to ensure that our analysis is both objective and nuanced.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <ShieldCheck className="h-6 w-6 text-cyan-400 shrink-0" />
                                    <div>
                                        <span className={`font-bold ${t.heading}`}>Zero-Exposure Security</span>
                                        <p>Your keys are never touched by the client. All analysis happens on secure, serverless infrastructure (Vercel Functions).</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Zap className="h-6 w-6 text-yellow-500 shrink-0" />
                                    <div>
                                        <span className={`font-bold ${t.heading}`}>Real-time Execution</span>
                                        <p>Analysis is triggered on-demand, fetching the freshest data from APIs to give you up-to-the-minute scorecards.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Philosophy */}
                    <section className="mb-32 text-center" data-aos="fade-up">
                        <h2 className={`text-4xl font-black mb-12 ${t.heading}`}>The Philosophy</h2>
                        <div className="grid md:grid-cols-2 gap-8 text-left">
                            <div className={`p-8 rounded-3xl border ${t.border} ${t.cardBg}`}>
                                <h3 className={`text-xl font-bold mb-4 ${t.heading}`}>Accountability</h3>
                                <p className={t.sub}>We believe that metrics should lead to action. DevScore doesn't just give you a number; it gives you a roadmap.</p>
                            </div>
                            <div className={`p-8 rounded-3xl border ${t.border} ${t.cardBg}`}>
                                <h3 className={`text-xl font-bold mb-4 ${t.heading}`}>Transparency</h3>
                                <p className={t.sub}>As an open-source project, our logic is visible to everyone. We welcome contributions to improve the science of developer analysis.</p>
                            </div>
                        </div>
                    </section>

                    {/* Join Footer */}
                    <section className="text-center" data-aos="fade-up">
                        <h2 className={`text-3xl font-black mb-6 ${t.heading}`}>Ready to see where you stand?</h2>
                        <Link to="/auth" className="inline-flex items-center gap-2 text-teal-400 font-black text-xl hover:translate-x-2 transition-transform">
                            Get your first report <ArrowRight />
                        </Link>
                    </section>
                </div>
            </main >

            <Footer isDark={isDark} />

            {/* Mobile Menu */}
            {
                isMenuOpen && (
                    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden p-8 flex flex-col justify-center items-center">
                        <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8">
                            <X className={`h-8 w-8 ${isDark ? "text-white" : "text-black"}`} />
                        </button>
                        <ul className={`text-center space-y-8 text-3xl font-black ${isDark ? "text-white" : "text-black"}`}>
                            <NavLinks />
                            <li><Link to="/auth" className="text-teal-400">Get Started</Link></li>
                        </ul>
                    </div>
                )
            }
        </div >
    );
};

export default About;
