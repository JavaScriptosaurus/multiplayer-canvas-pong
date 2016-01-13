import canvasManager from './utils/canvas';

const canvas = document.getElementsByTagName('canvas')[0];
const ourCanvas = canvasManager.init(canvas, 600, 400);
const ourRectangleTest = canvasManager.createRectangle(50, 50, 10, 10, 'blue');
ourRectangleTest.draw();
