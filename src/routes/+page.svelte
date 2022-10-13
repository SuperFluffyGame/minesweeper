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
    import PushButton from "$lib/components/PushButton.svelte";

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

    <div class="content" slot="content">
        <section class="presets">
            <h2>Standard</h2>
            <!-- <hr /> -->
            <PushButton on:click={newGameClick}>New Game</PushButton>

            <h3>Button Styles</h3>
            <div class="test-buttons">
                <button>Button Testing</button>
                <button disabled>Button Testing</button>

                <PushButton>Button</PushButton>
                <PushButton disabled>Button Testing</PushButton>

                <button class="test2">Button Testing</button>
                <button disabled class="test2">Button Testing</button>

                <button class="test3">Button Testing</button>
                <button disabled class="test3">Button Testing</button>
            </div>
        </section>
        <section class="custom">
            <h2>Custom</h2>
        </section>
    </div>
</SidebarLayout>

<style lang="less">
    .test-buttons {
        margin-block: 1rem;
        display: grid;
        // flex-direction: column;
        // grid-auto-flow: column;
        gap: 1rem 0.5rem;
        grid-template-rows: repeat(2, 1fr);
    }

    .test2 {
        background-color: transparent;
        border-color: darkcyan !important;

        &:hover:not(:disabled) {
            background-color: rgba(255, 255, 255, 0.05);
        }
        &:active:not(:disabled) {
            background-color: rgba(255, 255, 255, 0.1);
        }
        &:disabled {
            filter: brightness(75%);
            box-shadow: none;
        }
    }
    .test3 {
        background-color: transparent;
        border-color: var(--black6);

        &:hover:not(:disabled) {
            background-color: rgba(255, 255, 255, 0.075);
        }
        &:active:not(:disabled) {
            border-color: var(--black7);
        }
        &:disabled {
            filter: brightness(75%);
            box-shadow: none;
        }
    }

    .content {
        margin: 1rem;
        display: flex;
        flex-direction: column;
    }

    .savegames {
        overflow-y: auto;
    }

    p {
        text-align: center;
    }
</style>
