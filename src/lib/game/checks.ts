import { MINESWEEPER_SAVE_GAME } from "./save";

export function isGameSaved(): boolean {
    return localStorage[MINESWEEPER_SAVE_GAME] ? true : false;
}
