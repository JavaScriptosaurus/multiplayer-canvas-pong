/**
 * Canvas Manager
 * TODO: Description to come later.
 */

class Shape {

    constructor (width, height, x, y, color) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    setContext (context) {
        this.ctx = context;
    }

    draw () {
        if (this.ctx) {
            this.ctx.beginPath();
            this.ctx.rect(this.x, this.y, this.width, this.height);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }
    }

    move (dimensions) {
        if (dimensions.x) {
            this.x += dimensions.x;
        }
        if (dimensions.y) {
            this.y += dimensions.y;
        }
    }

}

class Rectangle extends Shape {
    // TODO
}

class Circle extends Shape {
    // TODO
}

function CanvasRenderer (canvas, dimensions) {
    // Set up canvas and dimensions.
    const ctx = canvas.getContext('2d');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Renderable elements
    let elementsToRender = [];

    function renderCanvas () {
        // Clear whole canvas.
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // For each element to render, call draw.
        elementsToRender.forEach(function (element) {
            if (element.draw instanceof Function) {
                element.draw();
            }
        });
    };

    // Start rendering.
    const requestAnimationFrame = window.requestAnimationFrame;
    (function renderLoop () {
        renderCanvas();
        requestAnimationFrame(renderLoop);
    })();

    return {

        addElements: function (...elements) {
            // TODO: Check if element is in the list?
            elements.forEach(function (element) {
                element.setContext(ctx);
                elementsToRender.push(element);
            });
        }

    };
}

export default {

    getRenderer: function (canvas, dimensions) {
        return CanvasRenderer(canvas, dimensions);
    },

    createRectangle: function (width, height, x, y, color) {
        return new Rectangle(width, height, x, y, color);
    }

}
