import { CellState, type Game } from "./new";

export const openCell = (game: Game, index: number) => {
    const cell = game.board[index];
    if (cell.state === CellState.Flagged) {
        return;
    }

    let x = index % game.width;
    let y = Math.floor(index / game.height);

    cell.state = CellState.Opened;
    if (cell.isMine === false && cell.numNeighborMines === 0) {
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
};

export const flagCell = (game: Game, index: number) => {
    let cell = game.board[index];
    if (cell.state === CellState.Closed) {
        cell.state = CellState.Flagged;
    } else if (cell.state === CellState.Flagged) {
        cell.state = CellState.Closed;
    }
};
