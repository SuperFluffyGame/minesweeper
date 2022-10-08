<script lang="ts">
    import { CellState } from "$lib/game/new";
    import { game } from "../stores";

    export let showMines: boolean = false;
</script>

<div
    class="wrapper"
    style={`grid-template-columns: repeat(${
        $game?.width ?? 2
    }, 1fr); grid-template-rows: repeat(${$game?.height ?? 2}, 1fr);`}
>
    {#if $game}
        {#each $game.board as cell, i}
            <div
                class:cell
                class:mine={cell.isMine}
                class:empty={!cell.isMine || (cell.isMine && !showMines)}
                class:open={cell.state === CellState.Opened}
                class:clicked-mine={$game.lostToCell === i && showMines}
            />{/each}
    {:else}
        Loading...
    {/if}
</div>

<style>
    .wrapper {
        display: grid;
    }
    .cell {
        aspect-ratio: 1;
    }

    .mine {
        background-color: red;
    }
    .empty {
        background-color: navy;
    }
    .open {
        background-color: blue;
    }

    .clicked-mine {
        background-color: magenta;
    }
</style>
