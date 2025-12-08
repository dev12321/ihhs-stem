import { createBrowserClient } from '@supabase/ssr'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public'

// support both new and legacy key names
const supabaseKey = PUBLIC_SUPABASE_PUBLISHABLE_KEY || PUBLIC_SUPABASE_ANON_KEY;

export const createSupabaseClient = () => createBrowserClient(PUBLIC_SUPABASE_URL, supabaseKey)
