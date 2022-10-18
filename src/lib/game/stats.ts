export const MINESWEEPER_OVERALL_STATS = "MINESWEEPER_OVERALL_STATS";
export interface Stats {
    gamesWon: number;
    gamesLost: number;
    cellsOpened: number;
}

export const loadLocalStorageStats = (): Stats => {
    const data = JSON.parse(
        localStorage[MINESWEEPER_OVERALL_STATS] ?? "{}"
    ) as {
        [key: string]: any;
    } | null;
    const stats: Stats = {
        gamesWon: data?.gamesWon ?? 0,
        gamesLost: data?.gamesLost ?? 0,
        cellsOpened: data?.cellsOpened ?? 0,
    };
    return stats;
};

export const saveLocalStorageStats = (stats: Stats) => {
    localStorage[MINESWEEPER_OVERALL_STATS] = JSON.stringify(stats);
};
