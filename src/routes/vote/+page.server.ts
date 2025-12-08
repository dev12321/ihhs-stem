import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    // Check authentication used Supabase
    const { session, user } = await locals.safeGetSession();
    if (!session || !user) {
        // We aren't redirecting here, we let the UI handle showing "Login to vote" or redirecting
        // But for this protected route, a redirect makes sense
        throw redirect(303, '/');
    }

    const { supabase } = locals;

    // Fetch all stalls
    const { data: stalls } = await supabase
        .from('stalls')
        .select('*')
        .order('category');

    // Fetch user's existing votes
    const { data: userVotes } = await supabase
        .from('votes')
        .select('category, stall_id')
        .eq('user_email', user.email!);

    return {
        stalls: stalls || [],
        userVotes: userVotes || []
    };
};

export const actions: Actions = {
    vote: async ({ request, locals }) => {
        const { session, user } = await locals.safeGetSession();
        if (!session || !user) return fail(401, { message: 'Unauthorized' });

        const data = await request.formData();
        const stallId = data.get('stallId') as string;
        const category = data.get('category') as string;

        if (!stallId || !category) return fail(400, { message: 'Missing data' });
        const { supabase } = locals;

        // Check if user already voted in this category
        const { data: existingVote } = await supabase
            .from('votes')
            .select('*')
            .eq('user_email', user.email!)
            .eq('category', category)
            .single();

        if (existingVote) {
            return fail(400, { message: `You have already voted for the ${category} category.` });
        }

        // Insert Vote
        const { error } = await supabase
            .from('votes')
            .insert({
                stall_id: stallId,
                user_email: user.email!,
                category: category
            });

        if (error) {
            console.error("Voting error", error);
            return fail(500, { message: 'Failed to cast vote. Please try again.' });
        }

        return { success: true, message: 'Vote cast successfully!', category };
    }
};
