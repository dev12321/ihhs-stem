<script lang="ts">
    import { enhance } from "$app/forms";
    import Button from "$lib/components/ui/Button.svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import ImageUpload from "$lib/components/ui/ImageUpload.svelte";

    let { data, form } = $props();
    let isCreating = $state(false);

    // Initial state from form if available (e.g. after validation error)
    // cast to any to avoid strict union property access errors since not all form states have these props
    let imageUrl = $state((form as any)?.image_url ?? "");
    let caption = $state((form as any)?.caption ?? "");

    // Sync form errors/values back to state if they return from server
    $effect(() => {
        if (form) {
            const f = form as any;
            if (f.image_url) imageUrl = f.image_url;
            if (f.caption) caption = f.caption;
        }
    });
</script>

<div class="max-w-6xl mx-auto px-6 py-12">
    <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-white">Manage Gallery</h1>
        <Button
            onclick={() => (isCreating = !isCreating)}
            variant={isCreating ? "secondary" : "primary"}
        >
            {isCreating ? "Cancel" : "Add New Photo"}
        </Button>
    </div>

    <!-- Create Form -->
    {#if isCreating}
        <Card class="p-8 mb-8 border-indigo-500/30">
            <h2 class="text-xl font-bold text-white mb-6">Add New Photo</h2>
            <form
                method="POST"
                action="?/create"
                use:enhance={() => {
                    return async ({ result, update }) => {
                        if (result.type === "success") {
                            isCreating = false;
                            // Reset form
                            imageUrl = "";
                            caption = "";
                        }
                        await update();
                    };
                }}
            >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div class="block">
                        <span class="text-sm text-slate-400">Image *</span>
                        <ImageUpload name="image_url" bind:value={imageUrl} />
                    </div>

                    <label class="block">
                        <span class="text-sm text-slate-400">Caption</span>
                        <input
                            name="caption"
                            type="text"
                            bind:value={caption}
                            class="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                        />
                    </label>
                </div>

                {#if form?.message}
                    <p class="text-red-400 text-sm mb-4">{form.message}</p>
                {/if}

                <Button type="submit">Add Photo</Button>
            </form>
        </Card>
    {/if}

    <!-- List -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        {#each data.images as image}
            <div
                class="bg-white/5 border border-white/10 rounded-xl overflow-hidden group relative"
            >
                <img
                    src={image.image_url}
                    alt={image.caption}
                    class="w-full aspect-square object-cover"
                />
                <div
                    class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4"
                >
                    <p class="text-sm text-white mb-2 line-clamp-1">
                        {image.caption || "No caption"}
                    </p>
                    <form method="POST" action="?/delete" use:enhance>
                        <input type="hidden" name="id" value={image.id} />
                        <Button
                            type="submit"
                            variant="ghost"
                            size="sm"
                            class="w-full text-red-400 hover:bg-red-500/20 hover:text-red-300"
                        >
                            Delete
                        </Button>
                    </form>
                </div>
            </div>
        {/each}
    </div>
</div>
