<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import ColorSelect from "$lib/components/ColorSelect.svelte";
    import SaveGamesSidebar from "$lib/components/SaveGamesSidebar.svelte";
    import SidebarLayout from "$lib/components/SidebarLayout.svelte";
</script>

<SidebarLayout>
    <svelte:fragment slot="sidebar">
        <SaveGamesSidebar />
    </svelte:fragment>
    <svelte:fragment slot="content">
        <Card title="Theme">
            <ColorSelect hue={10} />
        </Card>
    </svelte:fragment>
</SidebarLayout>
