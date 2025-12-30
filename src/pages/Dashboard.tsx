import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Github,
  Linkedin,
  FileText,
  Code,
  Plus,
  Calendar,
  TrendingUp,
  BarChart3,
  Cpu,
  ChevronLeft,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../utils/supabase";
import { Profile, Report } from "../types";
import Navbar from '../components/Navbar';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [reportsState, setReportsState] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    github_url: "",
    linkedin_url: "",
    blog_url: "",
    coding_platform_url: "",
  });

  useEffect(() => {
    if (!user) return;
    loadInitialData();
  }, [user]);

  const loadInitialData = async () => {
    setLoading(true);
    await Promise.all([loadProfile(), loadReports()]);
    setLoading(false);
  };

  const loadProfile = async () => {
    const { data } = await supabase.from("users").select("*").eq("id", user!.id).maybeSingle();
    if (data) {
      setFormData({
        github_url: data.github_url || "",
        linkedin_url: data.linkedin_url || "",
        blog_url: data.blog_url || "",
        coding_platform_url: data.coding_platform_url || "",
      });
    }
  };

  const loadReports = async () => {
    const { data } = await supabase
      .from("reports")
      .select("*")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false });
    setReportsState(data || []);
  };

  const saveProfile = async () => {
    await supabase.from("users").upsert({
      id: user!.id,
      ...formData
    }, { onConflict: "id" });
  };

  const generateReport = async () => {
    setAnalyzing(true);
    try {
      await saveProfile();

      // 1. Generate realistic mock scores for each section
      const scores = {
        github: formData.github_url ? 70 + Math.floor(Math.random() * 25) : 0,
        linkedin: formData.linkedin_url ? 75 + Math.floor(Math.random() * 20) : 0,
        blog: formData.blog_url ? 60 + Math.floor(Math.random() * 30) : 0,
        coding: formData.coding_platform_url ? 65 + Math.floor(Math.random() * 30) : 0,
      };

      const activeScores = Object.values(scores).filter(s => s > 0);
      const totalScore = activeScores.length > 0
        ? Math.round(activeScores.reduce((a, b) => a + b, 0) / activeScores.length)
        : 0;

      // 2. Create the Detailed Analysis JSON (This powers your graphs and text)
      const detailedAnalysis = {
        summary: "Excellent technical foundation. Focus on increasing your blog engagement to boost your score.",
        github: {
          repos: Math.floor(Math.random() * 15) + 5,
          stars: Math.floor(Math.random() * 40),
          contributions: "High",
          review: "Consistent commit history and well-documented repositories.",
          suggestions: ["Add more detailed READMEs", "Contribute to 1 open source project"]
        },
        linkedin: {
          connections: "450+",
          completeness: "95%",
          review: "Profile is highly optimized for technical recruiters.",
          suggestions: ["Update your feature section", "Get 2 more skills endorsed"]
        },
        blog: {
          post_count: Math.floor(Math.random() * 8),
          engagement: "Medium",
          review: "Articles are technically sound, but posting frequency is inconsistent.",
          suggestions: ["Post once every 3 weeks", "Share on Dev.to"]
        },
        coding: {
          problems_solved: Math.floor(Math.random() * 120) + 40,
          rank: "Top 20%",
          review: "Strong algorithmic skills visible through problem-solving stats.",
          suggestions: ["Attempt more 'Hard' category problems"]
        }
      };

      // 3. Save to Database
      const { data, error } = await supabase
        .from("reports")
        .insert({
          user_id: user!.id,
          total_score: totalScore,
          github_score: scores.github,
          linkedin_score: scores.linkedin,
          blog_score: scores.blog,
          coding_score: scores.coding,
          analysis_data: JSON.stringify(detailedAnalysis) // CRITICAL: Powers your report page
        })
        .select("id")
        .single();

      if (error) throw error;
      navigate(`/report/${data.id}`);

    } catch (err) {
      console.error("Report Error:", err);
      alert("Failed to generate detailed report.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-teal-400">Loading Proofolio...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-16 pb-12">
      <Navbar showSignOut={false} />
      <div className="max-w-7xl mx-auto px-4 space-y-10 mt-8">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center text-teal-400 hover:text-teal-300 text-sm font-medium">
            <ChevronLeft className="h-5 w-5 mr-1" /> Go Back
          </button>
          <h1 className="text-4xl font-extrabold text-teal-300">Dashboard</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Input */}
          <div className="lg:col-span-2 bg-gray-800 rounded-2xl border border-gray-700 p-8">
            <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-3">Connect Profiles</h2>
            <div className="space-y-6">
              {[
                { name: "github_url", label: "GitHub", Icon: Github, color: "text-white" },
                { name: "linkedin_url", label: "LinkedIn", Icon: Linkedin, color: "text-blue-400" },
                { name: "blog_url", label: "Blog/Portfolio", Icon: FileText, color: "text-green-400" },
                { name: "coding_platform_url", label: "Coding Platform", Icon: Code, color: "text-orange-400" }
              ].map((input) => (
                <div key={input.name}>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <input.Icon className={`h-4 w-4 ${input.color}`} /> {input.label}
                  </label>
                  <input
                    type="url"
                    name={input.name}
                    value={(formData as any)[input.name]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-100 border-gray-600 outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              ))}
              <button
                onClick={generateReport}
                disabled={analyzing || !Object.values(formData).some(v => v.trim() !== "")}
                className="w-full py-4 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-gray-900 font-bold text-lg"
              >
                {analyzing ? <Cpu className="animate-spin mx-auto" /> : "Generate Detailed Report"}
              </button>
            </div>
          </div>

          {/* History - Delete Icon Removed */}
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 border-b border-gray-700 pb-3">
              <TrendingUp className="h-5 w-5 text-teal-400" /> History
            </h2>
            <div className="space-y-4">
              {reportsState.map((r) => (
                <Link to={`/report/${r.id}`} key={r.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-700/50 hover:bg-gray-700 border border-gray-700 transition">
                  <div className="text-xl font-black text-gray-900 w-12 h-12 flex items-center justify-center rounded-lg bg-teal-400">
                    {r.total_score}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-200">Score: {r.total_score}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {formatDate(r.created_at)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
