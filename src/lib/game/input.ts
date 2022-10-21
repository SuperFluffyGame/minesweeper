import { stats } from "$lib/stores";
import {
    CellState,
    CellType,
    GameState,
    recalcMineNeighbors,
    setNewMine,
    type Game,
} from "./new";

export const openCell = (game: Game, index: number) => {
    // check if game has not been won or lost
    if (game.state !== GameState.Playing) {
        return;
    }

    const cell = game.board[index];
    let x = index % game.width;
    let y = Math.floor(index / game.height);

    // if cell is already flagged, return
    if (cell.state === CellState.Flagged) {
        return;
    }
    if (cell.state === CellState.Opened && cell.numNeighborMines !== 0) {
        // clicked a number cell

        let neighborFlags = 0;
        let neighborOpenCells = 0;

        // get number of neighbor flags
        for (let i = 0; i < 9; i++) {
            const offsetX = (i % 3) - 1;
            const offsetY = Math.floor(i / 3) - 1;

            const neighborX = offsetX + x;
            const neighborY = offsetY + y;
            if (
                neighborX < 0 ||
                neighborX >= game.width ||
                neighborY < 0 ||
                neighborY >= game.height
            ) {
                continue;
            }

            const neighborIndex = neighborY * game.width + neighborX;
            const neighborCell = game.board[neighborIndex];
            if (neighborCell?.state === CellState.Flagged) {
                neighborFlags++;
            }
        }
        // get number of empty neighbors
        for (let i = 0; i < 9; i++) {
            const offsetX = (i % 3) - 1;
            const offsetY = Math.floor(i / 3) - 1;

            const neighborX = offsetX + x;
            const neighborY = offsetY + y;
            if (
                neighborX < 0 ||
                neighborX >= game.width ||
                neighborY < 0 ||
                neighborY >= game.height
            ) {
                continue;
            }

            const neighborIndex = neighborY * game.width + neighborX;
            const neighborCell = game.board[neighborIndex];
            if (neighborCell?.state === CellState.Closed) {
                neighborOpenCells++;
            }
        }

        // open all neighbors
        if (neighborFlags === cell.numNeighborMines) {
            for (let i = 0; i < 9; i++) {
                const offsetX = (i % 3) - 1;
                const offsetY = Math.floor(i / 3) - 1;

                const neighborX = offsetX + x;
                const neighborY = offsetY + y;
                if (
                    neighborX < 0 ||
                    neighborX >= game.width ||
                    neighborY < 0 ||
                    neighborY >= game.height
                ) {
                    continue;
                }

                const neighborIndex = neighborY * game.width + neighborX;
                const neighborCell = game.board[neighborIndex];
                if (neighborCell?.state === CellState.Closed) {
                    openCell(game, neighborIndex);
                }
            }
            return;
        }
        //  flag all neighbors
        else if (neighborOpenCells + neighborFlags === cell.numNeighborMines) {
            for (let i = 0; i < 9; i++) {
                const offsetX = (i % 3) - 1;
                const offsetY = Math.floor(i / 3) - 1;

                const neighborX = offsetX + x;
                const neighborY = offsetY + y;
                if (
                    neighborX < 0 ||
                    neighborX >= game.width ||
                    neighborY < 0 ||
                    neighborY >= game.height
                ) {
                    continue;
                }

                const neighborIndex = neighborY * game.width + neighborX;
                const neighborCell = game.board[neighborIndex];
                if (neighborCell?.state === CellState.Closed) {
                    flagCell(game, neighborIndex);
                }
            }
            return;
        } else {
            return;
        }
    } else if (cell.state === CellState.Opened) {
        return;
    }

    stats.update(v => {
        if (!v) return v;
        v.cellsOpened += 1;
        return v;
    });

    cell.state = CellState.Opened;
    // if its first move and you clicked a mine, move it somewhere else
    if (game.firstMove) {
        // make it exclude the 3x3 cells around the clicked area, so they don't get set to a mine.
        const excludedCells: number[] = [];
        for (let i = 0; i < 9; i++) {
            const offsetX = (i % 3) - 1;
            const offsetY = Math.floor(i / 3) - 1;
            const neighborIndex = (y + offsetY) * game.width + (x + offsetX);
            excludedCells.push(neighborIndex);
        }
        // for each mine in the 3x3 area, reset it and put a new mine somewhere else
        for (let i = 0; i < 9; i++) {
            const offsetX = (i % 3) - 1;
            const offsetY = Math.floor(i / 3) - 1;
            const neighborIndex = (y + offsetY) * game.width + (x + offsetX);
            const neighborCell = game.board[neighborIndex];

            if (neighborCell?.type === CellType.Mine) {
                neighborCell.type = CellType.Empty;
                setNewMine(game, excludedCells);
            }
        }
        recalcMineNeighbors(game);
    }
    game.firstMove = false;

    // if it has 0 neighbors, open them all
    if (cell.type === CellType.Empty && cell.numNeighborMines === 0) {
        for (let i = 0; i < 9; i++) {
            const offsetX = (i % 3) - 1;
            const offsetY = Math.floor(i / 3) - 1;
            const neighborX = x + offsetX;
            const neighborY = y + offsetY;
            if (
                neighborX < 0 ||
                neighborX >= game.width ||
                neighborY < 0 ||
                neighborY >= game.height ||
                (offsetX === 0 && offsetY === 0)
            ) {
                continue;
            }
            const index = neighborY * game.width + neighborX;
            if (game.board?.[index].state === CellState.Closed) {
                openCell(game, index);
            }
        }
    }

    // if mine was opened, lose the game
    if (cell.type === CellType.Mine) {
        stats.update(v => {
            if (!v) return v;
            v.gamesLost += 1;
            return v;
        });
        game.state = GameState.Lost;
        game.lostToCell = index;
        for (let i = 0; i < game.width * game.height; i++) {
            let c = game.board[i];
            if (c.type === CellType.Mine) {
                c.state = CellState.Opened;
            }
        }
    }

    // if all non mine tiles have been opened, win!
    let allMinesOpened = true;
    for (let i = 0; i < game.width * game.height; i++) {
        if (
            !(game.board[i].type === CellType.Mine) &&
            game.board[i].state !== CellState.Opened
        ) {
            allMinesOpened = false;
        }
    }
    if (allMinesOpened) {
        stats.update(v => {
            if (!v) return v;
            v.gamesWon += 1;
            return v;
        });
        game.state = GameState.Won;
    }
};

export const flagCell = (game: Game, index: number) => {
    // check if game has not been won or lost
    if (game.state !== GameState.Playing) {
        return;
    }

    let cell = game.board[index];
    if (cell.state === CellState.Closed) {
        cell.state = CellState.Flagged;
    } else if (cell.state === CellState.Flagged) {
        cell.state = CellState.Closed;
    }
};
