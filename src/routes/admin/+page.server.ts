import type { PageServerLoad } from './$types';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';

export const load: PageServerLoad = async () => {
    // Fetch stats
    const { count: stallsCount } = await supabaseAdmin.from('stalls').select('*', { count: 'exact', head: true });
    const { count: votesCount } = await supabaseAdmin.from('votes').select('*', { count: 'exact', head: true });
    const { count: galleryCount } = await supabaseAdmin.from('gallery').select('*', { count: 'exact', head: true });

    // Fetch leaderboard
    // We fetch all stalls and all votes, then aggregate in JS for simplicity given the likely scale.
    // Ideally, we'd use a view or RPC for this.
    const { data: stalls } = await supabaseAdmin.from('stalls').select('*');
    const { data: votes } = await supabaseAdmin.from('votes').select('stall_id');

    const voteCounts = (votes || []).reduce((acc, vote) => {
        acc[vote.stall_id] = (acc[vote.stall_id] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const leaderboard = (stalls || []).map(stall => ({
        ...stall,
        vote_count: voteCounts[stall.id] || 0
    })).sort((a, b) => b.vote_count - a.vote_count);

    return {
        stats: {
            stalls: stallsCount || 0,
            votes: votesCount || 0,
            gallery: galleryCount || 0
        },
        leaderboard
    };
};
