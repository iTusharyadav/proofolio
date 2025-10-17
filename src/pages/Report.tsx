import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabase";
import {
  Loader2,
  FileDown,
  Star,
  Github,
  Linkedin,
  FileText,
  Code,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Report() {
  const { id } = useParams();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadReport();
  }, [id]);

  const loadReport = async () => {
    try {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data && typeof data.analysis_data === "string") {
        data.analysis_data = JSON.parse(data.analysis_data);
      }
      setReport(data);
    } catch (err) {
      console.error("Error loading report:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    const input = reportRef.current;

    const canvas = await html2canvas(input, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 190;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 10;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`developer_report_${id}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <Loader2 className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 dark:text-gray-300">
        Report not found.
      </div>
    );
  }

  const analysis = report.analysis_data || {};
  const platforms = ["github", "linkedin", "blog", "coding"];
  const radarData = platforms.map((p) => ({
    platform: p.charAt(0).toUpperCase() + p.slice(1),
    score: analysis[p]?.score || 0,
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 pt-28 pb-10 px-6">
      {/* pt-28 fixes overlap with sticky navbar */}
      <div className="max-w-5xl mx-auto" ref={reportRef}>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 text-blue-600 dark:text-blue-400">
            Developer Report
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Generated on {new Date(report.created_at).toLocaleString()}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg shadow">
              <Star className="text-yellow-400 mr-2" />
              <span className="font-medium">Overall Score:</span>
              <span className="ml-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
                {report.total_score}
              </span>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              <FileDown className="h-5 w-5 mr-2" />
              Download Report (PDF)
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow mb-10">
          <h2 className="text-xl font-semibold mb-3">Summary</h2>
          <p className="text-gray-600 dark:text-gray-300">
            This report provides an overview of your developer profile
            performance across GitHub, LinkedIn, Blog, and coding platforms.
            Scores are derived based on engagement, activity, and quality
            metrics.
          </p>
        </div>

        {/* Radar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
          <div className="h-80">
            <ResponsiveContainer>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="platform" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Scores */}
        <div className="grid md:grid-cols-2 gap-6">
          {platforms.map((p) => {
            const info = analysis[p];
            if (!info) return null;

            const iconMap: any = {
              github: <Github className="h-6 w-6 text-gray-700 dark:text-gray-300" />,
              linkedin: <Linkedin className="h-6 w-6 text-blue-600" />,
              blog: <FileText className="h-6 w-6 text-green-500" />,
              coding: <Code className="h-6 w-6 text-orange-500" />,
            };

            return (
              <div
                key={p}
                className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition hover:shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {iconMap[p]}
                  <h3 className="text-lg font-semibold ml-2 capitalize">
                    {info.platform || p}
                  </h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-3">
                  Score:{" "}
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {info.score}
                  </span>
                </p>
                {info.metrics && Object.keys(info.metrics).length > 0 ? (
                  <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                    {Object.entries(info.metrics).map(([key, value]) => (
                      <li key={key}>
                        <span className="font-medium capitalize">{key}:</span>{" "}
                        {String(value)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No detailed metrics available.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
