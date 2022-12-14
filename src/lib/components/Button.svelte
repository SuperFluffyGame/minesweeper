<script lang="ts">
    import { theme } from "$lib/stores";

    export let disabled: boolean = false;
    type Type = "old" | "push" | "normal" | "text" | "icon";
    type Size = "verysmall" | "small" | "medium" | "large" | "verylarge";
    export let type: Type = "normal";
    export let size: Size = "medium";
    export let iconSrc: string = "";
    export let padding: number | null = null;
    export let title: string | null = null;
    export let submit = false;

    export let style: string | null = null;
</script>

<button
    on:click
    {disabled}
    class={["unstyled", type, size, $theme?.light ? "light" : "dark"].join(" ")}
    style:padding="{padding}rem"
    {title}
    type={submit ? "submit" : "button"}
    {style}
>
    {#if type === "icon"}
        <img
            src={iconSrc}
            alt=""
            draggable="false"
            style:filter={$theme?.light ? "invert()" : null}
        />
    {/if}
    <slot />
</button>

<style lang="less">
    button {
        font-size: 1.2rem;
        border: 0.2rem solid;
        color: var(--font-color);
        padding: 0.75rem 1rem;
        border-radius: var(--radius);
        transition: background-color 100ms linear, border-color 100ms linear;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .small {
        font-size: 1rem;
        padding: 0.5rem 1rem;
        img {
            height: 1.25rem;
        }
    }
    .verysmall {
        font-size: 0.95rem;
        padding: 0.4rem 0.6rem;
        img {
            height: 1.05rem;
        }
    }
    .medium {
        font-size: 1.2rem;
        padding: 0.75rem 1rem;
        img {
            height: 1.5rem;
        }
    }
    .large {
        font-size: 1.5rem;
        padding: 0.9rem 1.4rem;
        img {
            height: 1.8rem;
        }
    }
    .verylarge {
        font-size: 1.8rem;
        padding: 1.25rem 1.75rem;
        img {
            height: 2.25rem;
        }
    }
    .push {
        --shadow-amount: 5px;
        --push-amount: 3px;
        border-color: var(--accent) !important;
        background-color: transparent;
        box-shadow: 0 var(--shadow-amount) 2px rgba(0, 0, 0, 0.5);
        transition: transform 100ms linear, box-shadow 100ms linear,
            background-color 100ms linear;

        &:hover:not(:disabled) {
            background-color: rgba(255, 255, 255, 0.075);
        }
        &:active:not(:disabled) {
            transform: translateY(var(--push-amount));
            box-shadow: 0 calc(var(--shadow-amount) - var(--push-amount)) 2px
                rgba(0, 0, 0, 0.5);
        }
        &:disabled {
            filter: brightness(75%);
            box-shadow: none;
        }
    }

    .normal {
        .text();
        border-color: var(--accent);
    }

    .text {
        border-color: transparent;
        background-color: transparent;

        &.dark {
            &:hover:not(:disabled) {
                background-color: rgba(255, 255, 255, 0.05);
            }
            &:active:not(:disabled) {
                background-color: rgba(255, 255, 255, 0.1);
            }
            &:disabled {
                filter: brightness(75%);
            }
        }
        &.light {
            &:hover:not(:disabled) {
                background-color: rgba(0, 0, 0, 0.05);
            }
            &:active:not(:disabled) {
                background-color: rgba(0, 0, 0, 0.1);
            }
            &:disabled {
                filter: brightness(75%);
            }
        }
    }

    .icon {
        .text();
    }
    img {
        min-width: 100%;
        aspect-ratio: 1;

        user-select: none;
    }
</style>
