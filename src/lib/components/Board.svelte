<script lang="ts">
    import Cell from "$lib/components/Cell.svelte";
    import type { Game } from "$lib/game/new";

    export let game: Game;
    export let defaultAction: "open" | "flag";
    let boardElem: HTMLDivElement | null;
    let fontSize = 0;

    const observer = new ResizeObserver(() => {
        fontSize = ((boardElem?.clientWidth ?? 0) / game.width) * 0.8;
    });
    $: if (boardElem) observer.observe(boardElem);
</script>

<div
    class="board"
    style={`grid-template-columns: repeat(${
        game.width ?? 2
    }, 1fr); grid-template-rows: repeat(${game.height ?? 2}, 1fr);`}
    bind:this={boardElem}
>
    {#each game.board as cell, i}
        <Cell {cell} index={i} {fontSize} {defaultAction} />
    {/each}
</div>

<style lang="less">
    .board {
        display: grid;
        width: clamp(20rem, 90vmin, 100%);
        user-select: none;
        border: 0.1px solid var(--black1);
        border-radius: var(--radius);
        overflow: hidden;

        @media screen and (max-width: 700px) {
            width: 100%;
        }
    }
</style>
