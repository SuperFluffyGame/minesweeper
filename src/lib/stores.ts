import { writable, type Writable } from "svelte/store";
import { loadGame, MINESWEEPER_SAVE_SLOTS, saveGame } from "./game/save";
import type { Game } from "./game/new";

export let game: Writable<Game | null> = writable(null);

game.subscribe(g => {
    if (typeof window !== "undefined" && g != null) {
        let i: number;
        currentGameIndex.subscribe(v => (i = v));

        saveGame(i!, g);
    }
});

export let currentGameIndex = writable(0);
currentGameIndex.subscribe(i => {
    if (typeof window !== "undefined" && i != null) {
        game.set(loadGame(i));
    }
});

export const version = "v0.0.1";

export let used_save_slots: Writable<number[] | null> = writable(null);
used_save_slots.subscribe(v => {
    if (typeof window !== "undefined" && v != null) {
        localStorage[MINESWEEPER_SAVE_SLOTS] = JSON.stringify(v);
    }
});

if (typeof window !== "undefined") {
    used_save_slots.set(
        JSON.parse(localStorage[MINESWEEPER_SAVE_SLOTS] ?? "[]")
    );
}
