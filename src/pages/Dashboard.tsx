import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  FileText,
  Code,
  Plus,
  Calendar,
  TrendingUp,
  BarChart3,
  Trash2,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../utils/supabase";
import { generateFullReport } from "../utils/analysis";
import { Profile, Report } from "../types";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [profileState, setProfileState] = useState<Profile | null>(null);
  const [reportsState, setReportsState] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    github_url: "",
    linkedin_url: "",
    blog_url: "",
    coding_platform_url: "",
  });

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    (async () => {
      await loadProfile();
      await loadReports();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();

      if (error) {
        console.error("Error loading profile:", error);
        setProfileState(null);
        return;
      }
      if (data) {
        setProfileState(data);
        setFormData({
          github_url: data.github_url || "",
          linkedin_url: data.linkedin_url || "",
          blog_url: data.blog_url || "",
          coding_platform_url: data.coding_platform_url || "",
        });
      } else {
        setProfileState(null);
      }
    } catch (err) {
      console.error("Unexpected error in loadProfile:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadReports = async () => {
    try {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReportsState(data || []);
    } catch (err) {
      console.error("Unexpected error loading reports:", err);
      setReportsState([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveProfile = async () => {
    const profileData = {
      user_id: user!.id,
      github_url: formData.github_url || null,
      linkedin_url: formData.linkedin_url || null,
      blog_url: formData.blog_url || null,
      coding_platform_url: formData.coding_platform_url || null,
    };

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert(profileData, { onConflict: "user_id" });

      if (error) throw error;
      await loadProfile();
    } catch (err) {
      console.error("Error saving profile:", err);
      throw err;
    }
  };

  // const generateReport = async () => {
  //   setAnalyzing(true);
  //   try {
  //     await saveProfile();
  //     const analysis = await generateFullReport(formData);

  //     const reportData = {
  //       user_id: user!.id,
  //       github_score: analysis.githubScore,
  //       linkedin_score: analysis.linkedinScore,
  //       blog_score: analysis.blogScore,
  //       coding_score: analysis.codingScore,
  //       total_score: analysis.totalScore,
  //       analysis_data: analysis.analysisData,
  //     };

  //     const { error } = await supabase.from("reports").insert(reportData);
  //     if (error) throw error;
  //     await loadReports();
  //   } catch (err) {
  //     console.error("Error generating report:", err);
  //     alert("Failed to generate report. See console for details.");
  //   } finally {
  //     setAnalyzing(false);
  //   }
  // };


  const generateReport = async () => {
    setAnalyzing(true);
    try {
      await saveProfile();
      const analysis = await generateFullReport(formData);

      const reportData = {
        user_id: user!.id,
        github_score: analysis.githubScore,
        linkedin_score: analysis.linkedinScore,
        blog_score: analysis.blogScore,
        coding_score: analysis.codingScore,
        total_score: analysis.totalScore,
        analysis_data: analysis.analysisData,
      };

      const { data, error } = await supabase
        .from("reports")
        .insert(reportData)
        .select("*")
        .single();

      if (error) throw error;

      // If it’s the first ever report, redirect to it
      if (reportsState.length === 0 && data?.id) {
        window.location.href = `/report/${data.id}`;
      } else {
        await loadReports();
      }
    } catch (err) {
      console.error("Error generating report:", err);
      alert("Failed to generate report. See console for details.");
    } finally {
      setAnalyzing(false);
    }
  };



  const deleteReport = async (id: string) => {
    const confirmed = window.confirm("Delete this report permanently?");
    if (!confirmed) return;
    setDeletingId(id);

    try {
      // Try delete; if RLS blocks this will return an error
      const { data, error } = await supabase.from("reports").delete().eq("id", id);
      if (error) {
        console.error("Delete error:", error);
        alert("Could not delete report: " + (error.message ?? JSON.stringify(error)));
        return;
      }
      // Refresh the list (server-side)
      await loadReports();
    } catch (err) {
      console.error("Unexpected delete error:", err);
      alert("Delete failed, check console.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const hasAnyUrl = Object.values(formData).some((url) => url.trim() !== "");

  return (
    // NOTE: pt-20 to account for fixed navbar height
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Developer Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Add profile links and generate reports.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Links</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Github className="h-4 w-4" /> GitHub
                </label>
                <input
                  type="url"
                  name="github_url"
                  value={formData.github_url}
                  onChange={handleInputChange}
                  placeholder="https://github.com/yourusername"
                  className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Linkedin className="h-4 w-4 text-blue-600" /> LinkedIn
                </label>
                <input
                  type="url"
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-green-600" /> Blog
                </label>
                <input
                  type="url"
                  name="blog_url"
                  value={formData.blog_url}
                  onChange={handleInputChange}
                  placeholder="https://dev.to/yourusername or medium link"
                  className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Code className="h-4 w-4 text-orange-500" /> Coding Platform
                </label>
                <input
                  type="url"
                  name="coding_platform_url"
                  value={formData.coding_platform_url}
                  onChange={handleInputChange}
                  placeholder="https://leetcode.com/yourusername or codeforces profile"
                  className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <button
                onClick={generateReport}
                disabled={analyzing || !hasAnyUrl}
                className="w-full bg-blue-600 text-white py-3 rounded-md mt-2 hover:bg-blue-700 transition"
              >
                {analyzing ? "Analyzing..." : <><Plus className="inline-block mr-2 h-4 w-4" /> Generate Report</>}
              </button>
            </div>
          </div>

          {/* Reports list */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><BarChart3 className="h-5 w-5 text-blue-600" /> Reports</h2>

            {reportsState.length === 0 ? (
              <div className="text-gray-500 dark:text-gray-400 text-center py-6">No reports yet</div>
            ) : (
              <div className="space-y-3">
                {reportsState.map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 hover:shadow-sm transition">
                    <Link to={`/report/${r.id}`} className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{r.total_score}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-300">{new Date(r.created_at).toLocaleString()}</div>
                        </div>
                      </div>
                    </Link>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => deleteReport(r.id)}
                        disabled={deletingId === r.id}
                        className="p-2 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                      >
                        {deletingId === r.id ? <div className="h-4 w-4 border-b-2 border-red-500 rounded-full animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
