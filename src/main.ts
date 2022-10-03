import "./app.css";
import App from "./App.svelte";
import { Board } from "./lib/scripts/board";

const app = new App({
    target: document.getElementById("app"),
});

export default app;
