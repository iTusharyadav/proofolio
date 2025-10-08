import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // keep if your app uses react-router
import { Github, Linkedin, FileText, Code, Plus, Calendar, TrendingUp, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../utils/supabase';
import { generateFullReport } from '../utils/analysis';
import { Profile, Report } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Renamed state variables to avoid accidental collisions
  const [profileState, setProfileState] = useState<Profile | null>(null);
  const [reportsState, setReportsState] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    github_url: '',
    linkedin_url: '',
    blog_url: '',
    coding_platform_url: '',
  });

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    // wrap in an async IIFE
    (async () => {
      await loadProfile();
      await loadReports();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadProfile = async () => {
    try {
      console.log("Loading profile for user:", user?.id);
      // maybeSingle() returns data or null and does not throw error on no rows
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user!.id)
        .maybeSingle();

      console.log("Profile query result:", { data, error });

      if (error) {
        console.error('Error loading profile:', error);
        setProfileState(null);
        setLoading(false);
        return;
      }

      if (data) {
        setProfileState(data);
        setFormData({
          github_url: data.github_url || '',
          linkedin_url: data.linkedin_url || '',
          blog_url: data.blog_url || '',
          coding_platform_url: data.coding_platform_url || '',
        });
      } else {
        setProfileState(null);
        setFormData({
          github_url: '',
          linkedin_url: '',
          blog_url: '',
          coding_platform_url: '',
        });
      }
    } catch (err) {
      console.error('Unexpected error in loadProfile:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadReports = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading reports:', error);
        setReportsState([]);
        return;
      }
      setReportsState(data || []);
    } catch (err) {
      console.error('Unexpected error loading reports:', err);
      setReportsState([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const saveProfile = async () => {
  //   const profileData = {
  //     user_id: user!.id,
  //     ...formData,
  //   };

  //   try {
  //     // upsert requires primary key or conflict target; using .upsert(profileData, { onConflict: 'user_id' })
  //     const { data, error } = await supabase
  //       .from('profiles')
  //       .upsert(profileData, { onConflict: 'user_id' });

  //     if (error) {
  //       console.error('Error saving profile:', error);
  //       throw error;
  //     }
  //     console.log('Profile saved:', data);
  //     await loadProfile();
  //   } catch (err) {
  //     console.error('Error in saveProfile:', err);
  //     throw err;
  //   }
  // };


  const saveProfile = async () => {
    const profileData = {
      user_id: user!.id,
      github_url: formData.github_url || null,
      linkedin_url: formData.linkedin_url || null,
      blog_url: formData.blog_url || null,
      coding_platform_url: formData.coding_platform_url || null,
    };

    console.log("Attempting to upsert profileData:", profileData);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'user_id' })
        .select();

      if (error) {
        console.error('Error saving profile:', error);
        throw error;
      }

      console.log('Profile saved successfully:', data);
      await loadProfile();
    } catch (err) {
      console.error('Error in saveProfile:', err);
      throw err;
    }
  };


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
        .from('reports')
        .insert(reportData)
        .select();

      if (error) {
        console.error('Error inserting report:', error);
        throw error;
      }

      console.log('Report inserted:', data);
      await loadReports();
    } catch (err) {
      console.error('Error generating report:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const hasAnyUrl = Object.values(formData).some(url => url.trim() !== '');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ... UI remains unchanged ... */}
        {/* Use profileState and reportsState in the UI where previously profile and reports were used */}


        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Developer Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Add your profile links and generate your developer score report
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-6">Your Profile Links</h2>

              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Github className="h-5 w-5 mr-2" />
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    name="github_url"
                    value={formData.github_url}
                    onChange={handleInputChange}
                    placeholder="https://github.com/yourusername"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Linkedin className="h-5 w-5 mr-2 text-blue-600" />
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FileText className="h-5 w-5 mr-2 text-green-600" />
                    Technical Blog
                  </label>
                  <input
                    type="url"
                    name="blog_url"
                    value={formData.blog_url}
                    onChange={handleInputChange}
                    placeholder="https://yourblog.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Code className="h-5 w-5 mr-2 text-orange-600" />
                    Coding Platform (LeetCode, HackerRank, etc.)
                  </label>
                  <input
                    type="url"
                    name="coding_platform_url"
                    value={formData.coding_platform_url}
                    onChange={handleInputChange}
                    placeholder="https://leetcode.com/yourusername"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={generateReport}
                  disabled={analyzing || !hasAnyUrl}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {analyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing Your Profile...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-5 w-5" />
                      Generate New Report
                    </>
                  )}
                </button>

                {!hasAnyUrl && (
                  <p className="text-sm text-gray-500 text-center">
                    Add at least one profile link to generate a report
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Reports List */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-6">Your Reports</h2>

              {reportsState.length === 0 ? (
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No reports yet</p>
                  <p className="text-sm text-gray-400">Generate your first report to see your developer score</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reportsState.map((report) => (
                    <Link
                      key={report.id}
                      to={`/report/${report.id}`}
                      className="block p-4 border rounded-md hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-blue-600">
                          {report.total_score}
                        </span>
                        <span className="text-sm text-gray-500">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          {new Date(report.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        View detailed analysis
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>




      </div>
    </div>
  );
};

export default Dashboard;
