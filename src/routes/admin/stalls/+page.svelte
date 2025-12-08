<script lang="ts">
    import { enhance } from "$app/forms";
    import Button from "$lib/components/ui/Button.svelte";
    import Card from "$lib/components/ui/Card.svelte";

    let { data, form } = $props();
    let isCreating = $state(false);
</script>

<div class="max-w-6xl mx-auto px-6 py-12">
    <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-white">Manage Stalls</h1>
        <Button
            onclick={() => (isCreating = !isCreating)}
            variant={isCreating ? "secondary" : "primary"}
        >
            {isCreating ? "Cancel" : "Add New Stall"}
        </Button>
    </div>

    <!-- Create Form -->
    {#if isCreating}
        <Card class="p-8 mb-8 border-indigo-500/30">
            <h2 class="text-xl font-bold text-white mb-6">Add New Stall</h2>
            <form
                method="POST"
                action="?/create"
                use:enhance={() => {
                    return async ({ result, update }) => {
                        if (result.type === "success") isCreating = false;
                        await update();
                    };
                }}
            >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <label class="block">
                        <span class="text-sm text-slate-400">Stall Name *</span>
                        <input
                            name="name"
                            type="text"
                            required
                            class="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                        />
                    </label>

                    <label class="block">
                        <span class="text-sm text-slate-400">Category *</span>
                        <select
                            name="category"
                            required
                            class="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 [&>option]:text-black"
                        >
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Biology">Biology</option>
                            <option value="Maths">Maths</option>
                            <option value="Robotics">Robotics</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>

                    <label class="block">
                        <span class="text-sm text-slate-400">Students Name</span
                        >
                        <input
                            name="students"
                            type="text"
                            placeholder="John Doe, Jane Smith"
                            class="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                        />
                    </label>

                    <label class="block">
                        <span class="text-sm text-slate-400">Class/Grade</span>
                        <input
                            name="class_grade"
                            type="text"
                            placeholder="Class 10"
                            class="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                        />
                    </label>

                    <label class="block">
                        <span class="text-sm text-slate-400">Location/Plot</span
                        >
                        <input
                            name="location"
                            type="text"
                            class="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                        />
                    </label>

                    <label class="block">
                        <span class="text-sm text-slate-400">Image URL</span>
                        <input
                            name="image_url"
                            type="text"
                            placeholder="https://..."
                            class="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                        />
                    </label>
                </div>

                <label class="block mb-6">
                    <span class="text-sm text-slate-400">Description</span>
                    <textarea
                        name="description"
                        rows="3"
                        class="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    ></textarea>
                </label>

                <Button type="submit" class="w-full md:w-auto"
                    >Save Stall</Button
                >
            </form>
        </Card>
    {/if}

    <!-- List -->
    <div class="space-y-4">
        {#each data.stalls as stall}
            <div
                class="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4"
            >
                <div class="flex items-center gap-4 flex-1">
                    {#if stall.image_url}
                        <img
                            src={stall.image_url}
                            alt={stall.name}
                            class="w-16 h-16 rounded-lg object-cover"
                        />
                    {:else}
                        <div
                            class="w-16 h-16 rounded-lg bg-indigo-500/20 flex items-center justify-center text-xl"
                        >
                            🔬
                        </div>
                    {/if}
                    <div>
                        <h3 class="font-bold text-white">{stall.name}</h3>
                        <div class="flex gap-2 text-xs text-slate-400 mt-1">
                            <span class="bg-white/5 px-2 py-0.5 rounded"
                                >{stall.category}</span
                            >
                            <span>{stall.students}</span>
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <form method="POST" action="?/delete" use:enhance>
                        <input type="hidden" name="id" value={stall.id} />
                        <Button
                            type="submit"
                            variant="ghost"
                            size="sm"
                            class="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                            Delete
                        </Button>
                    </form>
                </div>
            </div>
        {/each}
    </div>
</div>
