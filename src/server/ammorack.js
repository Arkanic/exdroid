const ammunitionTypes = require("../shared/ctype/ammunition");
class AmmunitionRack {
    constructor() {
        this.magazine = {};
        for(let i in ammunitionTypes) {
            this.magazine[i] = 0;
        }
    }
    serialize() {
        let val = {};
        for(let i in this.magazine) {
            val[i] = this.magazine[i];
        }
        return val;
    }
}
module.exports = AmmunitionRack;