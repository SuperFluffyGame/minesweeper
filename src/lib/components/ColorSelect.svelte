<script lang="ts">
    import type { Theme } from "$lib/settings";

    export let theme: Theme;
    export let selected: boolean = false;
</script>

<div
    class="wrapper"
    on:click
    style:border-color={theme.light ? "#BBB" : "#777"}
    class:selected
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
        // overflow: hidden;

        transition: border-color 100ms linear, filter 100ms linear,
            scale 100ms linear;
        cursor: pointer;

        &:hover {
            filter: brightness(90%);
        }
        &:active {
            filter: brightness(80%);
        }
    }

    .selected {
        scale: 0.9;
    }
</style>
