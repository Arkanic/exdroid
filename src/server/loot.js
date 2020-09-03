const weapons = require("../shared/ctype/weapons");
const ammunition = require("../shared/ctype/ammunition");
const Obtainable = require("./obtainable");
const constants = require("../shared/constants");

module.exports = () => {
    let loot = [];
    for(let i in weapons) {
        for(let j = 0; j < constants.MAP_SIZE/1000; j++) {
            let x = Math.floor(Math.random() * constants.MAP_SIZE);
            let y = Math.floor(Math.random() * constants.MAP_SIZE);
            loot.push(new Obtainable(x, y, 0, {type:"weapon", content:i}));
            loot.push(new Obtainable(x-48, y+48, 0, {type:"ammunition", content:weapons[i].meta.ammunition, amount:Math.floor(weapons[i].meta.sammo/2)}));
            loot.push(new Obtainable(x+48, y+48, 0, {type:"ammunition", content:weapons[i].meta.ammunition, amount:Math.ceil(weapons[i].meta.sammo/2)}));
        }
    }
    for(let i in ammunition) {
        for(let j = 0; j < constants.MAP_SIZE/1000*5; j++) {
            let x = Math.floor(Math.random() * constants.MAP_SIZE);
            let y = Math.floor(Math.random() * constants.MAP_SIZE);
            loot.push(new Obtainable(x, y, 0, {type:"ammunition", content:i, amount:50}));
        }
    }
    for(let j = 0; j < constants.MAP_SIZE/1000; j++) {
        let x = Math.floor(Math.random() * constants.MAP_SIZE);
        let y = Math.floor(Math.random() * constants.MAP_SIZE);
        loot.push(new Obtainable(x, y, 0, {type:"consumable"}));
    }
    return loot;
}