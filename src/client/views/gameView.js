/** @module views/gameView */

import canvasManager from '../utils/canvas';
import eventSystem from '../components/eventSystem';
import domEvents from '../components/domEvents';

const GameView = {
    init: function () {
        // FIXME: This is copying eventSystem, should inherit prototype.
        Object.assign(this, eventSystem, domEvents);

        this.addDomEvents({
            'document:keydown': this.handleKeydown,
            'document:keyup': this.stopHandlingKeydown,
            '.login button:click': this.getUsername
        });

        return this;
    },

    createGameCanvas: function (boardData) {
        const canvas = document.getElementsByTagName('canvas')[0];
        const canvasRenderer = canvasManager.getRenderer(canvas, {width: boardData.canvas.width, height: boardData.canvas.height});
        const ourCircleTest = canvasManager.createCircle(boardData.ballRadius, 200, 200, 'rgba(75,75,75,1)');
        this.players = boardData.players;
        const playerPaddles = [];

        Object.keys(this.players).forEach(player => {
            const currentPlayer = this.players[player];
            currentPlayer.paddle = canvasManager.createRectangle(boardData.paddle.width, boardData.paddle.height, currentPlayer.x, currentPlayer.y, currentPlayer.color);
            playerPaddles.push(currentPlayer.paddle);
        });

        canvasRenderer.addElements(ourCircleTest, ...playerPaddles);

        setInterval(() => {
            ourCircleTest.move({ x: 0.2, y: -0.1 });
        }, 10);
    },

    getUsername: function (event) {
        event.preventDefault();

        const input = document.querySelector('.login input');
        const username = input.value;

        this.trigger('input:username', username);
    },

    handleKeydown: function (event) {
        const pressedKey = event.keyCode;
        const allowedKeyCodes = {
            38: 'up',
            40: 'down'
        };
        const currentKey = allowedKeyCodes[pressedKey];

        if (currentKey) {

            clearInterval(this.interval);
            this.interval = setInterval(() => {
                this.trigger('input:move', currentKey);
            }, 1);
        }
    },

    stopHandlingKeydown: function () {
        clearInterval(this.interval);
    },

    startGame: function (boardData) {
        document.querySelector('.login').classList.toggle('hidden');
        document.querySelector('.game').classList.toggle('hidden');
        this.createGameCanvas(boardData);
    },

    updateGame: function ({ players }) {
        Object.keys(players).forEach(player => {
            // TODO: move logic to model
            const y = players[player].y - this.players[player].paddle.y;
            this.players[player].paddle.move({ y });
        });
    }
};

export default GameView;
