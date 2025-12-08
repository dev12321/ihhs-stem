import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { SUPABASE_SERVICE_ROLE_KEY, SUPABASE_SECRET_KEY } from '$env/static/private'

// support both new and legacy key names
const supabaseKey = SUPABASE_SECRET_KEY || SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, supabaseKey)
