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
    if (cell.state === CellState.Flagged) {
        return;
    }

    let x = index % game.width;
    let y = Math.floor(index / game.height);

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
        game.state = GameState.Won;
    }
};

export const flagCell = (game: Game, index: number) => {
    let cell = game.board[index];
    if (cell.state === CellState.Closed) {
        cell.state = CellState.Flagged;
    } else if (cell.state === CellState.Flagged) {
        cell.state = CellState.Closed;
    }
};
