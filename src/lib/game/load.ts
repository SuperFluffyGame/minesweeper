import type { Game } from "./new";

export const MINESWEEPER_SAVE_GAME = "MINESWEEPER_SAVE_GAME";

export const MINESWEEPER_SAVE_GAMES = "MINESWEEPER_SAVE_GAMES";
export const loadBoard = (i: number): Game | null => {
    return localStorage[MINESWEEPER_SAVE_GAME]
        ? JSON.parse(localStorage[MINESWEEPER_SAVE_GAME])
        : null;
};
