<script lang="ts">
    import Button from "$lib/Button.svelte";
    let dialog: HTMLDialogElement;

    const newGame = () => {
        dialog.showModal();
    };
</script>

<main class="container">
    <dialog bind:this={dialog}>
        Hello Dialog <button on:click={() => dialog.close()}>Close</button>
    </dialog>

    <h1 id="title">MineSweeper</h1>
    <h3 id="creator">By SFG</h3>

    <div class="size-select-container">
        <div class="size-select">
            <p>8 x 8</p>
            <p>10 Mines</p>
            <input type="radio" name="size" id="8" value="8" checked />
        </div>
        <div class="size-select">
            <p>12 x 12</p>
            <p>20 Mines</p>
            <input type="radio" name="size" id="12" value="12" />
        </div>
        <div class="size-select">
            <p>16 x 16</p>
            <p>40 Mines</p>
            <input type="radio" name="size" id="16" value="16" />
        </div>
    </div>

    <div class="play-buttons-container">
        <button class="continue" disabled>Continue Game</button>
        <button class="play" on:click={newGame}>New Game</button>
    </div>
</main>

<style>
    p {
        margin: 0;
    }
    #title {
        margin-bottom: 0;
        letter-spacing: 0.2rem;
        font-size: 3rem;
    }
    #creator {
        margin-top: 0;
        font-size: 1.5rem;
        color: var(--black9);
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
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
    }

    .play-buttons-container {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
        gap: 1rem;
        /* width: max(30vw, 20rem); */
    }
    @media screen and (max-width: 500px) {
        .play-buttons-container {
            flex-direction: column;
        }
    }
    .play-buttons-container > button {
        flex: 1 1 0;
        width: 15rem;
    }
</style>
