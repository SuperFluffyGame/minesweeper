export enum CellState {
    Closed,
    Opened,
    Flagged,
}
export class Cell {
    state: CellState;
    isMine: boolean;
    numNeighbors: number;
}
