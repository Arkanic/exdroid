const weapons = require("../shared/ctype/weapons");
const Obtainable = require("./obtainable");
const constants = require("../shared/constants");

module.exports = () => {
    let loot = [];
    for(let i in weapons) {
        for(let j = 0; j < 2; j++) {
            let x = Math.floor(Math.random() * constants.MAP_SIZE);
            let y = Math.floor(Math.random() * constants.MAP_SIZE);
            loot.push(new Obtainable(x, y, 0, {type:"weapon", content:i}));
        }
    }
    return loot;
}