import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
  global: {
    headers: {
      'X-Client-Info': 'panoramic-insight',
    },
  },
});

// Test the connection
supabase.from('articles').select('count').single()
  .then(() => console.log('Successfully connected to Supabase'))
  .catch(error => console.error('Failed to connect to Supabase:', error.message));