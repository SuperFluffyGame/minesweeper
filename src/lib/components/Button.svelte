<button {...$$props}><slot /></button>

<style>
    button {
        font-size: 1.2rem;
        background-color: var(--black6);
        border: 0.2rem solid var(--black5);
        color: whitesmoke;
        padding: 0.75rem;
        border-radius: var(--radius);
        transition: background-color 75ms linear, border-color 75ms linear;

        cursor: pointer;
    }

    button:hover {
        background-color: var(--black5);
    }

    button:active {
        border: 0.2rem solid var(--black6);
    }

    button:disabled {
        background-color: var(--black4);
        border: 0.2rem solid var(--black5);
        cursor: not-allowed;
    }
</style>
