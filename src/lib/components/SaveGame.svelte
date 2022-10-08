<script lang="ts">
    import MiniBoard from "./MiniBoard.svelte";

    export let slot: number;
</script>

<div class="wrapper">
    <div class="miniboard"><MiniBoard /></div>
    <div class="info">
        <p class="title">Save Game {slot}</p>
        <p class="size">8x8</p>
    </div>
    <div class="right">
        <button class="delete unstyled">
            <img
                alt="delete"
                src="delete.svg"
                class="delete"
                style:stroke="whitesmoke"
                draggable="false"
            />
        </button>
        <button class="play unstyled">
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
        /* padding: 0.5rem; */
        display: flex;
        align-items: center;
        /* width: 100%; */
        /* border: 1px solid red; */
        height: 3rem;
    }
    .miniboard {
        height: 100%;
        aspect-ratio: 1;
        margin-right: 1rem;
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
    }
    button:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }
    button:active {
        background-color: rgba(255, 255, 255, 0.1);
    }
    img {
        width: 100%;
        /* aspect-ratio: 1; */
    }

    .right {
        margin-inline: 0.5rem;
        flex-grow: 1;
        display: flex;
        justify-content: right;
    }
</style>
