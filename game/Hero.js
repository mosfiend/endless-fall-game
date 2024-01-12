import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { Master } from "../master.js";
import * as Filters from "pixi-filters";

export class Hero extends PIXI.Container {
  constructor(x, y, keySet) {
    super();
    this.screenWidth = Master.width;
    this.screenHeight = Master.height;
    this.keySet = keySet;
    // graphics
    this.sprite = new PIXI.Graphics()
      .beginFill(0x440044)
      .drawRect(0, 0, 35, 35);
    this.sprite.x = x;
    this.sprite.y = y;

    this.addChild(this.sprite);
    // physics
    this.body = Matter.Bodies.rectangle(
      this.sprite.x + this.sprite.width / 2,
      this.sprite.y + this.sprite.height / 2,
      this.sprite.width,
      this.sprite.height,
      { friction: 0 },
    );
    Matter.World.add(Master.physics.world, this.body);
    this.body.gameHero = true; // why am i using this
    this.dy = 15;
    this.dx = 0;
    this.maxJumps = 2;
    this.jumpIndex = 0;
    this.platform = null;
    this.maxSpeed = 5;
  }

  update(deltaTime) {
    const v = Matter.Body.getVelocity(this.body);
    this.dx = v.x;
    this.dy = v.y;
    this.sprite.x = this.body.position.x - this.sprite.width / 2;
    this.sprite.y = this.body.position.y - this.sprite.height / 2;

    if (this.keySet.has("a") || this.keySet.has("ArrowLeft")) this.move(-1);
    if (this.keySet.has("d") || this.keySet.has("ArrowRight")) this.move(1);
  }

  startJump() {
    if (this.platform || this.jumpIndex < this.maxJumps) {
      ++this.jumpIndex;
      this.platform = null;
      Matter.Body.setVelocity(this.body, { x: this.dx, y: -10 });
    }

    const v = Matter.Body.getVelocity(this.body);
    this.dy = v.y;
  }

  land(e) {
    const colliders = [e.pairs[0].bodyA, e.pairs[0].bodyB];
    const hero = colliders.find((body) => body.gameHero);
    const platform = colliders.find((body) => body.ground);

    if (hero && platform && platform.position.y > hero.position.y) {
      this.stayOnPlatform(platform.gamePlatform);
    }
  }

  move(direction) {
    let vector = Matter.Body.getVelocity(this.body);
    vector.x =
      direction > 0
        ? Math.min(vector.x + 1, this.maxSpeed)
        : Math.max(vector.x - 1, -this.maxSpeed);
    Matter.Body.setVelocity(this.body, vector);
    const v = Matter.Body.getVelocity(this.body);
    this.dx = v.x;
  }

  stayOnPlatform(platform) {
    this.platform = platform;
    this.jumpIndex = 0;
  }

  handleEvent(key, keySet) {
    this.keySet = keySet;
    if (key === "w" || key === "ArrowUp") this.startJump(1);
  }
}
