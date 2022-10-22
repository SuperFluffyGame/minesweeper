<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import Card from "$lib/components/Card.svelte";
    import SaveGamesSidebar from "$lib/components/SaveGamesSidebar.svelte";
    import SidebarLayout from "$lib/components/SidebarLayout.svelte";
    import { stats } from "$lib/stores";
    import { timeString } from "$lib/utils";

    let selectedTimesDiff: "easy" | "medium" | "hard" = "easy";
</script>

<SidebarLayout>
    <svelte:fragment slot="sidebar">
        <SaveGamesSidebar />
    </svelte:fragment>
    <svelte:fragment slot="content">
        <Card
            title="Games Played: {($stats?.gamesLost ?? 0) +
                ($stats?.gamesWon ?? 0)}"
        >
            <table>
                <tr>
                    <td>Won:</td>
                    <td>{$stats?.gamesWon ?? 0}</td>
                </tr>
                <tr>
                    <td>Lost:</td>
                    <td>{$stats?.gamesLost ?? 0}</td>
                </tr>
            </table>
        </Card>
        <Card>
            <table>
                <tr>
                    <td>Cells Opened:</td>
                    <td>{$stats?.cellsOpened ?? 0}</td>
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
                {#if $stats && $stats?.times[selectedTimesDiff]?.length !== 0}
                    <table>
                        {#each $stats.times[selectedTimesDiff] as time, i (i)}
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
        width: 100%;
    }
    tr {
        > :first-child {
            text-align: left;
        }
        > td:nth-child(2) {
            text-align: right;
        }
    }

    .diff-select {
        background-color: var(--black4);
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
