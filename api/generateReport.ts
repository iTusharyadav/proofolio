import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// Secure Supabase client (uses SERVICE_ROLE_KEY, not exposed publicly)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// This is your secure backend endpoint
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { user_id, github_url, linkedin_url, blog_url, coding_platform_url } = req.body;

    // Validate input
    if (!user_id) {
      return res.status(400).json({ error: "Missing user_id" });
    }

    // TODO: replace this dummy scoring with your real logic or imported function
    const scores = {
      github_score: Math.floor(Math.random() * 25),
      linkedin_score: Math.floor(Math.random() * 25),
      blog_score: Math.floor(Math.random() * 25),
      coding_score: Math.floor(Math.random() * 25),
    };

    const total_score =
      scores.github_score +
      scores.linkedin_score +
      scores.blog_score +
      scores.coding_score;

    // Insert securely
    const { error } = await supabase.from("reports").insert({
      user_id,
      github_score: scores.github_score,
      linkedin_score: scores.linkedin_score,
      blog_score: scores.blog_score,
      coding_score: scores.coding_score,
      total_score,
      analysis_data: { github_url, linkedin_url, blog_url, coding_platform_url },
    });

    if (error) throw error;

    res.status(200).json({ success: true, total_score });
  } catch (err: any) {
    console.error("Error in generateReport:", err);
    res.status(500).json({ error: err.message });
  }
}
