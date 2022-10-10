// @ts-check

import { execSync } from "child_process";
import fs from "fs";

const path = process.argv[2] ?? "/dev";
const commitMessage = process.argv[3] ?? "deploy minesweeper dev";
console.log(path);
console.log(commitMessage);

const WEBSITE_PATH = "C:/Users/super/OneDrive/Documents/coding/website";
const MINESWEEPER_PATH = WEBSITE_PATH + "/minesweeper" + path;

execSync("npm run build");

fs.rmSync(MINESWEEPER_PATH, {
    recursive: true,
    force: true,
});
fs.cpSync("./build", MINESWEEPER_PATH, {
    recursive: true,
});

try {
    execSync(`git add .`, {
        cwd: WEBSITE_PATH,
    });
    execSync(`git commit -m "${commitMessage}"`, {
        cwd: WEBSITE_PATH,
    });
    execSync(`git push`, {
        cwd: WEBSITE_PATH,
    });
} catch (e) {
    console.error(e.toString());
}
