/** @module utils/canvas */

class Shape {

    constructor (properties) {
        Object.assign(this, properties);
    }

    setContext (context) {
        this.ctx = context;
    }

    draw () {
        if (this.ctx) {
            this.ctx.beginPath();
            this._drawPath();
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }
    }

    _drawPath () {
        // Shape specific, no-op.
    }

    move (movement) {
        Object.keys(movement).forEach(axis => {
            this[axis] += movement[axis];
        });
    }

}

class Rectangle extends Shape {

    get x () {
        return this._x + this.width / 2;
    }

    set x (x) {
        this._x = x - this.width / 2;
    }

    get y () {
        return this._y + this.height / 2;
    }

    set y (y) {
        this._y = y - this.height / 2;
    }

    _drawPath () {
        this.ctx.rect(this._x, this._y, this.width, this.height);
    }

}

class Circle extends Shape {

    _drawPath () {
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    }

}

function CanvasRenderer (canvas, dimensions) {
    // Set up canvas and dimensions.
    const ctx = canvas.getContext('2d');
    Object.assign(canvas, dimensions);

    // Renderable elements
    let elementsToRender = [];

    function renderCanvas () {
        // Clear whole canvas.
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // For each element to render, call draw.
        elementsToRender.forEach(element => {
            if (element.draw instanceof Function) {
                element.draw();
            }
        });
    }

    // Start rendering.
    const requestAnimationFrame = window.requestAnimationFrame;
    (function renderLoop () {
        renderCanvas();
        requestAnimationFrame(renderLoop);
    })();

    return {

        addElements: (...elements) => {
            // TODO: Check if element is in the list?
            elements.forEach(element => {
                element.setContext(ctx);
                elementsToRender.push(element);
            });
        }

    };
}

export default {

    getRenderer: (canvas, dimensions) => {
        return CanvasRenderer(canvas, dimensions);
    },

    createRectangle: (width, height, x, y, color) => {
        return new Rectangle({width, height, x, y, color});
    },

    createCircle: (radius, x, y, color) => {
        return new Circle({radius, x, y, color});
    }

};
