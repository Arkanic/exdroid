import {connect, play} from "./scripts/networking";
import {startRendering, stopRendering} from "./scripts/render";
import {startCapturingInput, stopCapturingInput} from "./scripts/input";
import {downloadAssets} from "./scripts/assets";
import {initState} from "./scripts/state";
import {setLeaderboardHidden} from "./scripts/leaderboard";
import {setAmmunitionHidden} from "./scripts/hud";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/global.css";

const playMenu = document.getElementById("play-menu");
const playButton = document.getElementById("play-button");
const usernameInput = document.getElementById("username-input");

Promise.all([
    connect(onGameOver),
    downloadAssets()
]).then(() => {
    playMenu.classList.remove("hidden");
    usernameInput.focus();
    playButton.onclick = () => {
        play(usernameInput.value);
        playMenu.classList.add("hidden");
        initState();
        startCapturingInput();
        startRendering();
        setLeaderboardHidden(false);
        setAmmunitionHidden(false);
    };
}).catch(console.error);

function onGameOver() {
    stopCapturingInput();
    stopRendering();
    playMenu.classList.remove("hidden");
    setLeaderboardHidden(true);
    setAmmunitionHidden(true);
}