<script lang="ts">
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";

    let { data } = $props();
</script>

<div class="max-w-7xl mx-auto px-6 py-12">
    <div class="flex justify-between items-center mb-12">
        <h1 class="text-3xl font-bold text-white">Admin Dashboard</h1>
        <div class="flex gap-3">
            <Button href="/admin/stalls" variant="secondary" size="sm"
                >Manage Stalls</Button
            >
            <Button href="/admin/gallery" variant="secondary" size="sm"
                >Manage Gallery</Button
            >
        </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card class="p-6">
            <h3
                class="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2"
            >
                Total Stalls
            </h3>
            <p class="text-4xl font-bold text-white">{data.stats.stalls}</p>
        </Card>

        <Card class="p-6">
            <h3
                class="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2"
            >
                Total Votes
            </h3>
            <p class="text-4xl font-bold text-white">{data.stats.votes}</p>
        </Card>

        <Card class="p-6">
            <h3
                class="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2"
            >
                Gallery Images
            </h3>
            <p class="text-4xl font-bold text-white">{data.stats.gallery}</p>
        </Card>
    </div>

    <div class="mb-12">
        <h2 class="text-2xl font-bold text-white mb-6">Live Leaderboard</h2>
        <div
            class="bg-slate-900/50 rounded-2xl border border-white/5 overflow-hidden"
        >
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead>
                        <tr class="border-b border-white/5 bg-white/5">
                            <th
                                class="px-6 py-4 text-sm font-semibold text-slate-300"
                                >Rank</th
                            >
                            <th
                                class="px-6 py-4 text-sm font-semibold text-slate-300"
                                >Stall Name</th
                            >
                            <th
                                class="px-6 py-4 text-sm font-semibold text-slate-300"
                                >Category</th
                            >
                            <th
                                class="px-6 py-4 text-sm font-semibold text-slate-300 text-right"
                                >Votes</th
                            >
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                        {#each data.leaderboard as stall, i}
                            <tr class="hover:bg-white/5 transition-colors">
                                <td class="px-6 py-4 text-slate-400 font-mono"
                                    >#{i + 1}</td
                                >
                                <td class="px-6 py-4">
                                    <div class="font-medium text-white">
                                        {stall.name}
                                    </div>
                                    <div class="text-xs text-slate-500">
                                        {stall.students || "No students listed"}
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400"
                                    >
                                        {stall.category}
                                    </span>
                                </td>
                                <td
                                    class="px-6 py-4 text-right font-bold text-white text-lg"
                                >
                                    {stall.vote_count}
                                </td>
                            </tr>
                        {/each}
                        {#if data.leaderboard.length === 0}
                            <tr>
                                <td
                                    colspan="4"
                                    class="px-6 py-12 text-center text-slate-500"
                                >
                                    No stalls found.
                                </td>
                            </tr>
                        {/if}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div
        class="p-8 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center"
    >
        <h2 class="text-xl font-bold text-white mb-2">Welcome Admin</h2>
        <p class="text-slate-400">
            Use the navigation above to manage content.
        </p>
    </div>
</div>
