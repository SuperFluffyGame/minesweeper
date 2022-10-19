<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import ColorSelect from "$lib/components/ColorSelect.svelte";
    import SaveGamesSidebar from "$lib/components/SaveGamesSidebar.svelte";
    import SidebarLayout from "$lib/components/SidebarLayout.svelte";

    import { themes, tickmarks } from "$lib/settings";
    import { settings } from "$lib/stores";
</script>

<SidebarLayout>
    <svelte:fragment slot="sidebar">
        <SaveGamesSidebar />
    </svelte:fragment>
    <svelte:fragment slot="content">
        <Card title="Theme">
            <div class="themes">
                {#each themes as theme, i (i)}
                    <ColorSelect
                        {theme}
                        selected={$settings.theme === i}
                        on:click={() => ($settings.theme = i)}
                    />
                {/each}
            </div>

            <h3>Saturation</h3>
            <input
                type="range"
                name="saturation"
                id="saturation"
                class="slider"
                step="0.5"
                min="0"
                max="20"
                bind:value={$settings.saturation}
                list="tickmarks"
            />
            <datalist id="tickmarks">
                {#each tickmarks as mark}
                    <option value={mark} />
                {/each}
            </datalist>
        </Card>
    </svelte:fragment>
</SidebarLayout>

<style lang="less">
    .themes {
        display: flex;
        gap: 0.5rem;
    }
    .slider {
        width: 100%;
        // accent-color: var(--accent);
    }
    h3 {
        margin-block-end: 0;
    }
</style>
