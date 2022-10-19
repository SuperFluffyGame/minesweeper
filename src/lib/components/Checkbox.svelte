<script lang="ts">
    import { fade } from "svelte/transition";
    import checkBoxSvg from "$lib/assets/check.svg";
    export let checked: boolean;
    export let borderColor: string = "black";
    export let size: number = 1.5;
</script>

<div class="wrapper" style:width="{size}rem" style:height="{size}rem">
    <input
        type="checkbox"
        {...$$props}
        bind:checked
        style:border-color={borderColor}
    />
    {#if checked}
        <img
            src={checkBoxSvg}
            alt=""
            transition:fade|local={{ duration: 50 }}
        />
    {/if}
</div>

<style>
    .wrapper {
        position: relative;
        display: flex;
        aspect-ratio: 1;
        user-select: none;
    }
    input[type="checkbox"] {
        appearance: none;
        margin: 0;
        width: 100%;
        aspect-ratio: 1;
        cursor: pointer;
        border: 0.1rem solid;
        border-radius: calc(var(--radius) / 2);
    }
    input[type="checkbox"]:checked {
        background-color: var(--accent);
    }
    img {
        position: absolute;
        pointer-events: none;
        padding: 0;
        width: 100%;
        aspect-ratio: 1;
    }
</style>
