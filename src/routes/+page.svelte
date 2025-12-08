<script>
    import Button from "$lib/components/ui/Button.svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import Countdown from "$lib/components/Countdown.svelte";

    // Event Date: Dec 9th 2025, 10:00 AM
    const eventDate = "2025-12-09T10:00:00";
</script>

<div class="relative overflow-hidden">
    <!-- Background Elements -->
    <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] -z-10 pointer-events-none"
    ></div>

    <!-- Hero Section -->
    <section
        class="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 pt-12 pb-20 relative"
    >
        <span
            class="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6 animate-fade-in-up"
        >
            🚀 The Future is Here
        </span>

        <h1
            class="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 max-w-4xl leading-tight"
        >
            Explore. Innovate. <br />
            <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
            >
                Vote for the Best.
            </span>
        </h1>

        <p
            class="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
        >
            Join us at <span class="text-white font-semibold"
                >IHHS Academy, Bathnaha</span
            > for the ultimate STEM experience. Witness groundbreaking projects in
            Physics, Robotics, Biology, and more.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 mb-20">
            <Button size="lg" href="/stalls">Explore Stalls</Button>
            <Button variant="secondary" size="lg" href="/vote">
                Cast Your Vote
            </Button>
        </div>

        <!-- Countdown -->
        <div class="w-full">
            <h2
                class="text-center text-slate-500 text-sm uppercase tracking-widest mb-6"
            >
                Event Starts In
            </h2>
            <Countdown targetDate={eventDate} />
        </div>
    </section>

    <!-- Info Section -->
    <section class="py-20 px-6 max-w-7xl mx-auto">
        <div class="grid md:grid-cols-3 gap-8">
            <Card class="p-8 text-center hover:bg-white/5">
                <div
                    class="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 text-2xl"
                >
                    ⚛️
                </div>
                <h3 class="text-xl font-bold text-white mb-3">
                    Diverse Categories
                </h3>
                <p class="text-slate-400">
                    From Quantum Physics to Sustainable Energy, explore projects
                    across a wide range of STEM fields.
                </p>
            </Card>

            <Card class="p-8 text-center hover:bg-white/5">
                <div
                    class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 text-2xl"
                >
                    🗳️
                </div>
                <h3 class="text-xl font-bold text-white mb-3">Live Voting</h3>
                <p class="text-slate-400">
                    Your voice matters! Vote for your favorite exhibits in
                    real-time and help decide the winners.
                </p>
            </Card>

            <Card class="p-8 text-center hover:bg-white/5">
                <div
                    class="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 text-2xl"
                >
                    🏆
                </div>
                <h3 class="text-xl font-bold text-white mb-3">
                    Prizes & Glory
                </h3>
                <p class="text-slate-400">
                    Top projects will be awarded exciting prizes. Come cheer for
                    the innovators of tomorrow!
                </p>
            </Card>
        </div>
    </section>
</div>
