const ObjectClass = require("./object");
const Bullet = require("./bullet");
const constants = require("../shared/constants");

class Player extends ObjectClass {
    constructor(id, username, x, y) {
        super(id, x, y, Math.random() * 2 * Math.PI, constants.PLAYER_SPEED);
        this.username = username;
        this.hp = constants.PLAYER_MAX_HP;
        this.fireCooldown = 0;
        this.score = 0;
    }

    update(dt) {
        super.update(dt);
        this.score += dt * constants.SCORE_PER_SECOND;
        
        this.x = Math.max(0, Math.min(constants.MAP_SIZE, this.x));
        this.y = Math.max(0, Math.min(constants.MAP_SIZE, this.y));

        this.fireCooldown -= dt;
        if(this.fireCooldown <= 0) {
            this.fireCooldown += constants.PLAYER_FIRE_COOLDOWN;
            return new Bullet(this.id, this.x, this.y, this.direction);
        }

        return null;
    }

    takeBulletDamage() {
        this.hp -= constants.SCORE_BULLET_HIT;
    }

    onDealtDamage() {
        this.score += constants.SCORE_BULLET_HIT;
    }

    serializeForUpdate() {
        return {
            ...(super.serializeForUpdate()),
            direction: this.direction,
            hp: this.hp
        };
    }
}

module.exports = Player;