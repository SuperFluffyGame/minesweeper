import { get, writable, type Writable } from "svelte/store";
import { loadLocalStorageGame, saveLocalStorageGame } from "./game/save";
import type { Game } from "./game/new";
import {
    loadLocalStorageStats,
    saveLocalStorageStats,
    type Stats,
} from "./game/stats";

export const MINESWEEPER_SAVE_SLOTS = "MINESWEEPER_SAVE_SLOTS";

export let game: Writable<Game | null> = writable(null);
game.subscribe((g) => {
    if (typeof window !== "undefined" && g != null) {
        let i: number = get(currentGameIndex);
        saveLocalStorageGame(i!, g);
    }
});

export let currentGameIndex = writable(-1);
currentGameIndex.subscribe((i) => {
    if (typeof window !== "undefined" && i != null && i != -1) {
        game.set(loadLocalStorageGame(i));
    }
});

export interface SaveSlot {
    index: number;
    selected: boolean;
}

export let used_save_slots: Writable<SaveSlot[] | null> = writable(null);
used_save_slots.subscribe((v) => {
    if (typeof window !== "undefined" && v != null) {
        localStorage[MINESWEEPER_SAVE_SLOTS] = JSON.stringify(
            v.map((slot) => slot.index)
        );
    }
});

if (typeof window !== "undefined") {
    used_save_slots.set(
        JSON.parse(localStorage[MINESWEEPER_SAVE_SLOTS] ?? "[]").map(
            (index: number) => {
                return {
                    index,
                    selected: false,
                } as SaveSlot;
            }
        )
    );
}

export const stats: Writable<Stats | null> = writable(null);
stats.subscribe((v) => {
    if (typeof window !== "undefined" && v != null) {
        saveLocalStorageStats(v);
    }
});
if (typeof window !== "undefined") {
    stats.set(loadLocalStorageStats());
}
