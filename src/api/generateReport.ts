import { createClient } from '@supabase/supabase-js';
import { generateFullReport, Links } from '../src/utils/analysis';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// --- 1. SECURE INITIALIZATION ---
// Get keys from Vercel's private environment (NOT VITE_ keys)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // We'll set this in Vercel later

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error('Server missing critical Supabase environment variables (SUPABASE_URL or SERVICE_ROLE_KEY).');
}

// Create Supabase client using the secure Service Role Key
const supabaseServiceRole = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
});

export default async function generateReport(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Expect user ID and profile links from the frontend
    const { user_id, links } = req.body;

    if (!user_id || !links) {
        return res.status(400).json({ error: 'Missing user_id or profile links in request body.' });
    }

    try {
        // --- 2. GENERATE SCORES ---
        // We pass the GITHUB_TOKEN securely from the server environment
        // For dummy data (LinkedIn, Blog, Coding), tokens will be undefined, which is fine.
        const reportData = await generateFullReport(links as Links, GITHUB_TOKEN, undefined); // Pass GITHUB_TOKEN

        // --- 3. SECURE DATABASE INSERTION ---
        const { data: insertedReport, error: insertError } = await supabaseServiceRole
            .from('reports')
            .insert({
                user_id: user_id,
                github_score: reportData.githubScore,
                linkedin_score: reportData.linkedinScore,
                blog_score: reportData.blogScore,
                coding_score: reportData.codingScore,
                total_score: reportData.totalScore,
                analysis_data: JSON.stringify(reportData.analysisData), // Store JSON object as string
            })
            .select('id, total_score')
            .single();

        if (insertError) throw insertError;

        // Return the report ID to the client
        return res.status(200).json({ success: true, report: insertedReport });

    } catch (error) {
        console.error('Server Error generating report:', error);
        return res.status(500).json({ error: 'Failed to generate and save report.' });
    }
}