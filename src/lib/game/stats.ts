export const MINESWEEPER_OVERALL_STATS = "MINESWEEPER_OVERALL_STATS";
export interface Stats {
    gamesWon: number;
    gamesLost: number;
    cellsOpened: number;
    times: {
        easy: number[];
        medium: number[];
        hard: number[];
    };
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
        times: {
            easy: data?.times?.easy ?? [],
            medium: data?.times?.medium ?? [],
            hard: data?.times?.hard ?? [],
        },
    };
    return stats;
};

export const saveLocalStorageStats = (stats: Stats) => {
    localStorage[MINESWEEPER_OVERALL_STATS] = JSON.stringify(stats);
};
