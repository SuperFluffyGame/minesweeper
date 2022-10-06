import type { Game } from "./new";

export const loadBoard = (): Game | null => {
    return localStorage.MINESWEEPER_SAVE_GAME
        ? JSON.parse(localStorage.MINESWEEPER_SAVE_GAME)
        : null;
};
