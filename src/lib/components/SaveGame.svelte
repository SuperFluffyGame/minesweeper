<script lang="ts">
    import { deleteGame, loadGame } from "$lib/game/save";
    import type { Game } from "$lib/game/new";
    import { onMount } from "svelte";
    import MiniBoard from "./MiniBoard.svelte";
    import { currentGameIndex, used_save_slots } from "$lib/stores";
    import { goto } from "$app/navigation";

    export let slot: number;

    let game: Game | null;
    let name: string = `Save Game ${slot}`;
    onMount(() => {
        game = loadGame(slot);
        name = game!.title;
    });

    const deleteClick = () => {
        used_save_slots.update(v => {
            v!.splice(v!.indexOf(slot), 1);
            return v;
        });
        deleteGame(slot);
    };
    const playClick = () => {
        currentGameIndex.set(slot);
        goto("./game");
    };
</script>

<div class="wrapper">
    <div class="miniboard">
        {#if game}
            <MiniBoard {game} />
        {:else}
            Loading...
        {/if}
    </div>
    <div class="info">
        <p class="name">
            {name}
        </p>

        <!-- <p class="title">Save Game {slot}</p> -->
        <p class="size">{game?.width}x{game?.height} ({game?.state})</p>
    </div>
    <div class="right">
        <button class="delete unstyled" on:click={deleteClick}>
            <img
                alt="delete"
                src="delete.svg"
                class="delete"
                style:stroke="whitesmoke"
                draggable="false"
            />
        </button>
        <button class="play unstyled" on:click={playClick}>
            <img
                alt="play"
                src="play.svg"
                class="delete"
                style:stroke="whitesmoke"
                draggable="false"
            />
        </button>
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
