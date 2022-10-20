<script lang="ts">
    import type { Theme } from "$lib/settings";

    export let theme: Theme;
    export let selected: boolean = false;
</script>

<div
    class="wrapper"
    on:click
    style:border-color={selected ? "var(--font-color)" : null}
>
    <div style:background-color="hsl({theme.hue}, 50%, 50%)" />
    <div style:background-color="hsl({theme.hue}, 50%, 25%)" />
    <div style:background-color={theme.accent} />
    <div style:background-color="hsl({theme.cellHue}, 40%, 30%)" />
</div>

<style lang="less">
    .wrapper {
        width: 3rem;
        aspect-ratio: 1;
        border: 0.2rem solid transparent;
        border-radius: var(--radius);
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        transition: border-color 100ms linear;
        cursor: pointer;
    }
</style>
