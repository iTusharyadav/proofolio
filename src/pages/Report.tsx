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
} from 'lucide-react';
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-teal-400">
        Analyzing Data...
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-400">
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
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar showSignOut={false} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Back */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1 text-teal-400 mb-6 text-sm"
        >
          <ChevronLeft size={16} /> Back to Dashboard
        </button>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Overall Score */}
          <div className="bg-gray-800 p-6 sm:p-8 rounded-3xl border border-gray-700 flex flex-col items-center justify-center">
            <h2 className="text-gray-400 uppercase tracking-widest text-xs sm:text-sm mb-4">
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
                  className="text-gray-700"
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
          <div className="bg-gray-800 p-4 sm:p-6 rounded-3xl border border-gray-700 h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData} outerRadius="75%">
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#9CA3AF', fontSize: 11 }}
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
                className="bg-gray-800 p-5 rounded-2xl border border-gray-700 flex flex-col"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <section.icon className="text-teal-400" size={18} />
                    <h3 className="font-bold text-lg">{section.title}</h3>
                  </div>
                  <span
                    className={`text-xl font-black ${hasData ? 'text-teal-400' : 'text-gray-600'
                      }`}
                  >
                    {hasData ? section.score : 'N/A'}
                  </span>
                </div>

                {hasData ? (
                  <>
                    {section.id === 'github' && section.data.metrics && (
                      <div className="grid grid-cols-3 gap-2 mb-3 bg-gray-900/50 p-3 rounded-xl text-center">
                        <div>
                          <p className="text-[10px] text-gray-500">Repos</p>
                          <p className="font-bold text-teal-400">
                            {section.data.metrics.repos}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500">Stars</p>
                          <p className="font-bold text-teal-400">
                            {section.data.metrics.stars}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500">Commits</p>
                          <p className="font-bold text-teal-400">
                            {section.data.metrics.commits}
                          </p>
                        </div>
                      </div>
                    )}

                    <p className="text-gray-400 text-xs italic mb-3">
                      “{section.data.review}”
                    </p>

                    <div className="mt-auto">
                      <div className="flex items-center gap-2 text-teal-300 text-[10px] font-bold uppercase mb-1">
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
                    <p className="text-gray-500 text-sm italic">
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
