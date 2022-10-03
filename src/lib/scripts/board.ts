import { CellState, type Cell } from "./cell";
import { getRandomInt } from "./utils";

export interface BoardInitOptions {
    width: number;
    height: number;
    numMines: number;
}

export enum GameState {
    NotStarted,
    Playing,
    Won,
    Lost,
}

export class Board {
    state: GameState = GameState.NotStarted;
    cells: Cell[];
    opts: BoardInitOptions;

    static readonly defaultBoardInitOptions: BoardInitOptions = {
        width: 10,
        height: 10,
        numMines: 10,
    };
    constructor(opts: BoardInitOptions = Board.defaultBoardInitOptions) {
        this.opts = opts;
        this.cells = Array(opts.width * opts.height);

        // set mines, 1 is mine, 0 is not
        const mineBoard: number[] = Array(opts.width * opts.height).fill(0);
        function setMine() {
            let x = getRandomInt(0, opts.width),
                y = getRandomInt(0, opts.height);
            if (mineBoard[x * opts.width + y] === 1) {
                setMine();
            } else {
                mineBoard[x * opts.width + y] = 1;
            }
        }
        for (let i = 0; i < opts.numMines; i++) {
            setMine();
        }

        // get number of neighbors for each cell
        for (let i = 0; i < mineBoard.length; i++) {
            let cellPos = {
                x: Math.floor(i / this.opts.width),
                y: i % this.opts.width,
            };
            let numNeighbors = 0;
            for (let j = 0; j < 9; j++) {
                let neighborOffsetPos = {
                    x: Math.floor(j / 3) - 1,
                    y: (j % 3) - 1,
                };
                if (neighborOffsetPos.x == 0 && neighborOffsetPos.y == 0) {
                    continue;
                }
                let neighborPos = {
                    x: cellPos.x + neighborOffsetPos.x,
                    y: cellPos.y + neighborOffsetPos.y,
                };
                let neighborIsMine =
                    mineBoard[neighborPos.x * this.opts.width + neighborPos.y];
                if (neighborIsMine === 1) {
                    numNeighbors++;
                }
            }
            // set the cell
            this.cells[i] = {
                state: CellState.Closed,
                numNeighbors,
                isMine: mineBoard[i] === 1 ? true : false,
            };
        }
    }

    getCellAt(x: number, y: number): Cell {
        return this.cells[x * this.opts.width + y];
    }

    getCells() {
        return this.cells;
    }
}
