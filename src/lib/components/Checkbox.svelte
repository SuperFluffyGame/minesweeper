<script lang="ts">
    import { fade } from "svelte/transition";
    import checkBoxSvg from "$lib/assets/check.svg";
    export let checked: boolean;
</script>

<div class="wrapper">
    <input type="checkbox" {...$$props} bind:checked />
    {#if checked}
        <img src={checkBoxSvg} alt="" transition:fade={{ duration: 50 }} />
    {/if}
</div>

<style>
    .wrapper {
        position: relative;
        display: flex;
    }
    input[type="checkbox"] {
        appearance: none;
        margin: 0;
        width: 1.5rem;
        aspect-ratio: 1;
        border: 0.1rem solid var(--black2);
        border-radius: calc(var(--radius) / 2);
        transition: background-color 50ms ease-in-out;
    }
    input[type="checkbox"]:checked {
        background-color: var(--blue6);
    }
    img {
        position: absolute;
        pointer-events: none;
        padding: 0;
        width: 100%;
        aspect-ratio: 1;
    }
</style>
