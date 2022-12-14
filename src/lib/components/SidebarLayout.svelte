<script lang="ts">
    import statsSvg from "$lib/assets/stats.svg";
    import settingsSvg from "$lib/assets/settings.svg";
    import homeSvg from "$lib/assets/home.svg";
    import infoSvg from "$lib/assets/info.svg";

    import Button from "$lib/components/Button.svelte";

    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { version, title, creator } from "$lib/utils";

    export let fullContent = false;
    export let disableFlex = false;
</script>

<main class="wrapper">
    <aside class="sidebar">
        <header>
            <h1 id="title">{title}</h1>
            <h3 id="creator">{creator}</h3>
        </header>

        <div class="menus">
            <Button
                type="icon"
                size="large"
                iconSrc={homeSvg}
                padding={0.2}
                title="Home"
                on:click={() => {
                    goto(`${base}`);
                }}
            />
            <Button
                type="icon"
                size="large"
                iconSrc={statsSvg}
                padding={0.2}
                title="Stats"
                on:click={() => {
                    goto(`${base}/stats`);
                }}
            />
            <Button
                type="icon"
                size="large"
                iconSrc={settingsSvg}
                padding={0.2}
                title="Settings"
                on:click={() => {
                    goto(`${base}/settings`);
                }}
            />
            <Button
                type="icon"
                size="large"
                iconSrc={infoSvg}
                padding={0.2}
                title="Info"
                on:click={() => {
                    goto(`${base}/info`);
                }}
            />
        </div>
        <hr />

        <slot name="sidebar" />
    </aside>
    <div class="full-content">
        <div
            class="fit-content"
            class:full={fullContent}
            class:disable-flex={disableFlex}
        >
            <slot name="content" />
        </div>
    </div>
    <footer class="version">{version}</footer>
</main>

<style lang="less">
    header {
        text-align: center;
        margin: 0.5rem;
    }
    header > * {
        margin: 0;
    }

    .sidebar {
        height: 100%;
        overflow-y: auto;
        background-color: var(--black2);
        display: flex;
        flex-direction: column;
    }

    #title {
        margin-bottom: 0;
        letter-spacing: 0.2rem;
        font-size: 2rem;
    }
    #creator {
        margin-top: 0;
        color: var(--black9);
    }

    .version {
        margin: 0;
        position: fixed;
        bottom: 0;
        right: 0;
        color: var(--black9);
        font-family: monospace;
        font-size: 1.25rem;
    }

    .wrapper {
        height: 100vh;
        display: grid;
        grid-template-columns: 20rem 1fr;
    }

    hr {
        border: none;
        border-block: 1px solid var(--accent);
        background-color: var(--accent);

        width: 100%;
        margin-block-end: 1rem;
    }

    @media screen and (max-width: 700px) {
        .wrapper {
            display: flex;
            flex-direction: column;
            height: auto;
        }
    }

    .menus {
        /* margin: 0.5rem; */

        display: flex;
        gap: 0.5rem;
        justify-content: center;
    }

    .full-content {
        width: 100%;
        overflow-y: auto;
    }
    .fit-content {
        width: fit-content;

        &:not(.disable-flex) {
            @media screen and (min-width: 1050px) {
                display: flex;
            }
        }

        @media screen and (max-width: 700px) {
            display: initial;
            // flex-direction: column;
            // align-items: center;
            text-align: center;
            margin: auto;
        }
    }

    .full {
        width: 100%;
    }
</style>
