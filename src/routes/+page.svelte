<script lang="ts">
    import SidebarLayout from "$lib/components/SidebarLayout.svelte";
    import Button from "$lib/components/Button.svelte";

    import {
        BoardSizes,
        newGame,
        type PossibleBoardSizes,
    } from "$lib/game/new";
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { loadGame } from "$lib/game/save";
    import SaveGamesSidebar from "$lib/components/SaveGamesSidebar.svelte";

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
</script>

<SidebarLayout>
    <svelte:fragment slot="sidebar">
        <SaveGamesSidebar />
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
                            <Button size="medium" on:click={easyClick}>
                                Play
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Medium</td>
                        <td>12x12</td>
                        <td>20</td>
                        <td>
                            <Button size="medium" on:click={mediumClick}>
                                Play
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Hard</td>
                        <td>16x16</td>
                        <td>40</td>
                        <td>
                            <Button size="medium" on:click={hardClick}>
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
        overflow-y: auto;

        @media screen and (max-width: 700px) {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
    }
</style>
