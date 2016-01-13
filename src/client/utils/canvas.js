/**
 * Canvas Manager
 * TODO: Description to come later.
 */

class Shape {

    constructor (ctx, width, height, x, y, color) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw () {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

}

class Rectangle extends Shape {
    // TODO
}

class Circle extends Shape {
    // TODO
}

export default {

    init: function (canvas, canvasWidth, canvasHeight) {
        this.ctx = canvas.getContext('2d');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        return this;
    },

    createRectangle: function (width, height, x, y, color) {
        return new Rectangle(this.ctx, width, height, x, y, color);
    }

}
