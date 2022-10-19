<script lang="ts">
    import SaveGamesSidebar from "$lib/components/SaveGamesSidebar.svelte";
    import SidebarLayout from "$lib/components/SidebarLayout.svelte";
</script>

<SidebarLayout>
    <svelte:fragment slot="sidebar">
        <SaveGamesSidebar />
    </svelte:fragment>
</SidebarLayout>
