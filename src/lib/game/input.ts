import {
    CellState,
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
    if (cell.isMine && game.firstMove) {
        setNewMine(game);
        cell.isMine = false;
        recalcMineNeighbors(game);
    }
    // if it has 0 neighbors, open them all
    if (!cell.isMine && cell.numNeighborMines === 0) {
        for (let i = 0; i < 9; i++) {
            const offsetX = Math.floor(i / 3) - 1;
            const offsetY = (i % 3) - 1;
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
            if (game.board[index].state === CellState.Closed) {
                openCell(game, index);
            }
        }
    }

    // if mine was opened, lose the game
    if (cell.isMine) {
        game.state = GameState.Lost;
    }

    // if all non mine tiles have been opened, win!
    let allMinesOpened = true;
    for (let i = 0; i < game.width * game.height; i++) {
        if (!game.board[i].isMine && game.board[i].state !== CellState.Opened) {
            allMinesOpened = false;
        }
    }
    if (allMinesOpened) {
        game.state = GameState.Won;
    }
    game.firstMove = false;
};

export const flagCell = (game: Game, index: number) => {
    let cell = game.board[index];
    if (cell.state === CellState.Closed) {
        cell.state = CellState.Flagged;
    } else if (cell.state === CellState.Flagged) {
        cell.state = CellState.Closed;
    }
};
