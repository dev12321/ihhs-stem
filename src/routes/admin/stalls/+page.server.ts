import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';

export const load: PageServerLoad = async () => {
    const { data: stalls, error } = await supabaseAdmin
        .from('stalls')
        .select('*')
        .order('created_at', { ascending: false });

    return { stalls: stalls || [] };
};

export const actions: Actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name') as string;
        const description = data.get('description') as string;
        const category = data.get('category') as string;
        const students = data.get('students') as string;
        const class_grade = data.get('class_grade') as string;
        const location = data.get('location') as string;
        const image_url = data.get('image_url') as string;

        if (!name || !category) {
            return fail(400, {
                message: 'Name and Category are required',
                name, description, category, students, class_grade, location, image_url
            });
        }

        const { error } = await supabaseAdmin.from('stalls').insert({
            name, description, category, students, class_grade, location, image_url
        });

        if (error) {
            return fail(500, {
                message: error.message,
                name, description, category, students, class_grade, location, image_url
            });
        }

        return { success: true };
    },

    update: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id') as string;
        const name = data.get('name') as string;
        const description = data.get('description') as string;
        const category = data.get('category') as string;
        const students = data.get('students') as string;
        const class_grade = data.get('class_grade') as string;
        const location = data.get('location') as string;
        const image_url = data.get('image_url') as string;

        if (!id || !name || !category) {
            return fail(400, {
                message: 'ID, Name and Category are required',
                name, description, category, students, class_grade, location, image_url
            });
        }

        const { error } = await supabaseAdmin.from('stalls').update({
            name, description, category, students, class_grade, location, image_url
        }).eq('id', id);

        if (error) {
            return fail(500, {
                message: error.message,
                name, description, category, students, class_grade, location, image_url
            });
        }

        return { success: true };
    },

    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id') as string;

        if (!id) return fail(400, { message: 'ID required' });

        const { error } = await supabaseAdmin.from('stalls').delete().eq('id', id);

        if (error) return fail(500, { message: error.message });

        return { success: true };
    }
};
