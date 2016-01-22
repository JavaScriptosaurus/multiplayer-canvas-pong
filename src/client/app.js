import Controller from './controllers/controller';
import GameModel from './models/gameModel';
import CanvasView from './views/canvasView';
import PubSub from './utils/pubSub';

const eventSystem = new PubSub();

const gameModel = new GameModel(eventSystem);
const canvasView = new CanvasView(eventSystem);
const testController = new Controller(eventSystem, gameModel, canvasView);

testController.init();
