<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import SaveGamesSidebar from "$lib/components/SaveGamesSidebar.svelte";
    import SidebarLayout from "$lib/components/SidebarLayout.svelte";
    import { stats } from "$lib/stores";
</script>

<SidebarLayout>
    <svelte:fragment slot="sidebar">
        <SaveGamesSidebar />
    </svelte:fragment>
    <svelte:fragment slot="content">
        <Card title="Games Played: {$stats.gamesLost + $stats.gamesWon}">
            <table>
                <tr>
                    <td>Won:</td>
                    <td>{$stats.gamesWon}</td>
                </tr>
                <tr>
                    <td>Lost:</td>
                    <td>{$stats.gamesLost}</td>
                </tr>
            </table>
        </Card>
        <Card>
            <table>
                <tr>
                    <td>Cells Opened:</td>
                    <td>{$stats.cellsOpened}</td>
                </tr>
            </table></Card
        >
    </svelte:fragment>
</SidebarLayout>

<style lang="less">
    table {
        min-width: 15rem;
    }
    tr {
        > :first-child {
            text-align: left;
        }
        > td:nth-child(2) {
            text-align: right;
        }
    }
</style>
