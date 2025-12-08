import type { PageServerLoad } from './$types';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';

export const load: PageServerLoad = async () => {
    const { data: images } = await supabaseAdmin
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

    return {
        images: images || []
    };
};
