import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Report } from '../types';

interface ScoreChartProps {
  report: Report;
}

const ScoreChart: React.FC<ScoreChartProps> = ({ report }) => {
  const radarData = [
    { subject: 'GitHub', score: report.github_score, fullMark: 100 },
    { subject: 'LinkedIn', score: report.linkedin_score, fullMark: 100 },
    { subject: 'Blog', score: report.blog_score, fullMark: 100 },
    { subject: 'Coding', score: report.coding_score, fullMark: 100 },
  ];

  const barData = [
    { name: 'GitHub', score: report.github_score },
    { name: 'LinkedIn', score: report.linkedin_score },
    { name: 'Blog', score: report.blog_score },
    { name: 'Coding', score: report.coding_score },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Score Breakdown - Radar</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Score Breakdown - Bars</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScoreChart;