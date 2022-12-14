import { randomInt } from "$lib/utils";

export const enum CellState {
    Closed = "closed",
    Opened = "opened",
    Flagged = "flagged",
}

export const enum CellType {
    Empty = "empty",
    Mine = "mine",
}

export interface Cell {
    state: CellState;
    numNeighborMines: number;
    type: CellType;
}
export const enum GameState {
    Playing = "playing",
    Won = "won",
    Lost = "lost",
}

export interface GameStats {
    timePlayed: number;
}

export interface Game {
    board: Cell[];
    width: number;
    height: number;
    sizeDesc: BoardSizeDesc;
    numMines: number;
    firstMove: boolean;
    state: GameState;
    lostToCell: number;
    title: string;
    stats: GameStats;
}

export type PossibleBoardSizes = 8 | 12 | 16;
export class BoardSizes {
    static [8]: BoardSize = {
        width: 8,
        height: 8,
        numMines: 10,
    };
    static [12]: BoardSize = {
        width: 12,
        height: 12,
        numMines: 20,
    };
    static [16]: BoardSize = {
        width: 16,
        height: 16,
        numMines: 40,
    };
}
export interface BoardSize {
    width: number;
    height: number;
    numMines: number;
}
export type BoardSizeDesc = "easy" | "medium" | "hard" | "custom";

export const newGame = (boardSize: BoardSize, sizeDesc: BoardSizeDesc) => {
    const board = Array<Cell>(boardSize.width * boardSize.height);
    for (let i = 0; i < boardSize.height * boardSize.width; i++) {
        board[i] = {
            state: CellState.Closed,
            numNeighborMines: 0,
            type: CellType.Empty,
        };
    }

    const game: Game = {
        board,
        ...boardSize,
        sizeDesc,
        firstMove: true,
        state: GameState.Playing,
        lostToCell: -1,
        title: "Save Game ",
        stats: { timePlayed: 0 },
    };

    for (let i = 0; i < boardSize.numMines; i++) {
        setNewMine(game);
    }
    recalcMineNeighbors(game);

    return game;
};

export const setNewMine = (game: Game, excludedCells: number[] = []) => {
    const availCells: number[] = [];
    for (let i = 0; i < game.width * game.height; i++) {
        if (
            game.board[i].type === CellType.Empty &&
            excludedCells.indexOf(i) === -1
        ) {
            availCells.push(i);
        }
    }

    const cellIndex = availCells[randomInt(0, availCells.length)];
    game.board[cellIndex].type = CellType.Mine;
};

export const recalcMineNeighbors = (game: Game) => {
    for (let x = 0; x < game.width; x++) {
        for (let y = 0; y < game.height; y++) {
            let numNeighborMines = 0;
            // calc num neighbor mines
            for (let k = 0; k < 9; k++) {
                const offsetX = Math.floor(k / 3) - 1;
                const offsetY = (k % 3) - 1;

                const neighborX = x + offsetX;
                const neighborY = y + offsetY;
                if (
                    neighborX < 0 ||
                    neighborX >= game.width ||
                    neighborY < 0 ||
                    neighborY >= game.height
                ) {
                    continue;
                }

                const neighborIndex = neighborY * game.width + neighborX;
                if (game.board[neighborIndex].type === CellType.Mine) {
                    numNeighborMines += 1;
                }
            }
            const index = y * game.width + x;
            game.board[index].numNeighborMines = numNeighborMines;
        }
    }
};
