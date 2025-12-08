<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import "../app.css";
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";

	let { children, data } = $props();
	let { supabase, session } = data;

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30 font-sans"
>
	<Navbar {session} />

	<main class="pt-20 min-h-[calc(100vh-80px)]">
		{@render children()}
	</main>

	<Footer />
</div>
