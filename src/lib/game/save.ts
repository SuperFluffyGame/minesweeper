import type { Game } from "./new";

export const MINESWEEPER_SAVE_SLOTS = "MINESWEEPER_SAVE_SLOTS";
export const MINESWEEPER_SAVE_GAME = "MINESWEEPER_SAVE_GAME";

export const loadGame = (i: number): Game | null => {
    let saveGame = localStorage[MINESWEEPER_SAVE_GAME + `_${i}`];
    return saveGame ? JSON.parse(saveGame) : null;
};

export const saveGame = (i: number, game: Game) => {
    localStorage[MINESWEEPER_SAVE_GAME + `_${i}`] = JSON.stringify(game);
};

export const deleteGame = (i: number) => {
    localStorage.removeItem(MINESWEEPER_SAVE_GAME + `_${i}`);
};
