<script lang="ts">
    import { onMount } from "svelte";
    import { openCell, flagCell } from "../game/input";
    import type { Cell } from "../game/new";
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
        <img alt="M" src="red_mine.jpg" />
    {:else}
        {cell.numNeighborMines === 0 ? "" : cell.numNeighborMines}
    {/if}
    <div class="cover" />
    <img src="red_flag.jpg" alt="F" class="flag" />
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
        opacity: 1;

        position: absolute;
        margin: 0;
        padding: 0;
        inset: 0;

        transition: opacity 100ms ease-in-out,
            background-color 100ms ease-in-out;
    }
    .opened > .cover {
        opacity: 0;
    }

    img {
        height: 80%;
        image-rendering: pixelated;
        position: absolute;
        transition: opacity 100ms ease-in-out;
    }
    .flag {
        opacity: 0;
        z-index: 2;
    }
    .flagged > .flag {
        opacity: 1;
    }
</style>
