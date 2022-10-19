<script lang="ts">
    export let title: string | null = null;
</script>

<section class="wrapper">
    {#if title}
        <h2>{title}</h2>
    {/if}
    <slot />
</section>

<style lang="less">
    .wrapper {
        margin: 1rem;
        padding: 1rem;
        background-color: var(--black5);
        border-radius: var(--radius);
        box-shadow: 0 0 1rem #0005;
        > h2 {
            margin-block: 0.5rem;
        }
    }
</style>
