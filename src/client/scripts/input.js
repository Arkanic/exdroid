import {updateState} from "./networking";
let mouseDown = false;
let keys = {
    pickup: false
};
function onKeyInput(e) {
    if(e.keyCode == 70) {
        keys.pickup = true;
    }
}
function onKeyInputRelease(e) {
    if(e.keyCode == 70) {
        keys.pickup = false;
    }
}
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
    window.addEventListener("keydown", onKeyInput);
    window.addEventListener("keyup", onKeyInputRelease);
}

export function stopCapturingInput() {
    window.removeEventListener("mousemove", onMouseInput);
    window.removeEventListener("mousedown", (e)=>{mouseDown=true; onMouseInput(e)});
    window.removeEventListener("mouseup", (e)=>{mouseDown=false; onMouseInput(e)});
}