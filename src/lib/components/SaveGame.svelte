<!-- <script lang="ts" context="module">
    let selectedSaveGames = new Set<number>();
    const updateSelection = (selected: boolean, slot: number) => {
        if (selected) {
            selectedSaveGames.add(slot);
        } else {
            selectedSaveGames.delete(slot);
        }
    };
</script> -->
<script lang="ts">
    import deleteSvg from "$lib/assets/delete.svg";
    import playSvg from "$lib/assets/play.svg";
    import editSvg from "$lib/assets/edit.svg";

    import Checkbox from "./Checkbox.svelte";
    import Button from "./Button.svelte";
    import MiniBoard from "./MiniBoard.svelte";

    import {
        deleteGame,
        loadLocalStorageGame,
        saveLocalStorageGame,
    } from "$lib/game/save";
    import { currentGameIndex, type SaveSlot } from "$lib/stores";
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { GameState, type Game } from "$lib/game/new";
    import { onMount } from "svelte";

    import { timeString } from "$lib/utils";
    import { fade } from "svelte/transition";

    export let showSelect: boolean = false;

    export let slot: SaveSlot;

    let game: Game | null;
    onMount(() => {
        game = loadLocalStorageGame(slot.index)!;
    });

    const deleteClick = () => {
        deleteGame(slot.index);
    };
    const playClick = () => {
        currentGameIndex.set(-1);

        currentGameIndex.set(slot.index);
        goto(`${base}/play`);
    };

    let renameDialogEl: HTMLDialogElement;
    let titleInputValue = "";

    const renameClick = () => {
        renameDialogEl.showModal();
        titleInputValue = "";
    };
    const changeTitle = () => {
        game!.title = titleInputValue;
        saveLocalStorageGame(slot.index, game!);
        renameDialogEl.close();
    };
</script>

<div class="wrapper">
    <div class="miniboard">
        {#if game}
            <MiniBoard {game} showMines={game.state !== GameState.Playing} />
        {:else}
            Loading...
        {/if}
    </div>
    <div class="info">
        <p class="name">
            <Button
                type="icon"
                iconSrc={editSvg}
                padding={0}
                size="small"
                on:click={renameClick}
            />
            {game?.title}
        </p>

        <p class="size">
            {game?.width}x{game?.height} ({timeString(
                game?.stats.timePlayed ?? 0
            )}, {game?.state})
        </p>
    </div>
    <div class="right">
        <Button
            type="icon"
            iconSrc={deleteSvg}
            size="medium"
            on:click={deleteClick}
            padding={0.1}
        />

        <Button
            type="icon"
            iconSrc={playSvg}
            size="medium"
            on:click={playClick}
            padding={0.1}
        />
        {#if showSelect}
            <Checkbox
                bind:checked={slot.selected}
                borderColor="white"
                size={1.15}
            />
        {/if}
    </div>

    <dialog class="rename-dialog" bind:this={renameDialogEl}>
        <h2>Rename {game?.title}</h2>
        <form on:submit|preventDefault={changeTitle}>
            <input
                type="text"
                name="game-title"
                id="game-title"
                minlength="1"
                maxlength="20"
                required
                bind:value={titleInputValue}
            />
            <div class="buttons-container">
                <Button on:click={() => renameDialogEl.close()}>Cancel</Button>
                <Button submit>Change</Button>
            </div>
        </form>
    </dialog>
</div>

<style lang="less">
    p {
        margin: 0;
    }
    .info {
        min-width: 0;
    }
    .size {
        color: var(--black9);
    }
    .name {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.25rem;
    }
    .size,
    .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .wrapper {
        // margin: 0.5rem;
        display: flex;

        // align-items: center;
        height: 3rem;
    }
    .miniboard {
        height: 100%;
        aspect-ratio: 1;
        margin-right: 0.5rem;
    }

    .right {
        margin-inline: 0.5rem;
        display: flex;
        flex-grow: 1;
        justify-content: right;
        align-items: center;
        gap: 0.2rem;
    }

    .rename-dialog {
        > form {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
</style>
