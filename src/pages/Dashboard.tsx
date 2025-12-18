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
  Trash2,
  Cpu,
  ChevronLeft,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../utils/supabase";
import { Profile, Report } from "../types";

// Import the new Navbar component (assuming path is correct)
import Navbar from '../components/Navbar';

// Helper for date formatting
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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
        .from("users") // Uses 'users' table
        .select("*")
        .eq("id", user!.id) // Uses 'id' column for RLS
        .maybeSingle();

      if (error) {
        console.error("Error loading profile:", error);
        setProfileState(null);
        return;
      }
      if (data) {
        setProfileState(data as Profile);
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
      // The 'id' in the 'users' table must match the user's auth ID (auth.uid())
      id: user!.id,
      github_url: formData.github_url || null,
      linkedin_url: formData.linkedin_url || null,
      blog_url: formData.blog_url || null,
      coding_platform_url: formData.coding_platform_url || null,
    };

    try {
      const { error } = await supabase
        .from("users")
        .upsert(profileData, { onConflict: "id" }); // CRITICAL: onConflict must be 'id'

      if (error) throw error;
      await loadProfile();
    } catch (err) {
      console.error("Error saving profile:", err);
      throw err; // Re-throw the error to be caught by generateReport
    }
  };


  // *** FINAL WORKING CLIENT-SIDE REPORT GENERATION ***
  // This replaces the non-functional Vercel API call for local development.
  const generateReport = async () => {
    setAnalyzing(true);
    try {
      // 1. Save the profile links first (We know this UPSERT is now fixed)
      await saveProfile();

      if (!user || !user.id) {
        throw new Error("User authentication data is missing.");
      }

      // 2. CLIENT-SIDE REPORT GENERATION LOGIC:

      // Simple mock scoring based on whether links are present (0-25 points each)
      const githubScore = formData.github_url ? 25 : 0;
      const linkedinScore = formData.linkedin_url ? 25 : 0;
      const blogScore = formData.blog_url ? 25 : 0;
      const codingScore = formData.coding_platform_url ? 25 : 0;
      const totalScore = githubScore + linkedinScore + blogScore + codingScore;

      const reportData = {
        user_id: user.id,
        github_score: githubScore,
        linkedin_score: linkedinScore,
        blog_score: blogScore,
        coding_score: codingScore,
        total_score: totalScore,
        // Saving mock analysis data directly to reports table
        analysis_data: JSON.stringify({ message: "Client-side mock analysis." }),
      };

      // 3. Insert the report directly into the 'reports' table
      const { data, error } = await supabase
        .from("reports")
        .insert(reportData)
        .select("id")
        .single();

      if (error) throw error;

      const newReportId = data.id;

      // 4. Update UI
      if (reportsState.length === 0 && newReportId) {
        navigate(`/report/${newReportId}`);
      } else {
        await loadReports();
      }

    } catch (err) {
      console.error("Error generating report:", err);
      alert(`Failed to generate report: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setAnalyzing(false);
    }
  };



  const deleteReport = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to permanently delete this report?");
    if (!confirmed) return;
    setDeletingId(id);

    try {
      const { error } = await supabase.from("reports").delete().eq("id", id);
      if (error) {
        console.error("Delete error:", error);
        alert("Could not delete report: " + (error.message ?? JSON.stringify(error)));
        return;
      }
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
      <div className="min-h-screen flex items-center justify-center bg-gray-900 pt-20">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-400"></div>
          <p className="text-xl text-gray-300">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const hasAnyUrl = Object.values(formData).some((url) => url && url.trim() !== "");

  // Helper for Link Input structure (rest of the component logic)
  interface LinkInputProps {
    name: keyof typeof formData;
    label: string;
    placeholder: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    colorClass: string;
  }

  const LinkInput: React.FC<LinkInputProps> = ({ name, label, placeholder, Icon, colorClass }) => (
    <div>
      <label className="text-sm font-medium flex items-center gap-2 mb-2 text-gray-300 dark:text-gray-200">
        <Icon className={`h-4 w-4 ${colorClass}`} /> {label}
      </label>
      <input
        type="url"
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border rounded-lg bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
      />
    </div>
  );

  return (
    // Add Navbar integration here
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-16 pb-12 transition-colors duration-300">

      {/* 1. Integrate Navbar (showSignOut=false as requested for Dashboard) */}
      <Navbar showSignOut={false} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 mt-8">

        {/* New: Go Back Row (as requested) */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-teal-400 hover:text-teal-300 transition text-sm font-medium"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Go Back
          </button>
          {/* Keeping the title for visual context below the back button */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-teal-300 hidden sm:block">Dashboard</h1>
        </div>

        {/* The rest of the content remains the same */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Profile Links Card (2/3 width) */}
          <div className="lg:col-span-2 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-6 sm:p-8 transition-shadow hover:shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-gray-100 border-b border-gray-700 pb-3">Connect Your Profiles</h2>

            <div className="space-y-6">

              <LinkInput name="github_url" label="GitHub Profile" placeholder="https://github.com/yourusername" Icon={Github} colorClass="text-white" />

              <LinkInput name="linkedin_url" label="LinkedIn Profile" placeholder="https://linkedin.com/in/yourprofile" Icon={Linkedin} colorClass="text-blue-400" />

              <LinkInput name="blog_url" label="Technical Blog/Portfolio" placeholder="https://dev.to/yourusername or medium link" Icon={FileText} colorClass="text-green-400" />

              <LinkInput name="coding_platform_url" label="Coding Platform" placeholder="https://leetcode.com/yourusername" Icon={Code} colorClass="text-orange-400" />

              <button
                onClick={generateReport}
                disabled={analyzing || !hasAnyUrl}
                className={`w-full py-4 rounded-lg mt-4 font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center ${analyzing
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-teal-500 to-cyan-500 text-gray-900 hover:shadow-teal-500/50 hover:scale-[1.005]"
                  }`}
              >
                {analyzing ? (
                  <div className="flex items-center space-x-2">
                    <Cpu className="h-5 w-5 animate-pulse" />
                    <span>Analyzing Code & Data...</span>
                  </div>
                ) : (
                  <>
                    <Plus className="inline-block mr-2 h-5 w-5" /> Generate New DevScore Report
                  </>
                )}
              </button>

              {!hasAnyUrl && (
                <p className="text-center text-sm text-yellow-500">Please provide at least one profile link to generate a report.</p>
              )}
            </div>
          </div>

          {/* Reports list Card (1/3 width) */}
          <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-100 flex items-center gap-2 border-b border-gray-700 pb-3">
              <TrendingUp className="h-5 w-5 text-teal-400" /> Analysis History
            </h2>

            {reportsState.length === 0 ? (
              <div className="text-gray-500 text-center py-10 rounded-lg border border-dashed border-gray-700 bg-gray-900/40">
                <BarChart3 className="h-8 w-8 mx-auto text-gray-600 mb-2" />
                <div className="text-sm">No reports found. Generate your first one!</div>
              </div>
            ) : (
              <div className="space-y-4">
                {reportsState.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-gray-700/50 border border-gray-700 hover:bg-gray-700 transition duration-200"
                  >
                    <Link to={`/report/${r.id}`} className="flex-1 min-w-0 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="text-xl font-extrabold text-gray-900 w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-r from-teal-400 to-cyan-300 flex-shrink-0 shadow">
                          {r.total_score}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-gray-200 truncate">
                            Report Score: {r.total_score}
                          </div>
                          <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(r.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <button
                      onClick={() => deleteReport(r.id)}
                      disabled={deletingId === r.id}
                      className="p-2 rounded-full text-red-400 hover:bg-red-900/30 transition flex-shrink-0 disabled:opacity-50"
                      aria-label={`Delete report from ${formatDate(r.created_at)}`}
                    >
                      {deletingId === r.id ? (
                        <div className="h-4 w-4 border-b-2 border-red-500 rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="h-5 w-5" />
                      )}
                    </button>
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
