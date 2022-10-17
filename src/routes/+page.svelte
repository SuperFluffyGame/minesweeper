<script lang="ts">
    import {
        BoardSizes,
        newGame,
        type PossibleBoardSizes,
    } from "$lib/game/new";
    import { goto } from "$app/navigation";
    import { used_save_slots } from "$lib/stores";
    import SaveGame from "$lib/components/SaveGame.svelte";
    import SidebarLayout from "$lib/components/SidebarLayout.svelte";
    import { base } from "$app/paths";
    import { deleteGame, loadGame } from "$lib/game/save";
    import Button from "$lib/components/Button.svelte";
    import Checkbox from "$lib/components/Checkbox.svelte";

    const easyClick = () => {
        newGameClick(8);
    };
    const mediumClick = () => {
        newGameClick(12);
    };
    const hardClick = () => {
        newGameClick(16);
    };
    const newGameClick = (boardSize: PossibleBoardSizes) => {
        loadGame(newGame(BoardSizes[boardSize]));
        goto(`${base}/play`);
    };

    let showSaveGameSelect = false;

    const setAll = (v: boolean) => {
        if (!showSaveGameSelect) return;
        $used_save_slots?.forEach((_, i) => {
            $used_save_slots![i].selected = v;
        });
    };
    const deleteSelected = () => {
        if (!showSaveGameSelect) return;

        while (true) {
            const indexOfSelected = $used_save_slots!.findIndex(
                (slot) => slot.selected
            );
            if (indexOfSelected === -1) {
                break;
            }
            deleteGame($used_save_slots![indexOfSelected].index);
        }
    };
</script>

<SidebarLayout>
    <svelte:fragment slot="sidebar">
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
        <div slot="sidebar" class="savegames">
            {#if $used_save_slots}
                {#each $used_save_slots as saveSlot (saveSlot.index)}
                    <SaveGame slot={saveSlot} showSelect={showSaveGameSelect} />
                {/each}
                {#if $used_save_slots.length === 0}
                    <p>No Saved Games</p>
                {/if}
            {/if}
        </div>
    </svelte:fragment>

    <div class="content" slot="content">
        <section class="presets">
            <h2>Standard</h2>
            <table>
                <thead>
                    <th>Difficulty</th>
                    <th>Size</th>
                    <th>Mines</th>
                </thead>
                <tbody>
                    <tr>
                        <td>Easy</td>
                        <td>8x8</td>
                        <td>10</td>
                        <td>
                            <Button size="small" on:click={easyClick}>
                                Play
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Medium</td>
                        <td>12x12</td>
                        <td>20</td>
                        <td>
                            <Button size="small" on:click={mediumClick}>
                                Play
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Hard</td>
                        <td>16x16</td>
                        <td>40</td>
                        <td>
                            <Button size="small" on:click={hardClick}>
                                Play
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
        <section class="custom">
            <h2>Custom</h2>
            <p>TODO!!!</p>
        </section>
    </div>
</SidebarLayout>

<style lang="less">
    table {
        border-collapse: collapse;
    }
    @media screen and (max-width: 700px) {
        table {
            margin: auto;
        }
        h2 {
            text-align: center;
        }
    }
    td,
    thead {
        border-bottom: 2px solid var(--black2);
    }
    td,
    th {
        padding: 0.5rem;
    }
    td:not(:nth-child(1)) {
        text-align: center;
    }

    td:nth-child(4) {
        padding-inline: 1rem;
    }

    th {
        text-align: center;
    }

    .content {
        margin: 1rem;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }

    .savegames {
        overflow-y: auto;
        p {
            text-align: center;
        }
        @media screen and (max-width: 700px) {
            margin-inline: 2.5rem;
            max-height: 20rem;
        }
    }
    .mass-select {
        display: grid;
        grid-template-columns: auto 1fr 1fr 1fr;
        align-items: center;
        padding-inline: 0.5rem;
        margin-block-end: 0.5rem;
        gap: 0.5rem;
        @media screen and (max-width: 700px) {
            margin-inline: 2.5rem;
        }
    }
</style>
