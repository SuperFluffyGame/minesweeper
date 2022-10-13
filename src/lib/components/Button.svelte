<script lang="ts">
    export let disabled: boolean = false;
    type Type = "old" | "push" | "normal" | "text";
    type Size = "small" | "medium" | "large";
    export let type: Type = "push";
    export let size: Size = "medium";
</script>

<button on:click {disabled} class={["unstyled", type, size].join(" ")}
    ><slot /></button
>

<style lang="less">
    button {
        font-size: 1.2rem;
        border: 0.2rem solid;
        color: whitesmoke;
        padding: 0.75rem 1rem;
        border-radius: var(--radius);
        transition: background-color 75ms linear, border-color 75ms linear;
        cursor: pointer;
    }
    .small {
        font-size: 1rem;
        padding: 0.5rem 1rem;
    }
    .push {
        --shadow-amount: 5px;
        --push-amount: 3px;
        border-color: darkcyan !important;
        background-color: transparent;
        color: whitesmoke;
        box-shadow: 0 var(--shadow-amount) 2px rgba(0, 0, 0, 0.5);
        transition: transform 100ms ease-in-out, box-shadow 100ms ease-in-out,
            background-color 75ms linear;

        &:hover:not(:disabled) {
            background-color: rgba(255, 255, 255, 0.075);
        }
        &:active:not(:disabled) {
            transform: translateY(var(--push-amount));
            box-shadow: 0 calc(var(--shadow-amount) - var(--push-amount)) 2px
                rgba(0, 0, 0, 0.5);
        }
        &:disabled {
            filter: brightness(75%);
            box-shadow: none;
        }
    }
</style>
