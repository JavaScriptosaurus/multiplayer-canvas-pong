import Controller from './controllers/controller';
import Model from './models/model';
import View from './views/view';

const testModel = new Model();
const testView = new View();
const testController = new Controller(testModel, testView);

testController.init();
