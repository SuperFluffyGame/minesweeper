import { writable, type Writable } from "svelte/store";
import { loadBoard } from "./game/load";
import type { Game } from "./game/new";

export let game: Writable<Game | null>;

if (typeof window !== "undefined") {
    game = writable(JSON.parse(localStorage.MINESWEEPER_SAVE_GAME));
} else {
    game = writable(null);
}
game.subscribe(v => {
    if (typeof window !== "undefined") {
        localStorage.MINESWEEPER_SAVE_GAME = JSON.stringify(v);
    }
});
