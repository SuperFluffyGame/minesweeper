<script lang="ts">
    import { onMount } from "svelte";
    import { openCell, flagCell } from "./game/input";
    import { type Cell, CellState } from "./game/new";
    import { game } from "./stores";

    export let cell: Cell;
    export let index: number;

    const clickCell = (e: MouseEvent) => {
        if (e.button === 0) {
            game.update((g) => {
                openCell(g!, index);
                return g;
            });
        }
    };
    const rightClickCell = () => {
        game.update((g) => {
            flagCell(g!, index);
            return g;
        });
    };

    let wrapper: HTMLDivElement;

    // let cellStyle = "";
    // const getCellStyle = (): string => {
    //     if (!$game || cell?.state === CellState.Opened) {
    //         return "";
    //     }

    //     let topBorder: boolean = false;
    //     let leftBorder: boolean = false;
    //     let bottomBorder: boolean = false;
    //     let rightBorder: boolean = false;
    //     let x = index % $game.width;
    //     let y = Math.floor(index / $game.height);

    //     let topCellY = y - 1;
    //     let topCell = $game.board[topCellY * $game.width + x];
    //     if (topCell.state === CellState.Opened) {
    //         topBorder = true;
    //     }
    //     let leftCellx = x - 1;
    //     let leftCell = $game.board[y * $game.width + leftCellx];
    //     if (leftCell.state === CellState.Opened) {
    //         leftBorder = true;
    //     }

    //     let str = "";
    //     if (topBorder) {
    //         str += "border-top: 1px solid black;";
    //     }
    //     if (leftBorder) {
    //         str += "border-left: 1px solid black;";
    //     }
    //     return str;
    // };

    // onMount(() => {
    //     game.subscribe((g) => {
    //         cellStyle = getCellStyle();
    //     });
    // });
</script>

<div
    class="wrapper {cell.state}"
    on:click={clickCell}
    on:contextmenu|preventDefault={rightClickCell}
    bind:this={wrapper}
    style:font-size="{wrapper?.clientWidth * 0.75}px"
>
    {#if cell.isMine}
        M
    {:else}
        {cell.numNeighborMines}
    {/if}
    <div class="cover" />
    {#if cell.state === CellState.Flagged}
        F
    {/if}
</div>

<style>
    .wrapper {
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
    .flagged > .cover {
        background-color: coral;
    }
</style>
