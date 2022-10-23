import { stats } from "$lib/stores";
import { get } from "svelte/store";
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

        let neighborFlaggedCells = 0;
        let neighborClosedCells = 0;

        // get number of neighbor flags and closed cells
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
            if (neighborCell.state === CellState.Flagged) {
                neighborFlaggedCells++;
            }
            if (neighborCell.state !== CellState.Opened) {
                neighborClosedCells++;
            }
        }

        // open all neighbors if number of neighbor cells is equal to cell number
        if (neighborFlaggedCells === cell.numNeighborMines) {
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
        //  flag all neighbors if number of closed cells around are equal to cell number
        else if (neighborClosedCells === cell.numNeighborMines) {
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
        if (!v || game.sizeDesc === "custom") return v;
        v[game.sizeDesc].cellsOpened += 1;
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
        openAllNeighbors(game, x, y);
    }

    // if mine was opened, lose the game
    if (cell.type === CellType.Mine) {
        loseGame(game, index);
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
        winGame(game);
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

const openAllNeighbors = (game: Game, x: number, y: number) => {
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
};

const loseGame = (game: Game, i: number) => {
    stats.update(v => {
        if (!v || game.sizeDesc === "custom") return v;
        v[game.sizeDesc].gamesLost += 1;
        return v;
    });
    game.state = GameState.Lost;
    game.lostToCell = i;
    for (let i = 0; i < game.width * game.height; i++) {
        let c = game.board[i];
        if (c.type === CellType.Mine) {
            c.state = CellState.Opened;
        }
    }
};

const winGame = (game: Game) => {
    stats.update(v => {
        if (!v || game.sizeDesc === "custom") return v;

        const diffStats = v[game.sizeDesc];
        diffStats.gamesWon++;

        if (diffStats.times.length > 20) {
            diffStats.times.shift();
        }
        diffStats.times.push(game.stats.timePlayed);
        diffStats.times.sort((a, b) => a - b);

        diffStats.averageTime =
            (diffStats.averageTime * (diffStats.gamesWon - 1) +
                game.stats.timePlayed) /
            diffStats.gamesWon;
        return v;
    });
    game.state = GameState.Won;
};
