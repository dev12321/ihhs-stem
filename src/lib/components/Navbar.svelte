<script lang="ts">
    import { page } from "$app/stores";
    import Button from "./ui/Button.svelte";
    import { createSupabaseClient } from "$lib/supabase";
    import type { Session } from "@supabase/supabase-js";

    import { PUBLIC_VERCEL_URL } from "$env/static/public";

    let { session } = $props<{ session: Session | null }>();
    const supabase = createSupabaseClient();

    const links = [
        { name: "Home", href: "/" },
        { name: "Stalls", href: "/stalls" },
        { name: "Gallery", href: "/gallery" },
        { name: "Vote", href: "/vote" },
    ];

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${PUBLIC_VERCEL_URL}/auth/callback`,
            },
        });
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.reload();
    };
</script>

<nav
    class="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-lg"
>
    <!-- Logo -->
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" class="flex items-center gap-3 group">
            <div
                class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20 transition-transform duration-300 group-hover:scale-110"
            >
                S
            </div>
            <span
                class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:to-white transition-all"
            >
                STEM 2025
            </span>
        </a>

        <!-- Desktop Links -->
        <div
            class="hidden md:flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/5 backdrop-blur-md"
        >
            {#each links as link}
                <a
                    href={link.href}
                    class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 {$page
                        .url.pathname === link.href
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'}"
                >
                    {link.name}
                </a>
            {/each}
        </div>

        <!-- Auth -->
        <div class="flex items-center gap-4">
            {#if session}
                <div
                    class="hidden sm:flex items-center gap-3 text-sm text-slate-300"
                >
                    <span>{session.user.email}</span>
                    <Button variant="ghost" size="sm" onclick={handleLogout}>
                        Logout
                    </Button>
                </div>
            {:else}
                <div class="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        class="hidden sm:flex text-slate-400 hover:text-white"
                        onclick={handleLogin}
                    >
                        Admin
                    </Button>
                    <Button variant="outline" size="sm" onclick={handleLogin}>
                        Sign In
                    </Button>
                </div>
            {/if}
        </div>
    </div>
</nav>
