const Bullet = require("../../server/bullet");

module.exports = Object.freeze({
    basic: {
        fire: (id, x, y, dir) => {
            return [
                new Bullet(id, x, y, dir, 1)
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
            return [
                new Bullet(id, x, y, dir + (Math.PI / 180)*(Math.random()*8-4), 0.3, 1600),
                new Bullet(id, x, y, dir + (Math.PI / 180)*(Math.random()*8-4), 0.3, 1600),
                new Bullet(id, x, y, dir + (Math.PI / 180)*(Math.random()*8-4), 0.3, 1600),
                new Bullet(id, x, y, dir + (Math.PI / 180)*(Math.random()*8-4), 0.3, 1600),
                new Bullet(id, x, y, dir + (Math.PI / 180)*(Math.random()*8-4), 0.3, 1600)
            ];
        },
        meta: {
            radius: 3,
            speed: 1600,
            damage: 10,
            cooldown: 0.25
        }
    }
});