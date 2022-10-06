import type { Game } from "./new";

export const loadBoard = (): Game => {
    return JSON.parse(localStorage.MINESWEEPER_SAVE_GAME);
};
