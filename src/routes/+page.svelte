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
    import { loadGame } from "$lib/game/save";
    import Button from "$lib/components/Button.svelte";

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
        goto(`${base}/game`);
    };
</script>

<SidebarLayout>
    <div slot="sidebar" class="savegames">
        {#if $used_save_slots}
            {#each $used_save_slots as saveSlotIndex (saveSlotIndex)}
                <SaveGame slot={saveSlotIndex} />
            {/each}
            {#if $used_save_slots.length === 0}
                <p>No Saved Games</p>
            {/if}
        {/if}
    </div>

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
                        <td
                            ><Button size="small" on:click={mediumClick}
                                >Play</Button
                            ></td
                        >
                    </tr>
                    <tr>
                        <td>Hard</td>
                        <td>16x16</td>
                        <td>40</td>
                        <td
                            ><Button size="small" on:click={hardClick}
                                >Play</Button
                            ></td
                        >
                    </tr>
                </tbody>
            </table>

            <!-- <h3>Button Styles</h3>
            <div class="test-buttons">
                <button>Button Testing</button>
                <button disabled>Button Testing</button>

                <PushButton>Button</PushButton>
                <PushButton disabled>Button Testing</PushButton>

                <button class="test2">Button Testing</button>
                <button disabled class="test2">Button Testing</button>

                <button class="test3">Button Testing</button>
                <button disabled class="test3">Button Testing</button>
            </div> -->
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
    // .test-buttons {
    //     margin-block: 1rem;
    //     display: grid;
    //     // flex-direction: column;
    //     // grid-auto-flow: column;
    //     gap: 1rem 0.5rem;
    //     grid-template-rows: repeat(2, 1fr);
    // }

    // .test2 {
    //     background-color: transparent;
    //     border-color: darkcyan !important;

    //     &:hover:not(:disabled) {
    //         background-color: rgba(255, 255, 255, 0.05);
    //     }
    //     &:active:not(:disabled) {
    //         background-color: rgba(255, 255, 255, 0.1);
    //     }
    //     &:disabled {
    //         filter: brightness(75%);
    //         box-shadow: none;
    //     }
    // }
    // .test3 {
    //     background-color: transparent;
    //     border-color: var(--black6);

    //     &:hover:not(:disabled) {
    //         background-color: rgba(255, 255, 255, 0.075);
    //     }
    //     &:active:not(:disabled) {
    //         border-color: var(--black7);
    //     }
    //     &:disabled {
    //         filter: brightness(75%);
    //         box-shadow: none;
    //     }
    // }

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
</style>
