<script lang="ts">
    import { type Cell, CellState } from "./game/new";
    import { game } from "./stores";

    export let cell: Cell;
    export let index: number;

    const clickCell = () => {
        $game!.board[index].state = CellState.Opened;
    };
</script>

<div class="wrapper {cell.state}" on:click={clickCell}>
    {#if cell.state === CellState.Opened}
        {#if cell.isMine}
            M
        {:else}
            {cell.numNeighborMines}
        {/if}
    {/if}
</div>

<style>
    .wrapper {
        background-color: var(--black5);
        border: 0.1rem solid var(--black1);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .closed {
        background-color: var(--black4);
    }
</style>
