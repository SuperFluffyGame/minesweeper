<script lang="ts">
    import redMineJpg from "$lib/assets/red_mine.jpg";
    import redFlagJpg from "$lib/assets/red_flag.jpg";

    import { fade } from "svelte/transition";

    import { openCell, flagCell } from "../game/input";
    import { type Cell, CellState, CellType } from "../game/new";
    import { game, theme } from "../stores";

    export let cell: Cell;
    export let index: number;
    export let defaultAction: "flag" | "open";

    const clickCell = () => {
        game.update(g => {
            if (defaultAction === "open") {
                openCell(g!, index);
            } else if (defaultAction === "flag") {
                flagCell(g!, index);
            }
            return g;
        });
    };
    const rightClickCell = () => {
        game.update(g => {
            flagCell(g!, index);
            return g;
        });
    };

    let heldTimeout: NodeJS.Timeout | number;
    let timeoutExpired = false;
    const pointerDown = (e: PointerEvent) => {
        if (e.button === 2) {
            rightClickCell();
            return;
        }
        heldTimeout = setTimeout(() => {
            rightClickCell();
            timeoutExpired = true;
        }, 500);
    };
    const pointerUp = (e: PointerEvent) => {
        if (e.button === 2) {
            return;
        }
        clearTimeout(heldTimeout);
        if (!timeoutExpired) {
            clickCell();
        }
        timeoutExpired = false;
    };

    export let fontSize: number;
</script>

<!-- <svelte:head>
    <link rel="preload" href={redFlagJpg} type="image/jpeg" />
</svelte:head> -->

<div
    class="wrapper {cell.state}"
    on:contextmenu|preventDefault={() => {}}
    style:font-size="{fontSize}px"
    style:cursor={cell.numNeighborMines !== 0 ? "pointer" : null}
    class:light={$theme?.light}
    on:pointerdown={pointerDown}
    on:pointerup={pointerUp}
>
    {#if cell.type === CellType.Mine}
        <img alt="M" src={redMineJpg} />
    {:else if cell.numNeighborMines !== 0}
        {cell.numNeighborMines}
    {/if}
    {#if cell.state !== CellState.Opened}
        <div
            class="cover"
            out:fade|local={{ duration: 100 }}
            class:light={$theme?.light}
        />
    {/if}
    {#if cell.state === CellState.Flagged}
        <img
            src={redFlagJpg}
            alt="F"
            class="flag"
            transition:fade|local={{ duration: 100 }}
        />
    {/if}
</div>

<style lang="less">
    .wrapper {
        aspect-ratio: 1;
        padding: 0;
        margin: 0;
        position: relative;
        background-color: hsl(var(--cell-hue), 60%, 25%);
        border: 1px solid var(--black1);
        display: flex;
        justify-content: center;
        align-items: center;

        font-family: monospace;
        overflow: hidden;

        /* font-size: 2rem; */
        &.light {
            background-color: hsl(var(--cell-hue), 60%, 65%);
        }
    }

    .cover {
        background-color: hsl(var(--cell-hue), 100%, 30%);
        cursor: pointer;

        position: absolute;
        margin: 0;
        padding: 0;
        inset: 0;

        transition: background-color 100ms linear;

        &:hover {
            background-color: hsl(var(--cell-hue), 100%, 25%);
        }

        &.light {
            background-color: hsl(var(--cell-hue), 100%, 40%);
            &:hover {
                background-color: hsl(var(--cell-hue), 100%, 45%);
            }
        }
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
