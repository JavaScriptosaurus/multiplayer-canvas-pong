import canvasManager from './utils/canvas';

const canvas = document.getElementsByTagName('canvas')[0];
const canvasRenderer = canvasManager.getRenderer(canvas, {width: 600, height: 400});
const ourRectangleTest = canvasManager.createRectangle(50, 50, 10, 10, 'blue');
const ourOtherRectangleTest = canvasManager.createRectangle(100, 50, 100, 150, 'rgba(255, 155, 55, 1)');

canvasRenderer.addElements(ourRectangleTest, ourOtherRectangleTest);

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

    let movement = {
        x: 0,
        y: 0
    };

    switch (keyCodes[pressedKey]) {
        case 'left':
            movement.x = -1;
            break;
        case 'right':
            movement.x = 1;
            break;
        case 'up':
            movement.y = -1;
            break;
        case 'down':
            movement.y = 1;
            break;
    };

    clearInterval(interval);
    interval = setInterval(function () {
        ourRectangleTest.move(movement);
    }, 1);
});
document.addEventListener('keyup', function () {
    clearInterval(interval);
});
