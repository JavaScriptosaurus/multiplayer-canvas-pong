/** @module helpers/gameBoard */

export default class GameBoard {

    constructor (gameConfig, players) {
        Object.assign(this, gameConfig);

        this.players = {};

        players.forEach((player, index) => {
            this.players[player.username] = new Player(gameConfig, player.color, index);
        });

    }

    getData () {
        return {
            ballRadius: this.ballRadius,
            canvas: this.canvas,
            paddle: this.paddle,
            players: this.players
        };
    }

    movePlayer (movementData) {
        this.players[movementData.username].y += movementData.y;
        return this.getData();
    }

}

class Player {

    constructor (gameConfig, color, index) {
        const canvasWidth = gameConfig.canvas.width;
        const canvasHeight = gameConfig.canvas.height;
        const playerWidth = gameConfig.paddle.width;

        this.color = color;
        this.score = 0;
        this.y = canvasHeight / 2;
        this.x = index ? playerWidth / 2 : canvasWidth - playerWidth / 2;
    }

}
