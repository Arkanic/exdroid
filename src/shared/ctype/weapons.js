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
            lifetime: 0.6
        }
    },
    shotgun: {
        fire: (id, x, y, dir) => {
            let bullets = [];
            for(let i = 0; i < 5; i++) {
                bullets.push(new Bullet(id, x, y, dir + (Math.PI / 180)*(Math.random()*8-4), weapons.shotgun.meta))
            }
            return bullets;
        },
        meta: {
            radius: 2,
            speed: 1000,
            damage: 15,
            cooldown: 5,
            lifetime: 0.5
        }
    },
    rotary: {
        fire: (id, x, y, dir) => {
            return [new Bullet(id, x, y, dir + (Math.PI / 180)*(Math.random()*4-2), weapons.rotary.meta)];
        },
        meta: {
            radius: 3,
            speed: 1400,
            damage: 7,
            cooldown: 1,
            lifetime: 2
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
            lifetime: 1
        }
    },
    repeater: {
        fire: (id, x, y, dir) => {
            return [new Bullet(id, x, y, dir, weapons.repeater.meta)];
        },
        meta: {
            radius: 4,
            speed: 2000,
            damage: 25,
            cooldown: 4,
            lifetime: 3
        }
    }
});

module.exports = weapons;