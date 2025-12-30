import axios from "axios";

export type AnalyzerResult = {
  platform: string;
  username?: string | null;
  score: number;
  metrics: Record<string, any>;
  error?: boolean;
  details?: any;
};

export type Links = {
  github_url?: string;
  linkedin_url?: string;
  blog_url?: string;
  coding_platform_url?: string;
};

/**
 * Helper: safe username extractor from a URL
 */
function extractPathSegment(url: string, domainFragment: string): string | null {
  try {
    const u = new URL(url);
    if (!u.hostname.includes(domainFragment)) return null;
    const parts = u.pathname.split("/").filter(Boolean);
    // username is usually first segment
    return parts[0] ?? null;
  } catch {
    // fallback naive parsing
    const idx = url.indexOf(domainFragment);
    if (idx === -1) return null;
    const after = url.slice(idx + domainFragment.length);
    return after.split("/").filter(Boolean)[0] ?? null;
  }
}

/* ----------------------- GitHub ----------------------- */
export async function analyzeGitHub(
  githubUrl: string,
  githubToken?: string
): Promise<AnalyzerResult> {
  try {
    const username = extractPathSegment(githubUrl, "github.com");
    if (!username) {
      return { platform: "GitHub", score: 0, metrics: {}, error: true };
    }

    const headers: Record<string, string> = {};
    if (githubToken) headers["Authorization"] = `token ${githubToken}`;

    // Get user
    const userRes = await axios.get(`https://api.github.com/users/${username}`, {
      headers,
    });

    // Get repos (first 100)
    const repoRes = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`,
      { headers }
    );

    const repos: any[] = Array.isArray(repoRes.data) ? repoRes.data : [];
    const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
    const totalForks = repos.reduce((s, r) => s + (r.forks_count || 0), 0);
    const totalRepos = repos.length;
    const followers = userRes.data?.followers ?? 0;

    // Weighted scoring (normalized)
    const followersScore = Math.min(1, followers / 500) * 25; // up to 25
    const reposScore = Math.min(1, totalRepos / 100) * 20; // up to 20
    const starsScore = Math.min(1, totalStars / 500) * 35; // up to 35
    const forksScore = Math.min(1, totalForks / 200) * 20; // up to 20

    const score = Math.round(followersScore + reposScore + starsScore + forksScore);

    return {
      platform: "GitHub",
      username,
      score,
      metrics: {
        followers,
        public_repos: totalRepos,
        total_stars: totalStars,
        total_forks: totalForks,
        repos_sample: repos.slice(0, 6).map((r) => ({
          name: r.name,
          stars: r.stargazers_count,
          forks: r.forks_count,
          url: r.html_url,
          description: r.description,
        })),
      },
    };
  } catch (err) {
    console.error("analyzeGitHub error:", err);
    return { platform: "GitHub", score: 0, metrics: {}, error: true, details: err };
  }
}

/* ----------------------- LinkedIn (stub) -----------------------
   NOTE: LinkedIn requires server-side OAuth for real data. For now this
   returns a friendly stub so your UI works. Replace with a server-side
   OAuth flow + People API calls later.
*/
export async function analyzeLinkedIn(linkedinUrl: string): Promise<AnalyzerResult> {
  try {
    const username = extractPathSegment(linkedinUrl, "linkedin.com");
    // stubbed values — replace with real LinkedIn API call server-side
    return {
      platform: "LinkedIn",
      username,
      score: 70,
      metrics: {
        headline: "Software Engineer",
        connections: 300,
        endorsements: 12,
      },
    };
  } catch (err) {
    console.error("analyzeLinkedIn error:", err);
    return { platform: "LinkedIn", score: 0, metrics: {}, error: true, details: err };
  }
}

/* ----------------------- Blog (Dev.to / Medium RSS) ----------------------- */
export async function analyzeBlog(blogUrl: string, devtoToken?: string): Promise<AnalyzerResult> {
  try {
    if (blogUrl.includes("dev.to")) {
      // dev.to username is like https://dev.to/username
      const username = extractPathSegment(blogUrl, "dev.to");
      const headers: Record<string, string> = {};
      if (devtoToken) headers["api-key"] = devtoToken;
      const res = await axios.get(`https://dev.to/api/articles?username=${username}`, { headers });
      const articles = Array.isArray(res.data) ? res.data.length : 0;
      const totalReactions = (res.data || []).reduce((s: number, a: any) => s + (a.public_reactions_count || 0), 0);
      const score = Math.round(Math.min(100, articles * 8 + totalReactions / 5)); // simple formula

      return {
        platform: "Dev.to",
        username,
        score,
        metrics: { articles, totalReactions, exampleArticles: (res.data || []).slice(0, 5) },
      };
    }

    // Medium: use RSS feed (public)
    if (blogUrl.includes("medium.com") || blogUrl.includes("medium.com/@")) {
      // extract username after @ if present
      let username = null;
      try {
        const u = new URL(blogUrl);
        if (u.hostname.includes("medium.com")) {
          const parts = u.pathname.split("/").filter(Boolean);
          if (parts[0] === "@" && parts[1]) username = parts[1];
          else if (parts[0]) username = parts[0];
        }
      } catch {
        const after = blogUrl.split("medium.com/@")[1];
        username = after?.split("/")[0] ?? null;
      }

      const feedUrl = username ? `https://medium.com/feed/@${username}` : blogUrl;
      const res = await axios.get(feedUrl).catch(() => null);
      if (!res || !res.data) {
        // If the fetch fails, return a safe default (like a dummy score)
        return { platform: "Medium", username, score: 40, metrics: {}, error: false };
      }
      // count <item> occurrences as article count
      const xml = String(res.data);
      const matches = xml.match(/<item>/g) || [];
      const articles = matches.length;
      const score = Math.round(Math.min(100, articles * 6 + 10)); // rough formula

      return { platform: "Medium", username, score, metrics: { articles } };
    }

    // Unknown blog platform -> no data
    return { platform: "Blog", score: 0, metrics: {}, error: true };
  } catch (err) {
    console.error("analyzeBlog error:", err);
    return { platform: "Blog", score: 0, metrics: {}, error: true, details: err };
  }
}

