import * as PIXI from 'pixi.js'
import Matter from 'matter-js';
import { Manager } from "../manager";
export class PlatBuffer extends PIXI.Container {
    #head
    #tail
    #plats
    #height
    constructor(capacity, height) {
        super();
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;
        this.capacity = capacity
        this.#plats = new Array(capacity)
        this.#head = 0
        this.#tail = (this.#head - 1 + this.capacity) % this.capacity
        this.#height = this.screenHeight
        for (let i = 0; i < this.#plats.length; i++) {
            this.set(i, this.screenHeight + 500 * i, "" + i + i + i + i + i + i)

        }
    };

    update(deltaTime) {
        const t = this.get(0)
        // if (t.y < 0) {
        //     this.set(0, this.screenHeight + 500)
        //     this.incHead()
        // }
        for (let i = 0; i < this.capacity; i++) {
            this.#plats[i].move(this.screenHeight, this.screenWidth)
        }
    };

    getHeadIdx() {
        return this.#head % this.capacity
    }

    getHead() {
        return this.#plats[this.#head % this.capacity]
    }

    getTail() {
        return this.#plats[this.#tail % this.capacity]
    }

    incHead() {
        this.#head = (this.#head + 1) % this.capacity
        // this.#tail = ((this.#head - 1 + this.capacity)) % this.capacity
    }

    get(idx) {
        return this.#plats[(idx - this.#head + this.capacity) % this.capacity]
    }

    set(idx, height, clr) {
        this.#height = (this.get(this.#head - 1)?.y || this.#height) + 200
        // idx = ((idx - this.#head) % this.capacity + this.capacity) % this.capacity
        idx = (idx + this.#head) % this.capacity
        if (!this.#plats[idx]) {
            this.#plats[idx] = new Platform((Math.random() * 0.4 + 0.6) * this.screenWidth, height, 100, 100, clr)
            this.addChild(this.#plats[idx])
        }
        else {
            this.#plats[idx].reuse((Math.random() * 0.4 + 0.6) * this.screenWidth, height)
        }
    }
}

export class Platform extends PIXI.Graphics {         // The physics is implemented into the graphics object
    constructor(x, y, width, height, clr) {
        super();
        //graphics
        this.clr = clr
        this.beginFill(this.clr)
            .drawRect(0, 0, width, height);
        this.pivot.set(width / 2, height / 2)
        this.x = x;
        this.y = y;
        //physics
        this.body = Matter.Bodies.rectangle(
            this.x, this.y,
            this.width, this.height,
            { friction: 0, isStatic: true });
        Matter.World.add(Manager.physics.world, this.body);
        // this.body.gamePlatform = this; // why am i using this 
        this.dx = 1
        this.dy = 10
    }
    move(height, width) {
        Matter.Body.setPosition(this.body, { x: this.body.position.x, y: this.body.position.y - this.dy })
        // console.log(this.y)
        if (this.y < 0) {
            this.reuse((Math.random() * 0.4 + 0.6) * width, height + 500)
        }
        this.x = this.body.position.x;
        this.y = this.body.position.y
    }
    reuse(x, y, width, height) {
        // console.log(this.clr)
        // console.log(x,y)
        Matter.Body.setPosition(this.body, { x: x, y: y })
    }

}
// implement a circular queue
// uses the same 8 pixi graphics
// but changes their shape when it's popped back to the beginning
