<script lang="ts">
    import { openCell } from "./game/openCell";
    import { type Cell, CellState } from "./game/new";
    import { game } from "./stores";

    export let cell: Cell;
    export let index: number;

    const clickCell = (e: MouseEvent) => {
        if (e.button === 0)
            game.update((g) => {
                openCell(g!, index);
                return g;
            });
    };

    let wrapper: HTMLDivElement;
</script>

<div
    class="wrapper {cell.state}"
    on:click={clickCell}
    bind:this={wrapper}
    style:font-size="{wrapper?.clientWidth * 0.75}px"
>
    {#if cell.isMine}
        M
    {:else}
        {cell.numNeighborMines}
    {/if}
    {#if cell.state === CellState.Closed || cell.state === CellState.Flagged}
        <div class="cover" />
    {/if}
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
        border: 0.1rem solid var(--black1);
        display: flex;
        justify-content: center;
        align-items: center;

        font-family: monospace;
    }

    .cover {
        background-color: var(--black4);
        margin: 0;
        padding: 0;
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>
