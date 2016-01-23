/** @module controllers/gameController */

import io from 'socket.io-client';

// Initialise Socket.io (and makes connection).
const socket = io();

/**
 * Object representing a controller.
 * This is the main controller for our application.
 */
const Controller = {

    init: function (model, view) {

        Object.assign(this, {
            model: model.init(),
            view: view.init()
        });

        this.view.on({
            'input:move': this.movePlayer.bind(this),
            'input:username': this.connectPlayer.bind(this)
        });

        this.model.on({
            'game:start': this.view.startGame.bind(this.view),
            'game:update': this.view.updateGame.bind(this.view)
        });

        socket.on('game:start', this.model.startGame.bind(this.model));
        socket.on('game:update', this.model.updateGame.bind(this.model));
    },

    connectPlayer: function (username) {
        const player = { username, color: 'rgba(155,0,155,1)' }; // TODO: hardcoded color
        this.model.username = username;
        socket.emit('input:player', player);
    },

    movePlayer: function (currentKey) {
        const yMovements = { 'up': -1, 'down': 1 };
        const movementData = {
            y: yMovements[currentKey],
            username: this.model.username
        };

        socket.emit('player:move', movementData);
    }
};

export default Controller;
