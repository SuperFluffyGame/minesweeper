import { randomInt } from "../utils";

export enum CellState {
    Opened = "opened",
    Closed = "closed",
    Flagged = "flagged",
}

export interface Cell {
    state: CellState;
    numNeighborMines: number;
    isMine: boolean;
}

export interface Game {
    board: Cell[];
    width: number;
    height: number;
    numMines: number;
}

function newBoard({ width, height, numMines }: BoardSize): Cell[] {
    let cells = Array<Cell>(width * height);

    let minePlaces = Array<number>(width * height).fill(0);

    // fill board with mines
    function setMine() {
        const x = randomInt(0, width);
        const y = randomInt(0, height);

        const prevSpot = minePlaces[y * width + x];
        if (prevSpot === 0) {
            minePlaces[y * width + x] = 1;
        } else {
            setMine();
        }
    }
    for (let i = 0; i < numMines; i++) {
        setMine();
    }

    // cell position
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let numNeighborMines = 0;
            // calc num neighbor mines
            for (let k = 0; k < 9; k++) {
                const offsetX = Math.floor(k / 3) - 1;
                const offsetY = (k % 3) - 1;

                const neighborX = i + offsetX;
                const neighborY = j + offsetY;

                const index = neighborY * width + neighborX;
                if (minePlaces[index] === 1) {
                    numNeighborMines += 1;
                }
            }
            const index = j * width + i;
            cells[index] = {
                state: CellState.Closed,
                numNeighborMines,
                isMine: minePlaces[index] === 1 ? true : false,
            };
        }
    }

    return cells;
}

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

export const newGame = (boardSize: BoardSize) => {
    const board = newBoard(boardSize);

    const game: Game = {
        board,
        width: boardSize.width,
        height: boardSize.height,
        numMines: boardSize.numMines,
    };

    localStorage.MINESWEEPER_SAVE_GAME = JSON.stringify(game);
};
