import {updateMouseState, updateKeyboardState} from "./networking";

import {startCapturingMouseInput, stopCapturingMouseInput} from "./input/mouse";
import {startCapturingKeyboardInput, stopCapturingKeyboardInput} from "./input/keyboard";

export function startCapturingInput() {
    startCapturingMouseInput();
    startCapturingKeyboardInput();
};

export function stopCapturingInput() {
    stopCapturingMouseInput();
    stopCapturingKeyboardInput();
};