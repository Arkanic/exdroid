import {updateKeyboardState} from "../networking";

let keys = {
    f: false,
    w: false,
    a: false,
    s: false,
    d: false
};

function handleInput(keys) {
    updateKeyboardState({f:keys.f});
}

const eventRunner = {
    keydown: (e) => {
        if(e.keyCode == 70) {
            keys.f = true;
            handleInput(keys);
        }
        if(e.keyCode == 87) {
            keys.w = true;
            handleInput(keys);
        }
        if(e.keyCode == 65) {
            keys.a = true;
            handleInput(keys);
        }
        if(e.keyCode == 83) {
            keys.s = true;
            handleInput(keys);
        }
        if(e.keyCode == 68) {
            keys.d = true;
            handleInput(keys);
        }
    },
    keyup: (e) => {
        if(e.keyCode == 70) {
            keys.f = false;
            handleInput(keys);
        }
        if(e.keyCode == 87) {
            keys.w = false;
            handleInput(keys);
        }
        if(e.keyCode == 65) {
            keys.a = false;
            handleInput(keys);
        }
        if(e.keyCode == 83) {
            keys.s = false;
            handleInput(keys);
        }
        if(e.keyCode == 68) {
            keys.d = false;
            handleInput(keys);
        }
    }
};

export function startCapturingKeyboardInput() {
    window.addEventListener("keydown", eventRunner.keydown);
    window.addEventListener("keyup", eventRunner.keyup);
};

export function stopCapturingKeyboardInput() {
    window.removeEventListener("keydown", eventRunner.keydown);
    window.removeEventListener("keyup", eventRunner.keyup);
};