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

    import { deleteGame } from "$lib/game/save";
    import MiniBoard from "./MiniBoard.svelte";
    import { currentGameIndex, type SaveSlot } from "$lib/stores";
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { loadLocalStorageGame } from "$lib/game/localStorage";
    import { GameState, type Game } from "$lib/game/new";
    import { onMount } from "svelte";
    import Checkbox from "./Checkbox.svelte";

    export let showSelect: boolean = false;
    // $: updateSelection(selected, slot);

    export let slot: SaveSlot;
    let name = `Save Game ${slot.index}`;

    let game: Game;
    onMount(() => {
        game = loadLocalStorageGame(slot.index)!;
    });

    const deleteClick = () => {
        deleteGame(slot.index);
    };
    const playClick = () => {
        currentGameIndex.set(slot.index);
        goto(`${base}/game`);
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
            {name}
        </p>

        <p class="size">{game?.width}x{game?.height} ({game?.state})</p>
    </div>
    <div class="right">
        <button class="delete unstyled" on:click={deleteClick}>
            <img
                alt="delete"
                src={deleteSvg}
                class="delete"
                style:stroke="whitesmoke"
                draggable="false"
            />
        </button>
        <button class="play unstyled" on:click={playClick}>
            <img
                alt="play"
                src={playSvg}
                class="delete"
                style:stroke="whitesmoke"
                draggable="false"
            />
        </button>
        {#if showSelect}
            <Checkbox
                bind:checked={slot.selected}
                borderColor="white"
                size={1.25}
            />
        {/if}
    </div>
</div>

<style>
    p {
        margin: 0;
    }
    .size {
        color: var(--black9);
    }
    .wrapper {
        margin: 0.5rem;
        display: flex;
        align-items: center;

        height: 3rem;
    }
    .miniboard {
        height: 100%;
        aspect-ratio: 1;
        margin-right: 0.5rem;
    }

    button {
        background-color: transparent;
        border: none;
        border-radius: var(--radius);
        width: 2rem;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 75ms linear;

        padding: 0;
    }
    button:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }
    button:active {
        background-color: rgba(255, 255, 255, 0.1);
    }
    img {
        width: 100%;
    }

    .right {
        margin-inline: 0.5rem;
        flex-grow: 1;
        display: flex;
        justify-content: right;
        align-items: center;
        gap: 0.25rem;
    }
    .info {
        display: flex;
        flex-direction: column;
    }

    /* p input.name {
        color: whitesmoke;
        border: 0.1rem solid var(--black4);
        border-radius: calc(var(--radius) / 2);
        background-color: transparent;
        outline: none;
        font-size: inherit;
        --padding: 0.25rem;
        width: calc(100% - var(--padding) * 2);
        padding: var(--padding);
    } */
</style>
