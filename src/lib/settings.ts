export interface Settings {
    theme: number;
    saturation: number;
}

export const MINESWEEPER_SETTINGS = "MINESWEEPER_SETTINGS";

export const tickmarks = [0, 5, 10, 15, 20];

export interface Theme {
    hue: number;
    accent: string;
    cellHue: number;
    light: boolean;
}
export const themes: Theme[] = [
    { hue: 200, accent: "darkcyan", cellHue: 200, light: false },
    { hue: 100, accent: "green", cellHue: 100, light: false },
    { hue: 300, accent: "darkviolet", cellHue: 300, light: false },
    { hue: 0, accent: "brown", cellHue: 0, light: false },
    { hue: 50, accent: "orange", cellHue: 60, light: true },
];

export const loadLocalStorageSettings = () => {
    const data = JSON.parse(localStorage[MINESWEEPER_SETTINGS] ?? "{}") as {
        [key: string]: any;
    } | null;
    const settings: Settings = {
        theme: data?.theme ?? 0,
        saturation: data?.saturation ?? 0,
    };
    return settings;
};

export const saveLocalStorageSettings = (settings: Settings) => {
    localStorage[MINESWEEPER_SETTINGS] = JSON.stringify(settings);
};
