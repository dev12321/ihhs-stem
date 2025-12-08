<script lang="ts">
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import type { Stall } from "$lib/types";

    let { data } = $props();
    let selectedCategory = $state("All");

    // Extract unique categories
    const categories = $derived([
        "All",
        ...new Set((data.stalls as Stall[]).map((s) => s.category)),
    ]);

    // Filter stalls
    let filteredStalls = $derived(
        selectedCategory === "All"
            ? (data.stalls as Stall[])
            : (data.stalls as Stall[]).filter(
                  (s) => s.category === selectedCategory,
              ),
    );
</script>

<div class="max-w-7xl mx-auto px-6 py-12">
    <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Stalls
        </h1>
        <p class="text-slate-400 max-w-2xl mx-auto">
            Discover the amazing projects created by our talented students.
            Filter by category to find specific topics.
        </p>
    </div>

    <!-- Category Filter -->
    <div class="flex flex-wrap justify-center gap-3 mb-16">
        {#each categories as category}
            <button
                class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                {selectedCategory === category
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'}"
                onclick={() => (selectedCategory = category)}
            >
                {category}
            </button>
        {/each}
    </div>

    <!-- Stalls Grid -->
    {#if filteredStalls.length > 0}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each filteredStalls as stall (stall.id)}
                <Card
                    class="flex flex-col h-full group hover:shadow-indigo-500/10"
                >
                    <div
                        class="aspect-video bg-slate-900 relative overflow-hidden"
                    >
                        {#if stall.image_url}
                            <img
                                src={stall.image_url}
                                alt={stall.name}
                                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        {:else}
                            <div
                                class="w-full h-full flex items-center justify-center bg-indigo-900/10 text-indigo-500 text-4xl"
                            >
                                🔬
                            </div>
                        {/if}
                        <div
                            class="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-medium text-white border border-white/10"
                        >
                            {stall.category}
                        </div>
                    </div>

                    <div class="p-6 flex flex-col flex-1">
                        <div class="flex justify-between items-start mb-3">
                            <h3
                                class="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors"
                            >
                                {stall.name}
                            </h3>
                            <span
                                class="text-xs text-slate-500 font-mono border border-white/10 px-2 py-1 rounded"
                            >
                                Plot {stall.location || "TBA"}
                            </span>
                        </div>

                        <p
                            class="text-slate-400 text-sm mb-6 flex-1 line-clamp-3"
                        >
                            {stall.description || "No description provided."}
                        </p>

                        <div class="pt-4 border-t border-white/5">
                            <div
                                class="flex items-center gap-3 text-sm text-slate-300 mb-4"
                            >
                                <div
                                    class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500"
                                >
                                    {(stall.class_grade || "9").replace(
                                        /\D/g,
                                        "",
                                    )}
                                </div>
                                <div>
                                    <p class="font-medium text-white">
                                        {stall.students || "Students"}
                                    </p>
                                    <p class="text-xs text-slate-500">
                                        {stall.class_grade || "Grade 10"}
                                    </p>
                                </div>
                            </div>

                            <Button
                                href={`/vote?stall=${stall.id}`}
                                variant="outline"
                                size="sm"
                                class="w-full"
                            >
                                Vote for {stall.name}
                            </Button>
                        </div>
                    </div>
                </Card>
            {/each}
        </div>
    {:else}
        <div
            class="text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed"
        >
            <h3 class="text-xl font-bold text-white mb-2">No stalls found</h3>
            <p class="text-slate-400">
                Try selecting a different category or come back later.
            </p>
        </div>
    {/if}
</div>
