import type { Game } from "./new";

export const MINESWEEPER_SAVE_SLOTS = "MINESWEEPER_SAVE_SLOTS";
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

export const MINESWEEPER_OVERALL_STATS = "MINESWEEPER_OVERALL_STATS";
