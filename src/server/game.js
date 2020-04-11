const constants = require("../shared/constants");
const Player = require("./player");
const applyCollisions = require("./collisions");

class Game {
    constructor() {
        this.sockets = {};
        this.players = {};
        this.bullets = {};
        this.lastUpdateTime = Date.now();
        this.shouldSendUpdate = false;
        setInterval(this.update.bind(this), 1000/60);
    }

    addPlayer(socket, username) {
        this.sockets[socket.id] = socket;

        const x = constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
        const y = constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
        this.players[socket.id] = new Player(socket.id, username, x, y);
    }

    removePlayer(socket) {
        delete this.sockets[socket.id];
        delete this.players[socket.id];
    }

    handleInput(socket, dir) {
        if(this.players[socket.id]) {
            this.players[socket.id].setDirection(dir);
        }
    }

    update() {
        const now = Date.now();
        const dt = (now - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = now;

        const bulletsToRemove = [];
        this.bullets.forEach(bullet => {
            if(bullet.update(dt)) {
                bulletsToRemove.push(bullet);
            }
        });
        this.bullets = this.bullets.filter(bullet => !bulletsToRemove.includes(bullet));

        Object.keys(this.sockets).forEach(playerID => {
            const player = this.players[playerID];
            const newBullet = player.update(dt);
            if(newBullet) {
                this.bullets.push(newBullet);
            }
        });

        const destroyedBullets = applyCollisions(Object.values(this.players), this.bullets);
        destroyedBullets.forEach(b => {
            if(this.players[b.parentID]) {
                this.players[b.parentID].onDealtDamage();
            }
        });
        this.bullets = this.bullets.filter(bullet => !destroyedBullets.includes(bullet));

        Object.keys(this.sockets).forEach(playerID => {
            const socket = this.sockets[playerID];
            const player = this.players[playerID];
            if(player.hp <= 0) {
                socket.emit(constants.MSG_TYPES.GAME_OVER);
                this.removePlayer(socket);
            }
        });

        if(this.shouldSendUpdate) {
            const leaderboard = this.getLeaderboard();
            Object.keys(this.sockets).forEach(playerID => {
                const socket = this.sockets[playerID];
                const player = this.players[playerID];
                socket.emit(constants.MSG_TYPES.GAME_UPDATE, this.createUpdate(player, leaderboard));
            });
            this.shouldSendUpdate = false;
        } else {
            this.shouldSendUpdate = true;
        }
    }

    getLeaderBoard() {
        return Object.values(this.players)
            .sort((p1, p2) => p2.score - p1.score)
            .slice(0, 5)
            .map(p => ({username: p.username, score: Math.round(p.score)}));
    }

    createUpdate(player, leaderboard) {
        const nearbyPlayers = Object.values(this.players).filter(
            p => p !== player && p.distanceTo(player) <= constants.MAP_SIZE / 2
        );
        const nearbyBullets = this.bullets.filter(
            b => b.distanceTo(player) <= constants.MAP_SIZE / 2
        );

        return {
            t: Date.now(),
            me: player.serializeForUpdate(),
            others: nearbyPlayers.map(p => p.serializeForUpdate()),
            bullets: nearbyBullets.map(b => b.serializeForUpdate()),
            leaderboard
        };
    }
}

module.exports = Game;