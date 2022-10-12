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

    <div class="content" slot="content">
        <section class="presets">
            <h2>Standard</h2>
            <!-- <hr /> -->
            <button on:click={newGameClick}>New Game</button>
            <button class="test1">Button Testing</button>
            <button class="test2">Button Testing</button>
            <button class="test3">Button Testing</button>
        </section>
        <section class="custom">
            <h2>Custom</h2>
        </section>
    </div>
</SidebarLayout>

<style lang="less">
    .test1 {
        --shadow-amount: 5px;
        --push-amount: 3px;
        border-color: darkcyan;
        background-color: transparent;
        color: whitesmoke;
        box-shadow: 0 var(--shadow-amount) 2px rgba(0, 0, 0, 0.5);
        transition: transform 100ms ease-in-out, box-shadow 100ms ease-in-out;

        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }
        &:active {
            transform: translateY(var(--push-amount));
            box-shadow: 0 calc(var(--shadow-amount) - var(--push-amount)) 2px
                rgba(0, 0, 0, 0.5);
        }
    }

    .test2 {
        background-color: transparent;
        border-color: darkcyan;

        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }
        &:active {
            background-color: rgba(0, 0, 0, 0.25);
        }
    }
    .test3 {
        background-color: transparent;

        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }

    .content {
        margin: 1rem;
        display: flex;
        flex-direction: column;
    }

    .presets > h2 {
        margin: 0;
    }
    .savegames {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }

    p {
        text-align: center;
    }
</style>
