<script lang="ts">
    import { CellState, CellType } from "$lib/game/new";
    import type { Game } from "$lib/game/new";
    import { onMount } from "svelte";

    export let showMines: boolean = false;

    export let game: Game;

    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    onMount(() => {
        context = canvas.getContext("2d")!;
        context.imageSmoothingEnabled = false;
        context.fillRect(0, 0, canvas.width, canvas.height);
    });
    const fillStyles = {
        mine: "red",
        closed: "navy",
        empty: "blue",
        flag: "gold",
        clickedMine: "magenta",
    };
    $: if (context) {
        const cellWidth = canvas.width / game.width;
        const cellHeight = canvas.height / game.height;
        for (let i = 0; i < game.width * game.height; i++) {
            const cell = game.board[i];
            const x = i % game.width;
            const y = Math.floor(i / game.height);
            if (cell.state === CellState.Closed) {
                context.fillStyle = fillStyles.closed;
            } else if (i === game.lostToCell && showMines) {
                context.fillStyle = fillStyles.clickedMine;
            } else if (cell.type === CellType.Mine && showMines) {
                context.fillStyle = fillStyles.mine;
            } else if (cell.state === CellState.Flagged) {
                context.fillStyle = fillStyles.flag;
            } else {
                context.fillStyle = fillStyles.empty;
            }
            context.fillRect(
                x * cellWidth,
                y * cellHeight,
                cellWidth,
                cellHeight
            );
        }
    }
</script>

<canvas width="{game.width}px" height="{game.height}px" bind:this={canvas} />

<style>
    canvas {
        width: 100%;
        image-rendering: pixelated;
    }
</style>
