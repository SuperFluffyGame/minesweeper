<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import SaveGamesSidebar from "$lib/components/SaveGamesSidebar.svelte";
    import SidebarLayout from "$lib/components/SidebarLayout.svelte";
</script>

<SidebarLayout>
    <svelte:fragment slot="sidebar">
        <SaveGamesSidebar />
    </svelte:fragment>
    <svelte:fragment slot="content">
        <Card title="How To Play">
            <h3>Minesweeper</h3>
            <p>
                Left click or touch to open a cell. Right click or hold to flag
                a cell. You can use the select on the side panel to change the
                left click or touch default action.
            </p>

            <p>
                Click anywhere to begin. You are guaranteed to have at least a
                3x3 of non mines on your first click. The number in a cell shows
                how many mines are in the surrounding 8 cells. Once all non mine
                cells have been opened, you have won. If you click a mine, then
                you lose.
            </p>
            <h3>Save Games</h3>
            <p>
                Every game you play will be saved unless you disable the
                checkbox. From the main menus, you can start playing any save
                game or delete them. If you have a lot, you can turn on
                multiselect mode to delete multiple at a time. Click the edit
                icon to change the name of the save game.
            </p>
        </Card>
        <Card title="Credits">
            <p>Made with SvelteKit.</p>
            <p>
                Code by <em>SuperFluffyGame#1889</em>, design help by
                <em>TheMelonHead286#8044</em>.
            </p>
            <p>Icons by Google Fonts.</p>
        </Card>
    </svelte:fragment>
</SidebarLayout>

<style lang="less">
</style>
