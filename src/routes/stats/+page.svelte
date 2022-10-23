<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import Card from "$lib/components/Card.svelte";
    import SaveGamesSidebar from "$lib/components/SaveGamesSidebar.svelte";
    import SidebarLayout from "$lib/components/SidebarLayout.svelte";
    import { stats } from "$lib/stores";
    import { largeNumFormat, timeString } from "$lib/utils";

    let selectedTimesDiff: "easy" | "medium" | "hard" = "easy";

    const lossRatioNumberToString = (n: number | undefined) => {
        const v = n ?? 0;
        return v === 0 ? 1 : v;
    };
</script>

<SidebarLayout>
    <svelte:fragment slot="sidebar">
        <SaveGamesSidebar />
    </svelte:fragment>
    <svelte:fragment slot="content">
        <Card title="Stats">
            <table>
                <thead>
                    <tr>
                        <td />
                        <td>Easy</td>
                        <td>Medium</td>
                        <td>Hard</td>
                    </tr>
                </thead>
                <tr>
                    <td>Games Played</td>
                    <td>
                        {largeNumFormat(
                            ($stats?.easy.gamesWon ?? 0) +
                                ($stats?.easy.gamesLost ?? 0)
                        )}
                    </td>
                    <td>
                        {largeNumFormat(
                            ($stats?.medium.gamesWon ?? 0) +
                                ($stats?.medium.gamesLost ?? 0)
                        )}
                    </td>
                    <td>
                        {largeNumFormat(
                            ($stats?.hard.gamesWon ?? 0) +
                                ($stats?.hard.gamesLost ?? 0)
                        )}
                    </td>
                </tr>
                <tr>
                    <td>Games Won:</td>
                    <td>{largeNumFormat($stats?.easy.gamesWon ?? 0)}</td>
                    <td>{largeNumFormat($stats?.medium.gamesWon ?? 0)}</td>
                    <td>{largeNumFormat($stats?.hard.gamesWon ?? 0)}</td>
                </tr>
                <tr>
                    <td>Games Lost:</td>
                    <td>{largeNumFormat($stats?.easy.gamesLost ?? 0)}</td>
                    <td>{largeNumFormat($stats?.medium.gamesLost ?? 0)}</td>
                    <td>{largeNumFormat($stats?.hard.gamesLost ?? 0)}</td>
                </tr>
                <tr>
                    <td>Cells Opened:</td>
                    <td>{largeNumFormat($stats?.easy.cellsOpened ?? 0)}</td>
                    <td>{largeNumFormat($stats?.medium.cellsOpened ?? 0)}</td>
                    <td>{largeNumFormat($stats?.hard.cellsOpened ?? 0)}</td>
                </tr>
                <tr>
                    <td>Win / Loss:</td>
                    <td>
                        {(
                            ($stats?.easy.gamesWon ?? 0) /
                            lossRatioNumberToString($stats?.easy.gamesLost)
                        ).toFixed(2)}
                    </td>
                    <td>
                        {(
                            ($stats?.medium.gamesWon ?? 0) /
                            lossRatioNumberToString($stats?.medium.gamesLost)
                        ).toFixed(2)}
                    </td>
                    <td>
                        {(
                            ($stats?.hard.gamesWon ?? 0) /
                            lossRatioNumberToString($stats?.hard.gamesLost)
                        ).toFixed(2)}
                    </td>
                </tr>
            </table>
        </Card>

        <Card title="Times">
            <div class="diff-select">
                <Button
                    type="text"
                    size="verysmall"
                    style="border-width: 0.1rem; border-color: {selectedTimesDiff ===
                    'easy'
                        ? 'var(--accent)'
                        : null}"
                    on:click={() => (selectedTimesDiff = "easy")}
                >
                    Easy
                </Button>
                <Button
                    type="text"
                    size="verysmall"
                    style="border-width: 0.1rem; border-color: {selectedTimesDiff ===
                    'medium'
                        ? 'var(--accent)'
                        : null}"
                    on:click={() => (selectedTimesDiff = "medium")}
                >
                    Medium
                </Button>
                <Button
                    type="text"
                    size="verysmall"
                    style="border-width: 0.1rem; border-color: {selectedTimesDiff ===
                    'hard'
                        ? 'var(--accent)'
                        : null}"
                    on:click={() => (selectedTimesDiff = "hard")}
                >
                    Hard
                </Button>
            </div>
            <div class="times">
                {#if $stats && $stats[selectedTimesDiff].times.length !== 0}
                    <h4>
                        Average: {timeString(
                            +$stats[selectedTimesDiff].averageTime.toFixed(2)
                        )}
                    </h4>
                    <table>
                        {#each $stats[selectedTimesDiff].times.slice(0, 10) as time, i (i)}
                            <tr>
                                <td>{i + 1}.</td>
                                <td>{timeString(time)}</td>
                            </tr>
                        {/each}
                    </table>
                {:else}
                    No times for {selectedTimesDiff}.
                {/if}
            </div>
        </Card>
    </svelte:fragment>
</SidebarLayout>

<style lang="less">
    table {
        min-width: 15rem;
        @media screen and (min-width: 700px) {
            width: 100%;
        }
        // width: 100%;
        border-collapse: collapse;
    }

    tr {
        > td:first-child {
            text-align: left;
        }
        > td:not(:first-child) {
            text-align: center;
            width: 4rem;
        }
    }
    thead {
        font-weight: bold;
    }
    td {
        padding-block: 0.25rem;
        border-bottom: 2px solid var(--black2);
    }
    .diff-select {
        background-color: var(--dark3);
        padding: 0.25rem;
        border-radius: var(--radius);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
    }
    .times {
        margin-block-start: 1rem;
    }
</style>
