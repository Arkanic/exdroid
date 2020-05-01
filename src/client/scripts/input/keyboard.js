import {updateKeyboardState} from "../networking";

let keys = {
    f: false
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
    },
    keyup: (e) => {
        if(e.keyCode == 70) {
            keys.f = false;
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