const constants = require("../shared/constants");

function applyCollisions(players, bullets) {
    const destroyedBullets = [];
    for(let i = 0; i < bullets.length; i++) {
        for(let j = 0; j < players.length; j++) {
            const bullet = bullets[i];
            const player = players[j];
            if(
                bullet.parentID !== player.id &&
                player.distanceTo(bullet) <= constants.PLAYER_RADIUS + bullet.radius
            ) {
                destroyedBullets.push(bullet);
                player.takeBulletDamage(bullet, players);
                break;
            }
        }
    }
    return destroyedBullets;
}

module.exports = applyCollisions;