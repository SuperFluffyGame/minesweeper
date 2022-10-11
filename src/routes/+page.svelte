<script lang="ts">
    import {
        BoardSizes,
        newGame,
        type PossibleBoardSizes,
    } from "$lib/game/new";
    import { goto } from "$app/navigation";
    import { used_save_slots } from "$lib/stores";
    import SaveGame from "$lib/components/SaveGame.svelte";
    import SidebarLayout from "$lib/components/SidebarLayout.svelte";
    import { base } from "$app/paths";
    import { loadGame } from "$lib/game/save";

    let selectedBoardSize: PossibleBoardSizes = 12;
    let dialog: HTMLDialogElement;

    const newGameClick = () => {
        loadGame(newGame(BoardSizes[selectedBoardSize]));
        goto(`${base}/game`);
    };
</script>

<SidebarLayout>
    <div slot="sidebar" class="savegames">
        <!-- <SaveGame slot={1} />
        <SaveGame slot={1} /> -->
        {#if $used_save_slots}
            {#each $used_save_slots as saveSlotIndex}
                <SaveGame slot={saveSlotIndex} />
            {/each}
            {#if $used_save_slots.length === 0}
                <p>No Saved Games</p>
            {/if}
        {/if}
    </div>
    <!-- <div slot="content" class="creation-menu">
        <dialog bind:this={dialog} class="continue-modal">
            <h2>Are you sure?</h2>
            <p>
                You have a game saved, creating a new game will delete the old
                one.
            </p>
            <div class="buttons-container">
                <button on:click={() => dialog.close()}>Close</button>
                <button on:click={newGameModalClick}>Continue</button>
            </div>
        </dialog>

        <div class="size-select-container">
            <div class="size-select">
                <p>8 x 8</p>
                <p>10 Mines</p>
                <input
                    type="radio"
                    name="size"
                    id="8"
                    value={8}
                    checked
                    bind:group={selectedBoardSize}
                />
            </div>
            <div class="size-select">
                <p>12 x 12</p>
                <p>20 Mines</p>
                <input
                    type="radio"
                    name="size"
                    id="12"
                    value={12}
                    bind:group={selectedBoardSize}
                />
            </div>
            <div class="size-select">
                <p>16 x 16</p>
                <p>40 Mines</p>
                <input
                    type="radio"
                    name="size"
                    id="16"
                    value={16}
                    bind:group={selectedBoardSize}
                />
            </div>
        </div>

        <div class="buttons-container">
            <button
                class="continue"
                disabled={!gameSaved}
                on:click={continueGameClick}>Continue Game</button
            >
            <button class="play" on:click={newGameClick}>New Game</button>
            <button class="custom-game" on:click={customGameClick}
                >Custom Game</button
            >
        </div>
    </div> -->
    <div class="content2" slot="content">
        <section class="presets">
            <h2>Standard</h2>
            <button on:click={newGameClick}>New Game</button>
        </section>
    </div>
</SidebarLayout>

<style>
    .content2 {
        margin: 1rem;
    }
    .presets > h2 {
        margin: 0;
    }
    .savegames {
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
    }

    /* .creation-menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-grow: 1;
    }

    .size-select-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 2rem;
    }
    .size-select {
        position: relative;
        width: 8rem;
        height: 8rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        background-color: var(--black2);
        border-radius: var(--radius);

        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }
    .size-select > p {
        margin: 0.1rem;
    }
    .size-select > p:first-child {
        margin-top: 0.75rem;
    }

    input[type="radio"] {
        margin: 0;

        appearance: none;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: var(--radius);

        border-color: var(--black3);
        transition: border-color 125ms linear;
        cursor: pointer;
    }
    input[type="radio"]:checked {
        border: 0.25rem solid var(--blue6);
    } */
    p {
        text-align: center;
    }
</style>
