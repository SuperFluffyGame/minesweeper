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
    import Button from "./Button.svelte";

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
        currentGameIndex.set(-1);

        currentGameIndex.set(slot.index);
        goto(`${base}/play`);
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
        <Button
            type="icon"
            iconSrc={deleteSvg}
            size="large"
            on:click={deleteClick}
        />

        <Button
            type="icon"
            iconSrc={playSvg}
            size="large"
            on:click={playClick}
        />
        {#if showSelect}
            <Checkbox
                bind:checked={slot.selected}
                borderColor="white"
                size={1.25}
            />
        {/if}
    </div>
</div>

<style lang="less">
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

    .right {
        margin-inline: 0.5rem;
        flex-grow: 1;
        display: flex;
        justify-content: right;
        align-items: center;
        gap: 0.25rem;

        &:nth-child(3) {
            margin-inline-start: 0.25rem;
        }
    }
    .info {
        display: flex;
        flex-direction: column;
    }
</style>
