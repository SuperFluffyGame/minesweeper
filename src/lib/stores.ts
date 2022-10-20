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
game.subscribe(g => {
    if (typeof window !== "undefined" && g != null) {
        let i: number = get(currentGameIndex);
        saveLocalStorageGame(i!, g);
    }
});

export let currentGameIndex = writable(-1);
currentGameIndex.subscribe(i => {
    if (i !== -1) game.set(loadLocalStorageGame(i));
});

export interface SaveSlot {
    index: number;
    selected: boolean;
}

export let used_save_slots: Writable<SaveSlot[] | null> = writable();
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
used_save_slots.subscribe(v => {
    if (typeof window === "undefined" || v == null) return;
    localStorage[MINESWEEPER_SAVE_SLOTS] = JSON.stringify(
        v.map(slot => slot.index)
    );
});

export const stats: Writable<Stats | null> = writable();
if (typeof window !== "undefined") {
    stats.set(loadLocalStorageStats());
}
stats.subscribe(v => {
    if (typeof window === "undefined" || v == null) return;
    saveLocalStorageStats(v);
});

export const settings: Writable<Settings | null> = writable();
if (typeof window !== "undefined") {
    settings.set(loadLocalStorageSettings());
}
settings.subscribe(v => {
    if (typeof window === "undefined" || v == null) return;

    const theme = themes[v.theme];
    document.documentElement.style.setProperty("--brand-hue", "" + theme.hue);
    document.documentElement.style.setProperty("--sat-mul", "" + v.saturation);
    document.documentElement.style.setProperty("--accent", "" + theme.accent);
    document.documentElement.style.setProperty(
        "--cell-hue",
        "" + theme.cellHue
    );

    if (theme.light) {
        document.documentElement.style.setProperty("--light-offset", "60%");
        document.documentElement.style.setProperty("--font-color", "black");
    } else {
        document.documentElement.style.setProperty("--light-offset", "0%");
        document.documentElement.style.setProperty(
            "--font-color",
            "whitesmoke"
        );
    }

    saveLocalStorageSettings(v);
});
