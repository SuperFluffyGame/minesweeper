export const MINESWEEPER_OVERALL_STATS = "MINESWEEPER_OVERALL_STATS";

interface DifficultyStats {
    gamesWon: number;
    gamesLost: number;
    cellsOpened: number;
    times: number[];
    averageTime: number;
}
export interface Stats {
    easy: DifficultyStats;
    medium: DifficultyStats;
    hard: DifficultyStats;
}

export const loadLocalStorageStats = (): Stats => {
    const data = JSON.parse(
        localStorage[MINESWEEPER_OVERALL_STATS] ?? "{}"
    ) as {
        [key: string]: any;
    } | null;
    const stats: Stats = {
        easy: {
            gamesWon: data?.easy?.gamesWon ?? 0,
            gamesLost: data?.easy?.gamesLost ?? 0,
            cellsOpened: data?.easy?.cellsOpened ?? 0,
            times: data?.easy?.times ?? [],
            averageTime: data?.easy?.averageTime ?? 0,
        },
        medium: {
            gamesWon: data?.medium?.gamesWon ?? 0,
            gamesLost: data?.medium?.gamesLost ?? 0,
            cellsOpened: data?.medium?.cellsOpened ?? 0,
            times: data?.medium?.times ?? [],
            averageTime: data?.medium?.averageTime ?? 0,
        },
        hard: {
            gamesWon: data?.hard?.gamesWon ?? 0,
            gamesLost: data?.hard?.gamesLost ?? 0,
            cellsOpened: data?.hard?.cellsOpened ?? 0,
            times: data?.hard?.times ?? [],
            averageTime: data?.hard?.averageTime ?? 0,
        },
    };
    return stats;
};

export const saveLocalStorageStats = (stats: Stats) => {
    localStorage[MINESWEEPER_OVERALL_STATS] = JSON.stringify(stats);
};
