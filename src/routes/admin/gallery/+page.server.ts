import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';

export const load: PageServerLoad = async () => {
    const { data: images, error } = await supabaseAdmin
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

    return { images: images || [] };
};

export const actions: Actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const image_url = data.get('image_url') as string;
        const caption = data.get('caption') as string;

        if (!image_url) {
            return fail(400, { message: 'Image URL is required', image_url, caption });
        }

        const { error } = await supabaseAdmin.from('gallery').insert({
            image_url, caption
        });

        if (error) {
            return fail(500, { message: error.message, image_url, caption });
        }

        return { success: true };
    },

    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id') as string;

        if (!id) return fail(400, { message: 'ID required' });

        const { error } = await supabaseAdmin.from('gallery').delete().eq('id', id);

        if (error) return fail(500, { message: error.message });

        return { success: true };
    }
};
