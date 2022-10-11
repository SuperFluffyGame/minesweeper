<script lang="ts">
    import { goto } from "$app/navigation";
    import {
        BoardSizes,
        GameState,
        newGame,
        type PossibleBoardSizes,
    } from "$lib/game/new";
    import Board from "$lib/components/Board.svelte";
    import { currentGameIndex, game } from "$lib/stores";
    import { deleteGame, loadGame } from "$lib/game/save";
    import { onMount } from "svelte";
    import { base } from "$app/paths";
    import MiniBoard from "$lib/components/MiniBoard.svelte";
    import Checkbox from "$lib/components/Checkbox.svelte";
    let modalEl: HTMLDialogElement;

    game.subscribe(g => {
        if (g?.state !== GameState.Playing) {
            modalEl?.showModal?.();
        }
    });

    onMount(() => {
        if ($game === null) {
            goto(`${base}`);
        } else if ($game.state !== GameState.Playing) {
            modalEl.showModal();
        }
    });

    let keepGame: boolean;

    const newGameModalClick = () => {
        if (!keepGame) deleteGame($currentGameIndex);
        loadGame(newGame(BoardSizes[$game!.width as PossibleBoardSizes]));
        modalEl.close();
    };

    const gotoMenuClick = () => {
        if (!keepGame) deleteGame($currentGameIndex);
        goto(`${base}`);
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

            <div class="keep-game-wrapper">
                <p>Keep Game</p>
                <Checkbox bind:checked={keepGame} />
            </div>

            <div class="buttons-container-vertical">
                <button class="goto-menu" on:click={gotoMenuClick}
                    >Back to Menu</button
                >
                <button class="new-game" on:click={newGameModalClick}
                    >New Game</button
                >
            </div>
        </div>
        {#if $game}
            <div class="mini-board"><MiniBoard game={$game} showMines /></div>
        {/if}
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

    .keep-game-wrapper {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        margin: 0.5rem;
    }
    .keep-game-wrapper > p {
        margin: 0;
    }
</style>
