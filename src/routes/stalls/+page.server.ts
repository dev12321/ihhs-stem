import type { PageServerLoad } from './$types';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';

export const load: PageServerLoad = async () => {
    const { data: stalls, error } = await supabaseAdmin
        .from('stalls')
        .select('*')
        .order('category', { ascending: true });

    if (error) {
        console.error('Error fetching stalls:', error);
        return { stalls: [] };
    }

    return { stalls };
};
