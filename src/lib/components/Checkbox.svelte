<script lang="ts">
    export let checked: boolean;
</script>

<div class="wrapper">
    <input type="checkbox" {...$$props} bind:checked />
    {#if checked}
        <img src="" alt="" />
    {/if}
</div>

<style>
    input[type="checkbox"] {
        appearance: none;
        margin: 0;
        width: 1.5rem;
        aspect-ratio: 1;
        border: 0.1rem solid var(--black2);
        border-radius: calc(var(--radius) / 2);
        transition: background-color 100ms ease-in-out;
    }
    input[type="checkbox"]:checked {
        background-color: var(--blue6);
    }
</style>
