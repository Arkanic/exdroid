import io from "socket.io-client";
import {throttle} from "throttle-debounce";
import {processGameUpdate} from "./state";

const constants = require("../../shared/constants");

const socketProtocol = (window.location.protocol.includes("https")) ? "wss" : "ws";
const socket = io(`${socketProtocol}://${window.location.host}`, {reconnection: false});
const connectedPromise = new Promise(resolve => {
    socket.on("connect", () => {
        console.log("Connected");
        resolve();
    });
});

export const connect = onGameOver => (
    connectedPromise.then(() => {
        socket.on(constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
        socket.on(constants.MSG_TYPES.GAME_OVER, onGameOver);
        socket.on("disconnect", () => {
            console.log("Disconnected");
            document.getElementById("disconnect-modal").classList.remove("hidden");
            document.getElementById("reconnect-button").onclick = () => {
                window.location.reload();
            };
        });
    })
);

export const play = username => {
    socket.emit(constants.MSG_TYPES.JOIN_GAME, username);
};

export const updateMouseState = throttle(20, state => {
    socket.emit(constants.MSG_TYPES.INPUT_MOUSE, state);
});

export const updateKeyboardState = throttle(20, state => {
    socket.emit(constants.MSG_TYPES.INPUT_KEYBOARD, state);
});