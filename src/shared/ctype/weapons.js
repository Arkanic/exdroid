const Bullet = require("../../server/bullet");

const weapons = Object.freeze({
    basic: {
        fire: (id, x, y, dir) => {
            return [
                new Bullet(id, x, y, dir, weapons.basic.meta)
            ];
        },
        meta: {
            radius: 3,
            speed: 1600,
            damage: 10,
            cooldown: 0.25
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
            radius: 3,
            speed: 1600,
            damage: 10,
            cooldown: 0.5,
            lifetime: 0.5
        }
    }
});

module.exports = weapons;