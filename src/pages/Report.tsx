import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import {
  ChevronLeft,
  Github,
  Linkedin,
  BookOpen,
  Code,
  Lightbulb,
  Sun,
  Moon,
  Loader,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../utils/supabase';
import Navbar from '../components/Navbar';

// --------------------
// Types
// --------------------
interface SectionAnalysis {
  review: string;
  suggestions: string[];
  metrics?: {
    repos?: number;
    stars?: number;
    commits?: number;
  };
}

interface AnalysisData {
  github: SectionAnalysis;
  linkedin: SectionAnalysis;
  blog: SectionAnalysis;
  coding: SectionAnalysis;
}

interface ReportData {
  id: string;
  total_score: number;
  github_score: number;
  linkedin_score: number;
  blog_score: number;
  coding_score: number;
  analysis_data: AnalysisData;
}

// --------------------
// Component
// --------------------
const Report: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        setReport({
          ...data,
          analysis_data: JSON.parse(data.analysis_data),
        });
      }

      setLoading(false);
    };

    fetchReport();
  }, [id]);

  // --------------------
  // Loading / Error
  // --------------------
  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="flex flex-col items-center gap-4">
          <Loader className={`h-8 w-8 animate-spin ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Analyzing Data...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-gray-50 text-gray-600'} flex items-center justify-center`}>
        Report not found
      </div>
    );
  }

  // --------------------
  // Chart Data
  // --------------------
  const chartData = [
    { subject: 'GitHub', score: report.github_score },
    { subject: 'LinkedIn', score: report.linkedin_score },
    { subject: 'Blog', score: report.blog_score },
    { subject: 'Coding', score: report.coding_score },
  ];

  const analysis = report.analysis_data;

  // --------------------
  // UI
  // --------------------
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Back */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className={`flex items-center gap-1 ${isDark ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-500'} text-sm`}
          >
            <ChevronLeft size={16} /> Back to Dashboard
          </button>
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-blue-600" />}
          </button>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Overall Score */}
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 sm:p-8 rounded-3xl border flex flex-col items-center justify-center`}>
            <h2 className={`${isDark ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-widest text-xs sm:text-sm mb-4`}>
              Overall DevScore
            </h2>

            <div className="relative w-40 h-40 sm:w-48 sm:h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  className={isDark ? "text-gray-700" : "text-gray-300"}
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 72}
                  strokeDashoffset={
                    2 * Math.PI * 72 -
                    (2 * Math.PI * 72 * report.total_score) / 100
                  }
                  className="text-teal-400 transition-all duration-1000"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-4xl sm:text-6xl font-black">
                {report.total_score}
              </span>
            </div>
          </div>

          {/* Radar Chart */}
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 sm:p-6 rounded-3xl border h-72 sm:h-80`}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData} outerRadius="75%">
                <PolarGrid stroke={isDark ? "#374151" : "#e5e7eb"} />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 11 }}
                />
                <Radar
                  dataKey="score"
                  stroke="#2DD4BF"
                  fill="#2DD4BF"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {[
            { id: 'github', title: 'GitHub', icon: Github, score: report.github_score, data: analysis.github },
            { id: 'linkedin', title: 'LinkedIn', icon: Linkedin, score: report.linkedin_score, data: analysis.linkedin },
            { id: 'blog', title: 'Technical Blog', icon: BookOpen, score: report.blog_score, data: analysis.blog },
            { id: 'coding', title: 'Coding Skills', icon: Code, score: report.coding_score, data: analysis.coding },
          ].map((section) => {
            const hasData = section.score > 0;

            return (
              <div
                key={section.id}
                className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-5 rounded-2xl border flex flex-col`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <section.icon className={isDark ? "text-teal-400" : "text-teal-600"} size={18} />
                    <h3 className="font-bold text-lg">{section.title}</h3>
                  </div>
                  <span
                    className={`text-xl font-black ${hasData ? (isDark ? 'text-teal-400' : 'text-teal-600') : (isDark ? 'text-gray-600' : 'text-gray-400')}`}
                  >
                    {hasData ? section.score : 'N/A'}
                  </span>
                </div>

                {hasData ? (
                  <>
                    {section.id === 'github' && section.data.metrics && (
                      <div className={`grid grid-cols-3 gap-2 mb-3 ${isDark ? 'bg-gray-900/50' : 'bg-gray-100/50'} p-3 rounded-xl text-center`}>
                        <div>
                          <p className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Repos</p>
                          <p className={`font-bold ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
                            {section.data.metrics.repos}
                          </p>
                        </div>
                        <div>
                          <p className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Stars</p>
                          <p className={`font-bold ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
                            {section.data.metrics.stars}
                          </p>
                        </div>
                        <div>
                          <p className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Commits</p>
                          <p className={`font-bold ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
                            {section.data.metrics.commits}
                          </p>
                        </div>
                      </div>
                    )}

                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs italic mb-3`}>
                      "{section.data.review}"
                    </p>

                    <div className="mt-auto">
                      <div className={`flex items-center gap-2 ${isDark ? 'text-teal-300' : 'text-teal-600'} text-[10px] font-bold uppercase mb-1`}>
                        <Lightbulb size={12} /> Suggestions
                      </div>
                      <ul className="text-xs text-gray-300 list-disc list-inside space-y-1">
                        {section.data.suggestions.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <p className={`${isDark ? 'text-gray-500' : 'text-gray-600'} text-sm italic`}>
                      No data provided
                    </p>
                    <button className="mt-2 text-xs text-teal-500 hover:underline">
                      Add link to analyze
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Report;
