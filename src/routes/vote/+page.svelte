<script lang="ts">
    import { enhance } from "$app/forms";
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { fade } from "svelte/transition";
    import type { Stall, Vote } from "$lib/types";

    let { data, form } = $props();

    // Group stalls by category
    const stallsByCategory = $derived(
        (data.stalls as Stall[]).reduce(
            (acc: Record<string, Stall[]>, stall) => {
                if (!acc[stall.category]) acc[stall.category] = [];
                acc[stall.category].push(stall);
                return acc;
            },
            {},
        ),
    );

    // Track which categories use has voted in
    let votedCategories = $derived(
        new Set((data.userVotes as Vote[]).map((v) => v.category)),
    );
</script>

<div class="max-w-5xl mx-auto px-6 py-12">
    <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold text-white mb-2">Cast Your Vote</h1>
        <p class="text-slate-400">
            Select the best project in each category. You can only vote <strong
                >once per category</strong
            >.
        </p>
    </div>

    {#if form?.message}
        <div
            class="mb-8 p-4 rounded-xl border flex items-center justify-between
            {form.success
                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                : 'bg-red-500/10 border-red-500/20 text-red-400'}"
            transition:fade
        >
            <span>{form.message}</span>
            <button
                onclick={() => (form = null)}
                class="text-sm hover:underline">Dismiss</button
            >
        </div>
    {/if}

    <div class="space-y-16">
        {#each Object.entries(stallsByCategory) as [category, stalls]}
            <section class="relative">
                <div class="flex items-center gap-4 mb-6">
                    <h2 class="text-2xl font-bold text-white">{category}</h2>
                    <div class="h-px bg-white/10 flex-1"></div>
                    {#if votedCategories.has(category)}
                        <span
                            class="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider border border-green-500/20"
                        >
                            Voted
                        </span>
                    {:else}
                        <span
                            class="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider border border-indigo-500/20"
                        >
                            Open
                        </span>
                    {/if}
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                    {#each stalls as stall}
                        <Card
                            class="p-6 {votedCategories.has(category)
                                ? 'opacity-60 grayscale-[0.5]'
                                : ''}"
                        >
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h3 class="text-lg font-bold text-white">
                                        {stall.name}
                                    </h3>
                                    <p class="text-sm text-slate-400">
                                        {stall.students}
                                    </p>
                                </div>
                                <div
                                    class="text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded"
                                >
                                    #{stall.location || "00"}
                                </div>
                            </div>

                            <p class="text-slate-400 text-sm mb-6 line-clamp-2">
                                {stall.description}
                            </p>

                            {#if votedCategories.has(category)}
                                <Button
                                    disabled
                                    class="w-full bg-slate-700 text-slate-400 cursor-not-allowed shadow-none"
                                >
                                    Vote Cast
                                </Button>
                            {:else}
                                <form method="POST" action="?/vote" use:enhance>
                                    <input
                                        type="hidden"
                                        name="stallId"
                                        value={stall.id}
                                    />
                                    <input
                                        type="hidden"
                                        name="category"
                                        value={stall.category}
                                    />

                                    <Button type="submit" class="w-full">
                                        Vote for this Project
                                    </Button>
                                </form>
                            {/if}
                        </Card>
                    {/each}
                </div>
            </section>
        {/each}
    </div>
</div>
