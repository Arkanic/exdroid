module.exports = Object.freeze({
    PLAYER_RADIUS: 20,
    PLAYER_MAX_HP: 100,
    PLAYER_SPEED: 400,
    PLAYER_FIRE_COOLDOWN: 0.25,

    BULLET_RADIUS: 3,
    BULLET_SPEED: 1600,
    BULLET_DAMAGE: 10,

    SCORE_BULLET_HIT: 200,
    SCORE_PER_SECOND: 10,

    MAP_SIZE: 4000,
    MSG_TYPES: {
        JOIN_GAME: 'join_game',
        GAME_UPDATE: 'update',
        INPUT: 'input',
        GAME_OVER: 'dead'
    }
});