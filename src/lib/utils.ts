export const version = "v0.3.0";

// FROM MDN
export function randomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export function timeString(totalSeconds: number) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = totalSeconds % 60;

    let o = "";
    if (hours > 0) {
        o += hours.toString().padStart(2, "0") + ":";
    }
    o += minutes.toString().padStart(2, "0") + ":";
    o += seconds.toString().padStart(2, "0");

    return o;
}
