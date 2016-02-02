/** @module models/gameModel */

import eventSystem from '../components/eventSystem';

const GameModel = {
    init: function () {
        // FIXME: This is copying eventSystem, should inherit prototype.
        Object.assign(this, eventSystem);
        return this;
    },

    startGame: function (boardData) {
        this.boardData = boardData;
        this.trigger('game:start', boardData);
    },

    updateGame: function (boardData) {
        this.boardData = boardData;
        this.trigger('game:update', boardData);
    }
};

export default GameModel;
