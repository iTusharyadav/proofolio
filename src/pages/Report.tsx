import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Github, Linkedin, FileText, Code, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../utils/supabase';
import ScoreChart from '../components/ScoreChart';
import { Report as ReportType } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Report: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [report, setReport] = useState<ReportType | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    loadReport();
  }, [id, user]);

  const loadReport = async () => {
    if (!id || !user) return;

    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (data) {
      setReport(data);
    } else if (error) {
      console.error('Error loading report:', error);
    }
    
    setLoading(false);
  };

  const downloadPDF = async () => {
    if (!report) return;
    
    setDownloading(true);
    
    try {
      const element = document.getElementById('report-content');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`DevScore-Report-${new Date(report.created_at).toLocaleDateString()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setDownloading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    return 'Needs Improvement';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Not Found</h2>
          <p className="text-gray-600">The requested report could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Developer Score Report</h1>
            <p className="text-gray-600 mt-2 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Generated on {new Date(report.created_at).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={downloadPDF}
            disabled={downloading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors flex items-center"
          >
            {downloading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            ) : (
              <Download className="mr-2 h-5 w-5" />
            )}
            {downloading ? 'Generating...' : 'Download PDF'}
          </button>
        </div>

        <div id="report-content" className="space-y-8">
          {/* Overall Score */}
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <div className="mb-4">
              <div className={`text-6xl font-bold ${getScoreColor(report.total_score)} mb-2`}>
                {report.total_score}
              </div>
              <div className="text-2xl text-gray-600">Overall Developer Score</div>
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mt-4 ${
                report.total_score >= 80 
                  ? 'bg-green-100 text-green-800' 
                  : report.total_score >= 60 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {getScoreBadge(report.total_score)}
              </div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <Github className="h-8 w-8 text-gray-900 mr-3" />
                <div>
                  <h3 className="font-semibold">GitHub</h3>
                  <div className={`text-2xl font-bold ${getScoreColor(report.github_score)}`}>
                    {report.github_score}
                  </div>
                </div>
              </div>
              {report.analysis_data.github && (
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Repositories: {report.analysis_data.github.repos}</div>
                  <div>Stars: {report.analysis_data.github.stars}</div>
                  <div>Languages: {report.analysis_data.github.topLanguages?.join(', ')}</div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <Linkedin className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-semibold">LinkedIn</h3>
                  <div className={`text-2xl font-bold ${getScoreColor(report.linkedin_score)}`}>
                    {report.linkedin_score}
                  </div>
                </div>
              </div>
              {report.analysis_data.linkedin && (
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Network: {report.analysis_data.linkedin.networkStrength}</div>
                  <div>Activity: {report.analysis_data.linkedin.activityLevel}</div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <FileText className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <h3 className="font-semibold">Blog</h3>
                  <div className={`text-2xl font-bold ${getScoreColor(report.blog_score)}`}>
                    {report.blog_score}
                  </div>
                </div>
              </div>
              {report.analysis_data.blog && (
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Posts: {report.analysis_data.blog.postFrequency}</div>
                  <div>Avg Words: {report.analysis_data.blog.avgWordsPerPost}</div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <Code className="h-8 w-8 text-orange-600 mr-3" />
                <div>
                  <h3 className="font-semibold">Coding</h3>
                  <div className={`text-2xl font-bold ${getScoreColor(report.coding_score)}`}>
                    {report.coding_score}
                  </div>
                </div>
              </div>
              {report.analysis_data.coding && (
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Problems: {report.analysis_data.coding.problemsSolved}</div>
                  <div>Rank: {report.analysis_data.coding.rank}</div>
                  <div>Rating: {report.analysis_data.coding.contestRating}</div>
                </div>
              )}
            </div>
          </div>

          {/* Charts */}
          <ScoreChart report={report} />

          {/* Recommendations */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
              Recommendations for Improvement
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Strengths</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {report.github_score >= 70 && <li>• Strong GitHub presence with good activity</li>}
                  {report.linkedin_score >= 70 && <li>• Well-connected professional network</li>}
                  {report.blog_score >= 70 && <li>• Regular technical writing and content creation</li>}
                  {report.coding_score >= 70 && <li>• Excellent problem-solving skills</li>}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Areas to Focus On</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {report.github_score < 70 && <li>• Increase GitHub activity and contributions</li>}
                  {report.linkedin_score < 70 && <li>• Expand professional network and engagement</li>}
                  {report.blog_score < 70 && <li>• Start or increase technical writing frequency</li>}
                  {report.coding_score < 70 && <li>• Practice more coding challenges and competitions</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;