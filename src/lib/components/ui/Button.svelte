<script lang="ts">
    import { cn } from "$lib/utils";
    import type { Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";

    type Variant = "primary" | "secondary" | "outline" | "ghost";
    type Size = "sm" | "md" | "lg";

    interface Props extends HTMLButtonAttributes {
        children?: Snippet;
        variant?: Variant;
        size?: Size;
        class?: string;
        href?: string;
    }

    let {
        children,
        variant = "primary",
        size = "md",
        class: className = "",
        ...rest
    }: Props = $props();

    const variants: Record<Variant, string> = {
        primary:
            "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30",
        secondary:
            "bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm",
        outline:
            "border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10",
        ghost: "hover:bg-white/5 text-slate-300 hover:text-white",
    };

    const sizes: Record<Size, string> = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5",
        lg: "px-7 py-3.5 text-lg",
    };
</script>

{#if rest.href}
    <a
        class={cn(
            "relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95",
            variants[variant],
            sizes[size],
            className,
        )}
        href={rest.href}
        {...rest as any}
    >
        {@render children?.()}
    </a>
{:else}
    <button
        class={cn(
            "relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95",
            variants[variant],
            sizes[size],
            className,
        )}
        {...rest}
    >
        {@render children?.()}
    </button>
{/if}
