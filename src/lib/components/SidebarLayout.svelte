<script lang="ts">
    import { version } from "$lib/stores";
    // import { onMount } from "svelte";
    // import { loadFull } from "tsparticles";
    // import { loadFirePreset } from "tsparticles-preset-fire";

    // const particleOptions = {
    //     preset: "fire",
    // };

    // let ParticlesComponent: any;
    // onMount(async () => {
    //     const module = await import("svelte-particles");
    //     ParticlesComponent = module.default;
    // });

    // let particlesInit = async (engine: any) => {
    //     await loadFirePreset(engine);
    // };
</script>

<main class="wrapper">
    <aside class="sidebar">
        <header>
            <h1 id="title">MineSweeper</h1>
            <h3 id="creator">By SFG and TMH</h3>
        </header>
        <hr />
        <slot name="sidebar" />
    </aside>

    <!-- <svelte:component
        this={ParticlesComponent}
        {particlesInit}
        options={particleOptions}
        id="tsparticles"
    /> -->

    <slot name="content" class="content" />
    <footer class="version">{version}</footer>
</main>

<style>
    header {
        text-align: center;
        margin: 0.5rem;
    }
    header > * {
        margin: 0;
    }

    .sidebar {
        height: 100%;
        overflow-y: auto;
        background-color: var(--black2);
        display: flex;
        flex-direction: column;
    }

    #title {
        margin-bottom: 0;
        letter-spacing: 0.2rem;
        font-size: 2rem;
    }
    #creator {
        margin-top: 0;
        color: var(--black9);
    }

    .version {
        margin: 0;
        position: fixed;
        bottom: 0;
        right: 0;
        color: var(--black9);
        font-family: monospace;
        font-size: 1.25rem;
    }

    .wrapper {
        height: 100vh;
        display: grid;
        grid-template-columns: 20rem 1fr;
    }

    hr {
        border: none;
        border-block: 1px solid darkcyan;
        width: 100%;
        margin-block-end: 1rem;
    }

    @media screen and (max-width: 700px) {
        .wrapper {
            display: flex;
            flex-direction: column;
            height: auto;
        }
    }
</style>
