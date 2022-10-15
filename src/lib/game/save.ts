import {
    currentGameIndex,
    used_save_slots,
    game as gameStore,
    type SaveSlot,
} from "$lib/stores";
import { get } from "svelte/store";
import { deleteLocalStorageGame, saveLocalStorageGame } from "./localStorage";
import type { Game } from "./new";

// export const loadGame = (i: number): Game | null => {
//     let saveGame = localStorage[MINESWEEPER_SAVE_GAME + `_${i}`];
//     return saveGame ? JSON.parse(saveGame) : null;
// };

// export const saveGame = (i: number, game: Game) => {
//     deleteGame(i);
//     localStorage[MINESWEEPER_SAVE_GAME + `_${i}`] = JSON.stringify(game);
// };

export const deleteGame = (i: number) => {
    used_save_slots.update(v => {
        v!.splice(
            v!.findIndex(slot => slot.index === i),
            1
        );
        return v;
    });
    deleteLocalStorageGame(i);
};

export const loadGame = (game: Game) => {
    let usedSlots: SaveSlot[] = get(used_save_slots)!;
    let lowestSlot: number;
    for (let i = 0; ; i++) {
        if (usedSlots.findIndex(v => v.index === i) === -1) {
            lowestSlot = i;
            break;
        }
    }

    game.title += lowestSlot;
    saveLocalStorageGame(lowestSlot, game);
    currentGameIndex.set(-1);
    currentGameIndex.set(lowestSlot);
    used_save_slots.update(v => {
        v?.push?.({ index: lowestSlot, selected: false });
        return v;
    });
    gameStore.set(game);
};
