import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// console.log('VITE_SUPABASE_URL is', import.meta.env.VITE_SUPABASE_URL);
// console.log('VITE_SUPABASE_ANON_KEY is', import.meta.env.VITE_SUPABASE_ANON_KEY);
