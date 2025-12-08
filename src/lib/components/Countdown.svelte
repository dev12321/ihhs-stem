<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    let { targetDate } = $props();

    let timeLeft = $state({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    let interval: ReturnType<typeof setInterval>;

    function calculateTimeLeft() {
        const difference = +new Date(targetDate) - +new Date();

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
    }

    onMount(() => {
        calculateTimeLeft();
        interval = setInterval(calculateTimeLeft, 1000);
    });

    onDestroy(() => {
        if (interval) clearInterval(interval);
    });

    const timeUnits = [
        { label: "Days", value: "days" },
        { label: "Hours", value: "hours" },
        { label: "Minutes", value: "minutes" },
        { label: "Seconds", value: "seconds" },
    ];
</script>

<div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
    {#each timeUnits as unit}
        <div
            class="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
        >
            <span
                class="text-4xl md:text-5xl font-bold text-white tabular-nums"
            >
                {String(timeLeft[unit.value as keyof typeof timeLeft]).padStart(
                    2,
                    "0",
                )}
            </span>
            <span
                class="text-indigo-400 text-sm uppercase tracking-widest font-medium mt-2"
            >
                {unit.label}
            </span>
        </div>
    {/each}
</div>
