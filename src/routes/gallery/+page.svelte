<script lang="ts">
    import { fade } from "svelte/transition";
    import Card from "$lib/components/ui/Card.svelte";
    import type { GalleryImage } from "$lib/types";

    let { data } = $props();
    const images = $derived(data.images as GalleryImage[]);
</script>

<div class="max-w-7xl mx-auto px-6 py-12">
    <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Event Gallery
        </h1>
        <p class="text-slate-400 max-w-2xl mx-auto">Highlights from the day.</p>
    </div>

    {#if images.length > 0}
        <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {#each images as image}
                <div class="break-inside-avoid" transition:fade>
                    <Card
                        class="overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
                    >
                        <img
                            src={image.image_url}
                            alt={image.caption || "Event image"}
                            class="w-full h-auto object-cover"
                            loading="lazy"
                        />
                        {#if image.caption}
                            <div
                                class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <p class="text-white text-sm">
                                    {image.caption}
                                </p>
                            </div>
                        {/if}
                    </Card>
                </div>
            {/each}
        </div>
    {:else}
        <div
            class="text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed"
        >
            <div class="text-4xl mb-4">📸</div>
            <h3 class="text-xl font-bold text-white mb-2">No photos yet</h3>
            <p class="text-slate-400">Check back later for updates!</p>
        </div>
    {/if}
</div>
