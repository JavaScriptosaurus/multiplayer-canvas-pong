import PubSub from '../utils/pubsub';
import canvasManager from '../utils/canvas';

export default class View {

    constructor () {
        this.events = new PubSub();
        this.init();
    }

    init () {
        class Player {

            constructor (name, color, side) {
                this.name = name;
                this.color = color;
                this.score = 0;
                this.yPosition = 200;
                this.xPosition = (side === 'left') ? 10 : 590;
                this.paddle = canvasManager.createRectangle(20, 120, this.xPosition, this.yPosition, this.color);
            }

        }

        const canvas = document.getElementsByTagName('canvas')[0];
        const canvasRenderer = canvasManager.getRenderer(canvas, {width: 600, height: 400});
        const ourCircleTest = canvasManager.createCircle(20, 200, 200, 'rgba(75,75,75,1)');

        const player1 = new Player('Player 1', 'rgba(155,0,155,1)', 'left');
        const player2 = new Player('Player 2', 'rgba(0,155,155,1)', 'right');

        setInterval(() => {
            const coords = { x: 0.2, y: -0.1 };
            ourCircleTest.move(coords);
            this.events.publish('test', { moving: coords })
        }, 10);

        canvasRenderer.addElements(player1.paddle, player2.paddle, ourCircleTest);

        // setInterval(function () {
        //     ourOtherRectangleTest.move({ x: 0.2, y: -0.1 });
        // }, 10);
        //
        // let interval;
        // document.addEventListener('keydown', function (event) {
        //     const pressedKey = event.keyCode;
        //     const keyCodes = {
        //         37: 'left',
        //         38: 'up',
        //         39: 'right',
        //         40: 'down'
        //     };
        //
        //     let distanceToMove = {
        //         x: 0,
        //         y: 0
        //     };
        //
        //     const movements = {
        //         x: {
        //             'left': -1,
        //             'right': 1
        //         },
        //         y: {
        //             'up': -1,
        //             'down': 1
        //         }
        //     };
        //
        //     const currentKey = keyCodes[pressedKey];
        //     distanceToMove.x = movements.x[currentKey];
        //     distanceToMove.y = movements.y[currentKey];
        //
        //     clearInterval(interval);
        //     interval = setInterval(function () {
        //         // TODO Calculate max movable distance with physics engine?
        //         ourRectangleTest.move(distanceToMove);
        //     }, 1);
        // });
        // document.addEventListener('keyup', function () {
        //     clearInterval(interval);
        // });

    }

}
