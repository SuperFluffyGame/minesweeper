<script lang="ts">
    import Cell from "$lib/components/Cell.svelte";
    import { game } from "$lib/stores";
</script>

<div
    class="board"
    style={`grid-template-columns: repeat(${
        $game?.width ?? 2
    }, 1fr); grid-template-rows: repeat(${$game?.height ?? 2}, 1fr);`}
>
    {#if $game}
        {#each $game.board as cell, i}
            <Cell {cell} index={i} />
        {/each}
    {:else}
        Loading...
    {/if}
</div>

<style>
    .board {
        display: grid;
        width: min(90vh, 90vw, 100%);
        user-select: none;
        border: 0.1px solid var(--black1);
        border-radius: var(--radius);
        overflow: hidden;
    }
</style>
