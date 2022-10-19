import { get, writable, type Writable } from "svelte/store";
import { loadLocalStorageGame, saveLocalStorageGame } from "./game/save";
import type { Game } from "./game/new";
import {
    loadLocalStorageStats,
    saveLocalStorageStats,
    type Stats,
} from "./game/stats";
import {
    loadLocalStorageSettings,
    saveLocalStorageSettings,
    type Settings,
    themes,
} from "./settings";

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
    if (i !== -1) game.set(loadLocalStorageGame(i));
});

export interface SaveSlot {
    index: number;
    selected: boolean;
}

export let used_save_slots: Writable<SaveSlot[]> = writable(
    JSON.parse(localStorage[MINESWEEPER_SAVE_SLOTS] ?? "[]").map(
        (index: number) => {
            return {
                index,
                selected: false,
            } as SaveSlot;
        }
    )
);
used_save_slots.subscribe((v) => {
    localStorage[MINESWEEPER_SAVE_SLOTS] = JSON.stringify(
        v.map((slot) => slot.index)
    );
});

export const stats: Writable<Stats> = writable(loadLocalStorageStats());
stats.subscribe((v) => {
    saveLocalStorageStats(v);
});

export const settings: Writable<Settings> = writable(
    loadLocalStorageSettings()
);
settings.subscribe((v) => {
    const theme = themes[v.theme];
    document.documentElement.style.setProperty("--brand-hue", "" + theme.hue);
    document.documentElement.style.setProperty("--sat-mul", "" + v.saturation);
    document.documentElement.style.setProperty("--accent", "" + theme.accent);
    document.documentElement.style.setProperty(
        "--cell-hue",
        "" + theme.cellHue
    );

    saveLocalStorageSettings(v);
});
