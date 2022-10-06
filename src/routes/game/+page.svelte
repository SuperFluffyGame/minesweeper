<script lang="ts">
    import Minesweeper from "$lib/Minesweeper.svelte";
</script>

<main class="wrapper">
    <Minesweeper />
</main>

<!-- <p>{JSON.stringify(data)}</p> -->
<style>
    .wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>
