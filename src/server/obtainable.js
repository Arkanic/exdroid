const ObjectClass = require("./object");
const constants = require("../shared/constants");
const shortid = require("shortid");

class Obtainable extends ObjectClass {
    constructor(x, y, dir, content) {
        super(shortid(), x, y, dir, 0);
        this.content = content;
        this.pickupCooldown = 0;
    }

    update(dt) {
        super.update(dt);
        this.x = Math.max(0, Math.min(constants.MAP_SIZE, this.x));
        this.y = Math.max(0, Math.min(constants.MAP_SIZE, this.y));
        if(this.pickupCooldown > 0) this.pickupCooldown -= dt;
    }

    pickup() {
        if(this.pickupCooldown >= 0) {
            this.pickupCooldown += 10;
            return true;
        } else {
            return false;
        }
    }

    serializeForUpdate() {
        return {
            ...(super.serializeForUpdate()),
            content: this.content,
            radius: 32
        }
    }
}

module.exports = Obtainable;