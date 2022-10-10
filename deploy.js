// @ts-check

import { execSync } from "child_process";
import fs from "fs";

const WEBSITE_PATH = String.raw`C:\Users\super\OneDrive\Documents\coding\website`;
const MINESWEEPER_DEV_PATH = WEBSITE_PATH + String.raw`\minesweeper\dev`;

execSync("npm run build");

fs.rmSync(MINESWEEPER_DEV_PATH, {
    recursive: true,
    force: true,
});
fs.cpSync("./build", MINESWEEPER_DEV_PATH, {
    recursive: true,
});

// const previousCWD = process.cwd();
// process.chdir(WEBSITE_PATH);

execSync(`git add .`);
execSync(`git commit -m "deploy minesweeper dev"`);
execSync(`git push`);
// process.chdir(previousCWD);
