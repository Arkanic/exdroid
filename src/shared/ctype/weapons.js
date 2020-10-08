const Bullet = require("../../server/bullet");



const weapons = Object.freeze({
    basic: {
        fire: (id, x, y, dir) => {
            return [
                new Bullet(id, x, y, dir, weapons.basic.meta)
            ];
        },
        meta: {
            radius: 4,
            speed: 2000,
            damage: 30,
            cooldown: 3,
            lifetime: 0.6,
            ammunition: "AP102",
            sammo: 30,
            reductcount: 1
        }
    },
    shotgun: {
        fire: (id, x, y, dir) => {
            let bullets = [];
            for(let i = 0; i < 50; i++) {
                bullets.push(new Bullet(id, x+Math.floor(Math.random() * 16)-8, y+Math.floor(Math.random() * 16)-8, dir + (Math.PI / 180)*(Math.random()*6-3), weapons.shotgun.meta))
            }
            return bullets;
        },
        meta: {
            radius: 2,
            speed: 2400,
            damage: 6,
            cooldown: 10,
            lifetime: 0.3,
            ammunition: "B89",
            sammo: 15,
            reductcount: 1
        }
    },
    rotary: {
        fire: (id, x, y, dir) => {
            return [new Bullet(id, x, y, dir + (Math.PI / 180)*(Math.random()*4-2), weapons.rotary.meta)];
        },
        meta: {
            radius: 3,
            speed: 2400,
            damage: 15,
            cooldown: 0.25,
            lifetime: 50,
            ammunition: "T108",
            sammo: 75,
            reductcount: 1
        }
    },
    sniper: {
        fire: (id, x, y, dir) => {
            return [new Bullet(id, x, y, dir, weapons.sniper.meta)];
        },
        meta: {
            radius: 7,
            speed: 2500,
            damage: 100,
            cooldown: 7,
            lifetime: 1,
            ammunition: "T108",
            sammo: 20,
            reductcount: 1
        }
    },
    repeater: {
        fire: (id, x, y, dir) => {
            return [
                new Bullet(id, x, y, dir+(Math.PI / 180)*(Math.random()*4-2), weapons.repeater.meta),
                new Bullet(id, x, y, dir+(Math.PI / 180)*(Math.random()*4-2), weapons.repeater.meta)
            ];
        },
        meta: {
            radius: 4,
            speed: 2500,
            damage: 30,
            cooldown: 3,
            lifetime: 2,
            ammunition: "AP102",
            sammo: 50,
            reductcount: 2
        }
    },
});

module.exports = weapons;