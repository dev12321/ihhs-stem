import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { ADMIN_EMAILS } from '$env/static/private';

export const load: LayoutServerLoad = async ({ locals }) => {
    const { session, user } = await locals.safeGetSession();

    if (!session || !user) {
        throw redirect(303, '/');
    }

    const adminEmails = (ADMIN_EMAILS || '').split(',').map(e => e.trim());

    if (!adminEmails.includes(user.email!)) {
        throw redirect(303, '/'); // Or show 403 page
    }

    return { session, user };
};
