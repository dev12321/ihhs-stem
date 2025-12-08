<script lang="ts">
    import { cn } from "$lib/utils";

    let {
        children,
        class: className = "",
        hoverEffect = true,
        ...rest
    } = $props();
</script>

<div
    class={cn(
        "bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden",
        hoverEffect &&
            "transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1",
        className,
    )}
    {...rest}
>
    {@render children()}
</div>
