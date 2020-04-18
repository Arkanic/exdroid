import {updateState} from "./networking";
let mouseDown = false;
function onMouseInput(e) {
    handleInput(e.clientX, e.clientY, mouseDown);
}
function handleInput(x, y, isFiring) {
    const dir = Math.atan2(y - window.innerHeight / 2, x - window.innerWidth / 2);
    updateState({dir:dir, isFiring:isFiring});
}
export function startCapturingInput() {
    window.addEventListener("mousemove", onMouseInput);
    window.addEventListener("mousedown", (e)=>{mouseDown=true; onMouseInput(e)});
    window.addEventListener("mouseup", (e)=>{mouseDown=false; onMouseInput(e)});
}

export function stopCapturingInput() {
    window.removeEventListener("mousemove");
    window.removeEventListener("mousedown");
    window.removeEventListener("mouseup");
}