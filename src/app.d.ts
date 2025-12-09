
import { SupabaseClient, Session, User } from '@supabase/supabase-js'
import { Database } from '$lib/database.types'

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>
			session: Session | null
			user: User | null
			isAdmin: boolean
		}
		interface PageData {
			session: Session | null
			isAdmin?: boolean
		}
		// interface Error {}
		// interface Platform {}
	}
}

declare module '$env/static/public' {
	export const PUBLIC_SUPABASE_URL: string;
	export const PUBLIC_SUPABASE_ANON_KEY: string;
	export const PUBLIC_SUPABASE_PUBLISHABLE_KEY: string | undefined;
	export const PUBLIC_VERCEL_URL: string;
	export const PUBLIC_R2_DOMAIN: string;
}

declare module '$env/static/private' {
	export const SUPABASE_SECRET_KEY: string | undefined;
	export const DATA_PROXY_URL: string | undefined;
	export const ADMIN_EMAILS: string | undefined;
	export const AUTH_SECRET: string;
	export const AUTH_GOOGLE_ID: string;
	export const AUTH_GOOGLE_SECRET: string;
	export const R2_ACCOUNT_ID: string;
	export const R2_ACCESS_KEY_ID: string;
	export const R2_SECRET_ACCESS_KEY: string;
	export const R2_BUCKET_NAME: string;
}

export { }
