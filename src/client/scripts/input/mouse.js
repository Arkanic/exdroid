import {updateMouseState} from "../networking";

let mouseDown = false;

function handleInput(x, y, isFiring) {
    const dir = Math.atan2(y - window.innerHeight / 2, x - window.innerWidth / 2);
    updateMouseState({dir:dir, isFiring:isFiring});
}

const eventRunner = {
    mousemove: (e) => {
        handleInput(e.clientX, e.clientY, mouseDown);
    },
    mousedown: (e) => {
        mouseDown = true;
        handleInput(e.clientX, e.clientY, mouseDown);
    },
    mouseup: (e) => {
        mouseDown = false;
        handleInput(e.clientX, e.clientY, mouseDown);
    }
};

export function startCapturingMouseInput() {
    window.addEventListener("mousemove", eventRunner.mousemove);
    window.addEventListener("mousedown", eventRunner.mousedown);
    window.addEventListener("mouseup", eventRunner.mouseup);
}

export function stopCapturingMouseInput() {
    window.removeEventListener("mousemove", eventRunner.mousemove);
    window.removeEventListener("mousedown", eventRunner.mousedown);
    window.removeEventListener("mouseup", eventRunner.mouseup);
}