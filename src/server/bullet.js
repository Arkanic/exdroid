const shortid = require("shortid");
const ObjectClass = require("./object");
const constants = require("../shared/constants");

class Bullet extends ObjectClass {
    constructor(parentID, x, y, dir) {
        super(shortid(), x, y, dir, constants.BULLET_SPEED);
        this.parentID = parentID;
    }

    update(dt) {
        super.update(dt);
        return this.x < 0 || this.x > constants.MAP_SIZE || this.y < 0 || this.y > constants.MAP_SIZE;
    }
}

module.exports = Bullet;