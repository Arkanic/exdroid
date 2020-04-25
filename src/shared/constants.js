module.exports = Object.freeze({
    PLAYER_RADIUS: 20,
    PLAYER_MAX_HP: 100,
    PLAYER_SPEED: 400,

    SCORE_BULLET_HIT: 200,
    SCORE_PER_SECOND: 10,

    MAP_SIZE: 4000,
    MSG_TYPES: {
        JOIN_GAME: 'join_game',
        GAME_UPDATE: 'update',
        INPUT: 'input',
        GAME_OVER: 'dead',
        CONNECTION: "connection",
        DISCONNECT: "disconnect"
    }
});