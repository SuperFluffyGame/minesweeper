<script lang="ts">
    import redMineJpg from "$lib/assets/red_mine.jpg";
    import redFlagJpg from "$lib/assets/red_flag.jpg";

    import { fade } from "svelte/transition";

    import { openCell, flagCell } from "../game/input";
    import { type Cell, CellState } from "../game/new";
    import { game } from "../stores";

    export let cell: Cell;
    export let index: number;

    const clickCell = (e: MouseEvent) => {
        if (e.button === 0) {
            game.update(g => {
                openCell(g!, index);
                return g;
            });
        }
    };
    const rightClickCell = () => {
        game.update(g => {
            flagCell(g!, index);
            return g;
        });
    };
</script>

<div
    class="wrapper {cell.state}"
    on:click={clickCell}
    on:contextmenu|preventDefault={rightClickCell}
>
    {#if cell.isMine}
        <img alt="M" src={redMineJpg} />
    {:else if cell.numNeighborMines !== 0}
        {cell.numNeighborMines}
    {/if}
    {#if cell.state !== CellState.Opened}
        <div class="cover" transition:fade={{ duration: 100 }} />
    {/if}
    {#if cell.state === CellState.Flagged}
        <img
            src={redFlagJpg}
            alt="F"
            class="flag"
            transition:fade={{ duration: 100 }}
        />
    {/if}
</div>

<style>
    .wrapper {
        aspect-ratio: 1;
        padding: 0;
        margin: 0;
        position: relative;
        background-color: var(--black5);
        border: 1px solid var(--black1);
        display: flex;
        justify-content: center;
        align-items: center;

        font-family: monospace;

        cursor: pointer;

        isolation: isolate;
        overflow: hidden;

        font-size: 2rem;
    }

    .cover {
        background-color: var(--blue2);

        position: absolute;
        margin: 0;
        padding: 0;
        inset: 0;

        transition: background-color 100ms ease-in-out;
    }
    .cover:hover {
        background-color: var(--blue1);
    }

    img {
        height: 80%;
        image-rendering: pixelated;
        position: absolute;
    }
    .flag {
        pointer-events: none;
    }
</style>