/* ----------------------- Coding (LeetCode / Codeforces) ----------------------- */
export async function analyzeCoding(codingUrl: string): Promise<AnalyzerResult> {
  try {
    if (codingUrl.includes("leetcode.com")) {
      const username = extractPathSegment(codingUrl, "leetcode.com");
      if (!username) return { platform: "LeetCode", score: 0, metrics: {}, error: true };

      const query = {
        query: `{
          matchedUser(username: "${username}") {
            profile { ranking }
            submitStatsGlobal {
              acSubmissionNum { difficulty count }
            }
          }
        }`,
      };

      const res = await axios.post("https://leetcode.com/graphql", query).catch((e) => {
        // CORS or other errors may occur in browser; handle gracefully
        console.warn("LeetCode query failed:", e?.message || e);
        return null;
      });

      if (!res || !res.data || !res.data.data || !res.data.data.matchedUser) {
        return {
          platform: "LeetCode",
          username,
          score: 0,
          metrics: {},
          error: true,
        };
      }

      const stats = res.data.data.matchedUser.submitStatsGlobal.acSubmissionNum;
      const totalSolved = Array.isArray(stats) ? stats.reduce((s: number, x: any) => s + (x.count || 0), 0) : 0;
      const rank = res.data.data.matchedUser.profile?.ranking ?? null;

      // scoring: solved and ranking
      const solvedScore = Math.min(1, totalSolved / 200) * 70; // up to 70
      const rankScore = rank ? Math.min(1, 5000 / rank) * 30 : 0; // up to 30
      const score = Math.round(solvedScore + rankScore);

      return {
        platform: "LeetCode",
        username,
        score,
        metrics: { totalSolved, rank },
      };
    }

    if (codingUrl.includes("codeforces.com")) {
      const username = extractPathSegment(codingUrl, "codeforces.com") || codingUrl.split("/profile/")[1];
      if (!username) return { platform: "Codeforces", score: 0, metrics: {}, error: true };

      const infoRes = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`).catch(() => null);
      const statusRes = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`).catch(() => null);

      const rating = infoRes?.data?.result?.[0]?.rating ?? 0;
      const solved = Array.isArray(statusRes?.data?.result) ? statusRes.data.result.length : 0;

      const solvedScore = Math.min(1, solved / 1000) * 60;
      const ratingScore = Math.min(1, rating / 3000) * 40;
      const score = Math.round(solvedScore + ratingScore);

      return {
        platform: "Codeforces",
        username,
        score,
        metrics: { solved, rating },
      };
    }

    // Unknown coding site
    return { platform: "Coding", score: 0, metrics: {}, error: true };
  } catch (err) {
    console.error("analyzeCoding error:", err);
    return { platform: "Coding", score: 0, metrics: {}, error: true, details: err };
  }
}

/* ----------------------- Combine into Full Report (Refactored) ----------------------- */
/**
 * Generates the combined report by calling all platform analyzers.
 * Takes tokens as arguments for server-side security.
 */
export async function generateFullReport(
  links: Links,
  githubToken?: string, // Token passed securely from API route
  devtoToken?: string  // Token passed securely from API route
) {
  const results: { key: string; res: AnalyzerResult }[] = [];

  // GitHub
  if (links.github_url && links.github_url.trim()) {
    const res = await analyzeGitHub(links.github_url.trim(), githubToken); // Uses passed token
    results.push({ key: "github", res });
  }

  // LinkedIn (stub)
  if (links.linkedin_url && links.linkedin_url.trim()) {
    const res = await analyzeLinkedIn(links.linkedin_url.trim());
    results.push({ key: "linkedin", res });
  }

  // Blog
  if (links.blog_url && links.blog_url.trim()) {
    const res = await analyzeBlog(links.blog_url.trim(), devtoToken); // Uses passed token
    results.push({ key: "blog", res });
  }

  // Coding
  if (links.coding_platform_url && links.coding_platform_url.trim()) {
    const res = await analyzeCoding(links.coding_platform_url.trim());
    results.push({ key: "coding", res });
  }

  // Map to scores
  const githubScore = (results.find((r) => r.key === "github")?.res.score) ?? 0;
  const linkedinScore = (results.find((r) => r.key === "linkedin")?.res.score) ?? 0;
  const blogScore = (results.find((r) => r.key === "blog")?.res.score) ?? 0;
  const codingScore = (results.find((r) => r.key === "coding")?.res.score) ?? 0;

  const presentScores = [githubScore, linkedinScore, blogScore, codingScore].filter(s => s > 0);
  const presentCount = presentScores.length > 0 ? presentScores.length : 1;
  const totalRaw = presentScores.reduce((sum, score) => sum + score, 0);
  const totalScore = Math.round(totalRaw / presentCount);

  const analysisData: Record<string, AnalyzerResult | null> = {
    github: results.find((r) => r.key === "github")?.res ?? null,
    linkedin: results.find((r) => r.key === "linkedin")?.res ?? null,
    blog: results.find((r) => r.key === "blog")?.res ?? null,
    coding: results.find((r) => r.key === "coding")?.res ?? null,
  };

  return {
    githubScore,
    linkedinScore,
    blogScore,
    codingScore,
    totalScore,
    analysisData,
  };
}