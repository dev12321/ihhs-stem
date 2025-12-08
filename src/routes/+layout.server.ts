
import type { LayoutServerLoad } from './$types';
import { ADMIN_EMAILS } from '$env/static/private';

export const load: LayoutServerLoad = async ({ locals }) => {
    const { session, user } = await locals.safeGetSession();

    const adminEmails = (ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase());

    console.log('--- DEBUG ADMIN CHECK ---');
    console.log('User Email:', user?.email);
    console.log('Required Admin Emails:', adminEmails);
    console.log('Env Var Raw:', ADMIN_EMAILS);

    const isAdmin = !!user && !!user.email && adminEmails.includes(user.email.toLowerCase());
    console.log('Is Admin Result:', isAdmin);
    console.log('-------------------------');

    return {
        session,
        user,
        isAdmin
    };
}
