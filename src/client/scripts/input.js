import {updateMouseState, updateKeyboardState} from "./networking";

import {startCapturingMouseInput, stopCapturingMouseInput} from "./input/mouse";

export function startCapturingInput() {
    startCapturingMouseInput();
};

export function stopCapturingInput() {
    stopCapturingMouseInput();
};