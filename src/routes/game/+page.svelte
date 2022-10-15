<script lang="ts">
    import { goto } from "$app/navigation";
    import BackButtonSvg from "$lib/assets/back_arrow.svg";
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
    import SidebarLayout from "$lib/components/SidebarLayout.svelte";
    import Button from "$lib/components/Button.svelte";
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

    let keepGame: boolean = true;

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

<SidebarLayout>
    <div class="wrapper" slot="content">
        <!-- <div class="back-button">
            <Button type="icon" iconSrc={BackButtonSvg} size="small">
                Back
            </Button>
        </div> -->
        {#if $game}
            <Board game={$game} />
        {:else}
            <p>Loading...</p>
        {/if}

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
                <div class="mini-board">
                    <MiniBoard game={$game} showMines />
                </div>
            {/if}
        </dialog>
    </div>
</SidebarLayout>

<!-- <p>{JSON.stringify(data)}</p> -->
<style lang="less">
    .wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        margin: 1rem;
    }

    .aftergame-modal:modal {
        min-height: 15rem;
        gap: 2rem;
        display: flex;
        flex-direction: row;
        @media screen and (max-width: 600px) {
            flex-direction: column;
        }
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
    .back-button {
        // position: absolute;
        // left: 0;
        // top: 0;
    }
</style>
