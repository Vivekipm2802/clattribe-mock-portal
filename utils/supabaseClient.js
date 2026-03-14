
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Client-side Supabase — uses anon key only (safe for browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase — uses service key for admin operations
// This only runs server-side (API routes, getServerSideProps) so the key is never sent to the browser.
// IMPORTANT: Move SUPABASE_SERVICE_KEY to a non-NEXT_PUBLIC_ env var in production.
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY
export const serversupabase = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;
