const fs = require("fs");

const weaponTypes = require("../src/shared/ctype/weapons");

let exportWeapons = {};

for(let i in weaponTypes) {
    exportWeapons[i] = weaponTypes[i].meta;
}
let exportWeaponsString = "module.exports="
exportWeaponsString += JSON.stringify(exportWeapons);
exportWeaponsString = new Uint8Array(Buffer.from(exportWeaponsString))
fs.writeFile(__dirname + "/../public/meta/weapons.js", exportWeaponsString, (err) => {
    if(err) throw err;
    console.log("Generated weapons.");
});