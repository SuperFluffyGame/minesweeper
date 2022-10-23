<script lang="ts">
    import SidebarLayout from "$lib/components/SidebarLayout.svelte";
    import Button from "$lib/components/Button.svelte";

    import {
        BoardSizes,
        newGame,
        type BoardSizeDesc,
        type PossibleBoardSizes,
    } from "$lib/game/new";
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { loadGame } from "$lib/game/save";
    import SaveGamesSidebar from "$lib/components/SaveGamesSidebar.svelte";
    import Card from "$lib/components/Card.svelte";

    const easyClick = () => {
        newGameClick(8, "easy");
    };
    const mediumClick = () => {
        newGameClick(12, "medium");
    };
    const hardClick = () => {
        newGameClick(16, "hard");
    };
    const newGameClick = (
        boardSize: PossibleBoardSizes,
        sizeDesc: BoardSizeDesc
    ) => {
        loadGame(newGame(BoardSizes[boardSize], sizeDesc));
        goto(`${base}/play`);
    };
</script>

<SidebarLayout>
    <svelte:fragment slot="sidebar">
        <SaveGamesSidebar />
    </svelte:fragment>

    <svelte:fragment slot="content">
        <Card title="Standard" centered>
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
        </Card>
    </svelte:fragment>
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
    td {
        &:not(:nth-child(1)) {
            text-align: center;
        }
        &:nth-child(1) {
            text-align: left;
        }
    }

    td:nth-child(4) {
        padding-inline: 1rem;
    }

    th {
        text-align: center;
    }
</style>
