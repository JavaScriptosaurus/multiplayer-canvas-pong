import GameController from './controllers/gameController';
import GameModel from './models/gameModel';
import GameView from './views/gameView';

Object.create(GameController).init(
    Object.create(GameModel),
    Object.create(GameView)
);
