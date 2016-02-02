const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

import GameBoard from './helpers/gameBoard';

const gameConfig = {
    ball: {
        radius: 20
    },
    canvas: {
        width: 600,
        height: 400
    },
    paddle: {
        width: 20,
        height: 120
    }
};

const port = 1337;

app.use(express.static('public'));

let players = [];
let gameBoard;

io.on('connection', client => {
    console.log('Connected'); //eslint-disable-line no-console
    client.on('disconnect', () => {
        players = [];
        console.log('Disconnected'); //eslint-disable-line no-console
    });

    client.on('player:move', movementData => {
        const boardData = gameBoard.movePlayer(movementData);
        io.emit('game:update', boardData);
    });

    client.on('input:player', player => {
        players.push(player);
        console.log(player); //eslint-disable-line no-console
        if (players.length === 2) {
            gameBoard = new GameBoard(gameConfig, players);
            const boardData = gameBoard.getData();
            io.emit('game:start', boardData);
        }
    });
});

http.listen(port, () => {
    console.log(`Listening on port ${port}.`); //eslint-disable-line no-console
});
