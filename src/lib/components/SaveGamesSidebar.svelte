<script lang="ts">
    import Checkbox from "./Checkbox.svelte";
    import Button from "./Button.svelte";
    import SaveGame from "./SaveGame.svelte";

    import { used_save_slots } from "$lib/stores";
    import { deleteGame } from "$lib/game/save";

    let showSaveGameSelect = false;

    const setAll = (v: boolean) => {
        if (!showSaveGameSelect) return;
        $used_save_slots!.forEach((_, i) => {
            $used_save_slots![i].selected = v;
        });
    };
    const deleteSelected = () => {
        if (!showSaveGameSelect) return;

        while (true) {
            const indexOfSelected = $used_save_slots!.findIndex(
                slot => slot.selected
            );
            if (indexOfSelected === -1) {
                break;
            }
            deleteGame($used_save_slots![indexOfSelected].index);
        }
    };
</script>

<div class="mass-select">
    <Checkbox bind:checked={showSaveGameSelect} borderColor="white" />
    <Button type="text" size="verysmall" on:click={() => setAll(true)}>
        Select All
    </Button>
    <Button type="text" size="verysmall" on:click={() => setAll(false)}>
        Deselect All
    </Button>
    <Button type="text" size="verysmall" on:click={deleteSelected}>
        Delete Selected
    </Button>
</div>
<div class="savegames">
    {#if $used_save_slots}
        {#each $used_save_slots as saveSlot (saveSlot.index)}
            <SaveGame slot={saveSlot} showSelect={showSaveGameSelect} />
        {/each}
        {#if $used_save_slots.length === 0}
            <p>No Saved Games</p>
        {/if}
    {/if}
</div>

<style lang="less">
    .savegames {
        flex-grow: 1;
        overflow-y: auto;
        scrollbar-gutter: stable;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        p {
            text-align: center;
        }
        @media screen and (max-width: 700px) {
            margin-inline: 2.5rem;
            max-height: 20rem;
            scrollbar-gutter: none;
        }
    }
    .mass-select {
        display: grid;
        grid-template-columns: auto 1fr 1fr 1fr;
        align-items: center;
        margin-inline: 0.5rem;
        margin-block-end: 0.5rem;
        gap: 0.5rem;
        @media screen and (max-width: 700px) {
            margin-inline: 2.5rem;
        }
    }
</style>
