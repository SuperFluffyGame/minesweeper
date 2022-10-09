<script lang="ts">
    import { CellState } from "$lib/game/new";
    import type { Game } from "$lib/game/new";

    export let showMines: boolean = false;

    export let game: Game;
</script>

<div
    class="wrapper"
    style={`grid-template-columns: repeat(${
        game.width ?? 2
    }, 1fr); grid-template-rows: repeat(${game.height ?? 2}, 1fr);`}
>
    {#each game.board as cell, i}
        <div
            class:cell
            class:mine={cell.isMine}
            class:empty={!cell.isMine || (cell.isMine && !showMines)}
            class:flag={cell.state === CellState.Flagged && !showMines}
            class:open={cell.state === CellState.Opened}
            class:clicked-mine={game.lostToCell === i && showMines}
        />
    {/each}
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
    .flag {
        background-color: gold;
    }
</style>
