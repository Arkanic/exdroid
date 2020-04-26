let mouse = {
    down: false,
    x: 0,
    y: 0
};

const eventRunner = {
    runOnMouseMove: (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    },
    runOnMouseDown: (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.down = true;
    },
    runOnMouseUp: (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.down = false;
    }
};

export function getMouseState() {
    return mouse;
}

export function startMouseInput() {
    window.addEventListener("mousemove", eventRunner.runOnMouseMove);
    window.addEventListener("mousedown", eventRunner.runOnMouseDown);
    window.addEventListener("mouseup", eventRunner.runOnMouseUp);
}

export function stopMouseInput() {
    window.addEventListener("mousemove", eventRunner.runOnMouseMove);
    window.addEventListener("mousedown", eventRunner.runOnMouseDown);
    window.addEventListener("mouseup", eventRunner.runOnMouseUp);
}