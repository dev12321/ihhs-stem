<script lang="ts">
    import Button from "$lib/components/ui/Button.svelte";
    import { onMount } from "svelte";

    let { value = $bindable(), name } = $props();

    let isUploading = $state(false);
    let fileInput: HTMLInputElement;
    let preview: string | null = $state(value || null);

    onMount(() => {
        if (value) preview = value;
    });

    async function resizeImage(file: File): Promise<Blob> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;
                const MAX_SIZE = 3000;

                if (width > height) {
                    if (width > MAX_SIZE) {
                        height *= MAX_SIZE / width;
                        width = MAX_SIZE;
                    }
                } else {
                    if (height > MAX_SIZE) {
                        width *= MAX_SIZE / height;
                        height = MAX_SIZE;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    reject(new Error("Failed to get canvas context"));
                    return;
                }
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob(
                    (blob) => {
                        if (blob) resolve(blob);
                        else reject(new Error("Canvas to Blob failed"));
                    },
                    "image/jpeg",
                    0.8,
                );
            };
            img.onerror = reject;
        });
    }

    async function handleFileSelect(e: Event) {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (!file) return;

        isUploading = true;

        try {
            // Resize image before upload
            const resizedBlob = await resizeImage(file);
            const newFilename = file.name.replace(/\.[^/.]+$/, "") + ".jpg";

            // 1. Get presigned URL
            const res = await fetch("/api/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    filename: newFilename,
                    contentType: "image/jpeg",
                }),
            });

            if (!res.ok) throw new Error("Failed to get upload URL");
            const { uploadUrl, publicUrl } = await res.json();

            // 2. Upload to R2
            const uploadRes = await fetch(uploadUrl, {
                method: "PUT",
                headers: { "Content-Type": "image/jpeg" },
                body: resizedBlob,
            });

            if (!uploadRes.ok) throw new Error("Upload failed");

            // 3. Update value
            value = publicUrl;
            preview = publicUrl;
        } catch (err) {
            console.error(err);
            alert("Upload failed. Please try again.");
        } finally {
            isUploading = false;
            if (fileInput) fileInput.value = "";
        }
    }

    function removeImage(e) {
        e.preventDefault();
        e.stopPropagation();
        value = "";
        preview = null;
    }
</script>

<div class="w-full">
    <input type="hidden" {name} bind:value />

    {#if preview}
        <div
            class="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 bg-white/5 group"
        >
            <img
                src={preview}
                alt="Preview"
                class="w-full h-full object-cover"
            />
            <div
                class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
                <Button
                    variant="ghost"
                    class="text-red-400 hover:text-red-300 bg-black/50"
                    onclick={removeImage}
                >
                    Remove Image
                </Button>
            </div>
        </div>
    {:else}
        <div
            class="w-full h-32 border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500/50 hover:bg-white/5 transition-colors"
            onclick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                fileInput.click();
            }}
            role="button"
            tabindex="0"
            onkeydown={(e) => e.key === "Enter" && fileInput.click()}
        >
            {#if isUploading}
                <div class="animate-spin text-2xl">⏳</div>
                <p class="text-sm text-slate-400 mt-2">Uploading...</p>
            {:else}
                <span class="text-2xl mb-2">📷</span>
                <p class="text-sm text-slate-400">Click to upload image</p>
            {/if}
        </div>
    {/if}

    <input
        bind:this={fileInput}
        type="file"
        accept="image/png, image/jpeg, image/gif, image/webp"
        class="hidden"
        onchange={handleFileSelect}
    />
</div>
