import {updateDirection} from "./networking";

function onMouseInput(e) {
    handleInput(e.clientX, e.clientY);
}

function onTouchInput(e) {
    const touch = e.touches[0];
    handleInput(touch.clientX, touch.clientY);
}

function handleInput(x, y) {
    const dir = Math.atan2(y - window.innerHeight / 2, x - window.innerWidth / 2);
    updateDirection(dir);
}

export function startCapturingInput() {
    window.addEventListener("mousemove", onMouseInput);
    window.addEventListener("click", onMouseInput);
    window.addEventListener("touchstart", onTouchInput);
    window.addEventListener("touchmove", onTouchInput);
}

export function stopCapturingInput() {
    window.removeEventListener("mousemove", onMouseInput);
    window.removeEventListener("click", onMOuseInput);
    window.removeEventListener("touchstart", onTouchInput);
    window.removeEventListener("touchmove", onTOuchInput);
}