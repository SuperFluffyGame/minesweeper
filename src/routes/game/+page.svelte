<script lang="ts">
    import { goto } from "$app/navigation";
    import {
        BoardSizes,
        GameState,
        newGame,
        type BoardSize,
        type PossibleBoardSizes,
    } from "$lib/game/new";
    import Board from "$lib/components/Board.svelte";
    import { game } from "$lib/stores";
    import { onMount } from "svelte";
    import MiniBoard from "$lib/components/MiniBoard.svelte";
    import { MINESWEEPER_SAVE_GAME } from "$lib/game/load";
    let modalEl: HTMLDialogElement;

    game.subscribe(g => {
        if (g?.state !== GameState.Playing) {
            modalEl?.showModal?.();
        }
    });

    onMount(() => {
        if ($game!.state !== GameState.Playing) {
            modalEl?.showModal?.();
        }
    });

    const newGameModalClick = () => {
        newGame(BoardSizes[$game!.width as PossibleBoardSizes]);
        localStorage.removeItem(MINESWEEPER_SAVE_GAME);
        modalEl.close();
    };

    const gotoMenuClick = () => {
        localStorage.removeItem(MINESWEEPER_SAVE_GAME);
        goto("../");
        modalEl.close();
    };
</script>

<main class="wrapper">
    <section class="save-game-sidebar">
        <div class="click-type-container" />
    </section>

    <Board />
    <dialog class="aftergame-modal" bind:this={modalEl}>
        <div class="modal-main">
            {#if $game?.state === GameState.Won}
                <h2>You Won!</h2>
                <p>
                    Congratulations, you won on a {$game.width}x{$game.height}
                    board with {$game.numMines} mines.
                </p>
            {:else if $game?.state === GameState.Lost}
                <h2>You Lost!</h2>
                <p>
                    You lost on a {$game.width}x{$game.height}
                    board with {$game.numMines} mines.
                </p>
            {/if}

            <div class="buttons-container-vertical">
                <button class="goto-menu" on:click={gotoMenuClick}
                    >Back to Menu</button
                >
                <button class="new-game" on:click={newGameModalClick}
                    >New Game</button
                >
            </div>
        </div>
        <div class="mini-board"><MiniBoard /></div>
    </dialog>
</main>

<!-- <p>{JSON.stringify(data)}</p> -->
<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .aftergame-modal {
        min-width: 30rem;
        min-height: 15rem;
    }
    .aftergame-modal:modal {
        gap: 2rem;
        display: flex;
        flex-direction: row;
    }

    .modal-main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .buttons-container-vertical {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .mini-board {
        flex-grow: 1;
        min-width: 10rem;
    }
</style>
