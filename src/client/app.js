import canvasManager from './utils/canvas';

const canvas = document.getElementsByTagName('canvas')[0];
const canvasRenderer = canvasManager.getRenderer(canvas, {width: 600, height: 400});
const ourRectangleTest = canvasManager.createRectangle(50, 50, 10, 10, 'blue');
const ourCircleTest = canvasManager.createCircle(25, 200, 200, 'green');
const ourOtherRectangleTest = canvasManager.createRectangle(100, 50, 100, 150, 'rgba(255, 155, 55, 1)');

canvasRenderer.addElements(ourRectangleTest, ourOtherRectangleTest, ourCircleTest);

setInterval(function () {
    ourOtherRectangleTest.move({ x: 0.2, y: -0.1 });
}, 10);

let interval;
document.addEventListener('keydown', function (event) {
    const pressedKey = event.keyCode;
    const keyCodes = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    let distanceToMove = {
        x: 0,
        y: 0
    };

    const movements = {
        x: {
            'left': -1,
            'right': 1
        },
        y: {
            'up': -1,
            'down': 1
        }
    };

    const currentKey = keyCodes[pressedKey];
    distanceToMove.x = movements.x[currentKey];
    distanceToMove.y = movements.y[currentKey];

    clearInterval(interval);
    interval = setInterval(function () {
        // TODO Calculate max movable distance with physics engine?
        ourRectangleTest.move(distanceToMove);
    }, 1);
});
document.addEventListener('keyup', function () {
    clearInterval(interval);
});
