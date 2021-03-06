import {debounce} from "throttle-debounce";
import {getAsset} from "./assets";
import {getCurrentState} from "./state";

const constants = require("../../shared/constants");
const weaponTypes = require("../../../public/meta/weapons");
const ammunitionTypes = require("../../../public/meta/ammunition");

const {PLAYER_RADIUS, PLAYER_MAX_HP, MAP_SIZE} = constants;

const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");
setCanvasDimensions();

context.font = "10px Arial";
context.textAlign = "center";

function setCanvasDimensions() {
    const scaleRatio = Math.max(1, 800 / window.innerWidth);
    canvas.width = scaleRatio * window.innerWidth;
    canvas.height = scaleRatio * window.innerHeight;
}

window.addEventListener("resize", debounce(40, setCanvasDimensions));

function render() {
    const {me, others, bullets, obtainables} = getCurrentState();
    if(!me) return;

    renderBackground(me.x, me.y);

    /*const backgroundGradient = context.createRadialGradient(
        -canvas.width/2,
        -canvas.height/2,
        MAP_SIZE/2,
        MAP_SIZE/2
    );
    backgroundGradient.addColorStop(0, "darkgray");
    backgroundGradient.addColorStop(1, "black");*/

    context.fillStyle = "darkgray";
    context.lineWidth = 1;
    context.fillRect(canvas.width/2 - me.x, canvas.height/2 - me.y, MAP_SIZE, MAP_SIZE);

    obtainables.forEach(renderObtainable.bind(null, me));

    bullets.forEach(renderBullet.bind(null, me));

    renderPlayer(me, me);
    others.forEach(renderPlayer.bind(null, me));
}

function renderBackground(x, y) {
    const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
    const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
    /*const backgroundGradient = context.createRadialGradient(
        backgroundX,
        backgroundY,
        MAP_SIZE / 10,
        backgroundX,
        backgroundY,
        MAP_SIZE / 2
    );
    backgroundGradient.addColorStop(0, "black");
    backgroundGradient.addColorStop(1, "black");
    */
    const image = getAsset("space.jpg");
    const ptrn = context.createPattern(image, "repeat");
    context.fillStyle = ptrn;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function renderPlayer(me, player) {
    const {x, y, direction, weapon} = player;
    const canvasX = canvas.width / 2 + x - me.x;
    const canvasY = canvas.height / 2 + y - me.y;

    context.save();
    context.translate(canvasX, canvasY);
    context.rotate(direction);
    context.drawImage(
        getAsset("ship.svg"),
        -PLAYER_RADIUS,
        -PLAYER_RADIUS,
        PLAYER_RADIUS * 2,
        PLAYER_RADIUS * 2
    );
    context.restore();

    context.fillStyle = "white";
    context.fillRect(
        canvasX - PLAYER_RADIUS,
        canvasY + PLAYER_RADIUS + 8,
        PLAYER_RADIUS * 2,
        2
    );
    context.fillStyle = "red";
    context.fillRect(
        canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * player.hp / PLAYER_MAX_HP,
        canvasY + PLAYER_RADIUS + 8,
        PLAYER_RADIUS * 2 * (1 - player.hp / PLAYER_MAX_HP),
        2
    );
    let pUsername = "Player";
    if(player.username != "") {
        pUsername = player.username;
    }
    context.fillStyle = "white";
    context.fillText(pUsername, canvasX, canvasY + PLAYER_RADIUS + 24);
    context.fillText(weapon, canvasX, canvasY + PLAYER_RADIUS + 33);
}

function renderBullet(me, bullet) {
    const {x, y, px, py, direction, radius} = bullet;
    context.save();
    context.translate(canvas.width / 2 + x - me.x, canvas.height / 2 + y - me.y);
    context.rotate(direction);
    context.drawImage(
        getAsset("bullet.svg"),
        -radius,
        -radius,
        radius * 2,
        radius * 2
    );
    context.restore();
}

function renderObtainable(me, obtainable) {
    const {x, y, direction, radius, content} = obtainable;
    context.save();
    context.translate(canvas.width / 2 + x - me.x, canvas.height / 2 + y - me.y);
    if(obtainable.content.type == "weapon") {
        context.drawImage(
            getAsset("circle.svg"),
            -radius*1.5,
            -radius*1.5,
            radius*3,
            radius*3
        );
        context.drawImage(
            getAsset(`${content.content}.svg`),
            -radius*1.5,
            -radius,
            radius * 3,
            radius * 2
        );
    } else if(obtainable.content.type == "ammunition") {
        let radius = 16;
        context.drawImage(
            getAsset(`ammo-${ammunitionTypes[obtainable.content.content].colour}.svg`),
            -radius,
            -radius,
            radius*2,
            radius*2
        );
    } else if(obtainable.content.type == "consumable") {
        context.drawImage(
            getAsset("healthpack.svg"),
            -radius,
            -radius,
            radius*2,
            radius*2
        );
    }
    context.restore();
}

function renderMainMenu() {
    const t = Date.now() / 7500;
    const x = MAP_SIZE / 2 + 800 * Math.cos(t);
    const y = MAP_SIZE / 2 + 800 * Math.sin(t);
    renderBackground(x, y);
}

let renderInterval = setInterval(renderMainMenu, 1000/60);

export function startRendering() {
    clearInterval(renderInterval);
    renderInterval = setInterval(render, 1000/60);
}

export function stopRendering() {
    clearInterval(renderInterval);
    renderInterval = setInterval(renderMainMenu, 1000/60);
}