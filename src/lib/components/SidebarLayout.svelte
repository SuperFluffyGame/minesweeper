<script lang="ts">
    import { version } from "$lib/stores";
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

    <slot name="content" class="content" />
    <footer class="version">{version}</footer>
</main>

<style>
    header {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 0.5rem;
    }
    header > * {
        margin: 0;
    }
    .sidebar {
        width: 17.5rem;
        height: 100vh;
        background-color: var(--black2);
        display: flex;
        flex-direction: column;
    }
    .sidebar > hr {
        width: 100%;
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
        position: absolute;
        bottom: 0;
        right: 0;
        color: var(--black9);
        font-family: monospace;
        font-size: 1.25rem;
    }
    .wrapper {
        display: flex;
    }

    hr {
        border: none;
        border-block: 1px solid var(--black9);
        width: 100%;
    }
</style>
