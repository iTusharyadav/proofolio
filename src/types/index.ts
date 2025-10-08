export interface User {
  id: string;
  email?: string;
}

export interface Profile {
  id: string;
  user_id: string;
  github_url?: string;
  linkedin_url?: string;
  blog_url?: string;
  coding_platform_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Report {
  id: string;
  user_id: string;
  github_score: number;
  linkedin_score: number;
  blog_score: number;
  coding_score: number;
  total_score: number;
  analysis_data: AnalysisData;
  created_at: string;
}

export interface AnalysisData {
  github?: {
    repos: number;
    stars: number;
    lastCommit: string;
    topLanguages: string[];
  };
  linkedin?: {
    networkStrength: number;
    activityLevel: string;
  };
  blog?: {
    postFrequency: number;
    avgWordsPerPost: number;
  };
  coding?: {
    problemsSolved: number;
    rank: string;
    contestRating: number;
  };
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}