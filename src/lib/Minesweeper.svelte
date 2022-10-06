<script lang="ts">
    import Cell from "$lib/Cell.svelte";
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
        OH NO
    {/if}

    <div class="state">
        {$game?.state}
    </div>
</div>

<style>
    .board {
        display: grid;
        width: 35rem;
        aspect-ratio: 1;
        user-select: none;
        border: 0.1px solid var(--black1);
        border-radius: var(--radius);
        overflow: hidden;
    }
</style>
