const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const socketio = require("socket.io");

const constants = require("./src/shared/constants");
const Game = require("./src/server/game");
const webpackConfig = require("./webpack.dev");

const app = express();
app.use(express.static("public"));

if(process.env.NODE_ENV == "development") {
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler));
} else {
    app.use(express.static("dist"));
}

const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log("Server Started.")

const io = socketio(server);
io.on(constants.MSG_TYPES.CONNECTION, socket => {
    socket.on(constants.MSG_TYPES.JOIN_GAME, joinGame);
    socket.on(constants.MSG_TYPES.INPUT_MOUSE, handleInput);
    socket.on(constants.MSG_TYPES.DISCONNECT, onDisconnect);
});

const game = new Game();

function joinGame(username) {
    game.addPlayer(this, username);
}
function handleInput(dir) {
    game.handleInput(this, dir);
}
function onDisconnect() {
    game.removePlayer(this);
}