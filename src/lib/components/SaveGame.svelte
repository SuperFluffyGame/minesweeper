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

    import Checkbox from "./Checkbox.svelte";
    import Button from "./Button.svelte";
    import MiniBoard from "./MiniBoard.svelte";

    import { deleteGame, loadLocalStorageGame } from "$lib/game/save";
    import { currentGameIndex, type SaveSlot } from "$lib/stores";
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { GameState, type Game } from "$lib/game/new";
    import { onMount } from "svelte";

    import { timeString } from "$lib/utils";

    export let showSelect: boolean = false;

    export let slot: SaveSlot;
    let name = `Save Game ${slot.index}`;

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
        />

        <Button
            type="icon"
            iconSrc={playSvg}
            size="medium"
            on:click={playClick}
        />
        {#if showSelect}
            <Checkbox
                bind:checked={slot.selected}
                borderColor="white"
                size={1.15}
            />
        {/if}
    </div>
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .wrapper {
        margin: 0.5rem;
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
</style>
