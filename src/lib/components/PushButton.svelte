<script lang="ts">
    export let disabled: boolean = false;
</script>

<button on:click {disabled}><slot /></button>

<style lang="less">
    button {
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
