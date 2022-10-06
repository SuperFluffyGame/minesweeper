<script lang="ts">
    import { goto } from "$app/navigation";
    import {
        BoardSizes,
        GameState,
        newGame,
        type BoardSize,
        type PossibleBoardSizes,
    } from "$lib/game/new";
    import Minesweeper from "$lib/Minesweeper.svelte";
    import { game } from "$lib/stores";
    import { onMount } from "svelte";
    let modalEl: HTMLDialogElement;

    game.subscribe((g) => {
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
        localStorage.removeItem("MINESWEEPER_SAVE_GAME");
        modalEl.close();
    };

    const gotoMenuClick = () => {
        localStorage.removeItem("MINESWEEPER_SAVE_GAME");
        goto("/");
        modalEl.close();
    };
</script>

<main class="wrapper">
    <Minesweeper />
    <dialog class="aftergame-modal" bind:this={modalEl}>
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

        <div class="buttons-container">
            <button class="goto-menu" on:click={gotoMenuClick}
                >Back to Menu</button
            >
            <button class="new-game" on:click={newGameModalClick}
                >New Game</button
            >
        </div>
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
</style>
