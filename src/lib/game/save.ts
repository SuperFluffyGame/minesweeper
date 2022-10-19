import {
    currentGameIndex,
    used_save_slots,
    game as gameStore,
    type SaveSlot,
} from "$lib/stores";
import { get } from "svelte/store";
import type { Game } from "./new";

export const MINESWEEPER_SAVE_GAME = "MINESWEEPER_SAVE_GAME";

export const loadLocalStorageGame = (i: number): Game | null => {
    let saveGame = localStorage[MINESWEEPER_SAVE_GAME + `_${i}`];
    return saveGame ? JSON.parse(saveGame) : null;
};

export const saveLocalStorageGame = (i: number, game: Game) => {
    deleteLocalStorageGame(i);
    localStorage[MINESWEEPER_SAVE_GAME + `_${i}`] = JSON.stringify(game);
};

export const deleteLocalStorageGame = (i: number) => {
    localStorage.removeItem(MINESWEEPER_SAVE_GAME + `_${i}`);
};

export const deleteGame = (i: number) => {
    used_save_slots.update((slots) => {
        slots.splice(
            slots.findIndex((slot) => slot.index === i),
            1
        );
        return slots;
    });
    deleteLocalStorageGame(i);
};

export const loadGame = (game: Game) => {
    let usedSlots: SaveSlot[] = get(used_save_slots)!;
    let lowestSlot: number;
    for (let i = 0; ; i++) {
        if (usedSlots.findIndex((v) => v.index === i) === -1) {
            lowestSlot = i;
            break;
        }
    }

    game.title += lowestSlot;
    saveLocalStorageGame(lowestSlot, game);
    currentGameIndex.set(-1);
    currentGameIndex.set(lowestSlot);
    used_save_slots.update((v) => {
        v.push({ index: lowestSlot, selected: false });
        return v;
    });
    gameStore.set(game);
};
