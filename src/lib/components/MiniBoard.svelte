<script lang="ts">
    import { CellState, CellType } from "$lib/game/new";
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
            class:open={cell.state === CellState.Opened}
            class:empty={cell.type !== CellType.Mine ||
                (cell.type === CellType.Mine && !showMines)}
            class:mine={cell.type === CellType.Mine && showMines}
            class:flag={cell.state === CellState.Flagged && !showMines}
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

    .empty {
        background-color: navy;
    }
    .open {
        background-color: blue;
    }
    .mine {
        background-color: red;
    }

    .clicked-mine {
        background-color: magenta;
    }
    .flag {
        background-color: gold;
    }
</style>
