
import { SupabaseClient, Session } from '@supabase/supabase-js'
import { Database } from '$lib/database.types'

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>
			session: Session | null
			user: User | null
		}
		interface PageData {
			session: Session | null
		}
		// interface Error {}
		// interface Platform {}
	}
}

declare module '$env/static/public' {
	export const PUBLIC_SUPABASE_URL: string;
	export const PUBLIC_SUPABASE_ANON_KEY: string;
	export const PUBLIC_SUPABASE_PUBLISHABLE_KEY: string | undefined;
}

declare module '$env/static/private' {
	export const SUPABASE_SERVICE_ROLE_KEY: string;
	export const SUPABASE_SECRET_KEY: string | undefined;
	export const DATA_PROXY_URL: string | undefined;
	export const ADMIN_EMAILS: string | undefined;
	export const AUTH_SECRET: string;
	export const AUTH_GOOGLE_ID: string;
	export const AUTH_GOOGLE_SECRET: string;
}

export { }
