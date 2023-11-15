import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { Master } from "../master.js";
import * as Filters from "pixi-filters";
export class Background extends PIXI.Container {
  constructor(screenHeight) {
    super();
    this.road = PIXI.Sprite.from("road");
    this.road.anchor.set(0, 1);
    this.road.x = 0;
    this.road.y = screenHeight;
    this.groundHeight = this.road.height;
    this.bgBuildings = PIXI.Sprite.from("bgBuildings");
    this.bgBuildings.anchor.set(0, 1);
    this.bgBuildings.y = screenHeight - this.groundHeight;
    this.bgBuildings.scale.set(2.5, 2);
    this.bg = PIXI.Sprite.from("background");
    this.bg.anchor.set(0, 1);
    this.bg.y = screenHeight - this.groundHeight;
    this.bg.scale.set(2.5, 2);
    this.building = PIXI.Sprite.from("building");
    this.building.anchor.set(0, 1);
    this.building.x = 50;
    this.building.y = screenHeight - this.groundHeight;
    this.building.scale.set(1.6);

    this.roofTile = new RoofTile(
      this.building.x,
      this.building.y - this.building.height,
      this.building.width,
    );
    this.addChild(
      this.bg,
      this.bgBuildings,
      this.road,
      this.building,
      this.roofTile.sprite,
    );
    this.bg.filters = [
      new Filters.AsciiFilter(14),
      new PIXI.NoiseFilter(Math.trunc(Math.random() * 100) / 50),
    ];
    this.framer = 0;
  }

  update(deltaTime) {
    this.framer = (this.framer + 1) % 11;

    if (!this.framer) {
      this.bg.filters.pop();
      this.bg.filters.push(
        new PIXI.ColorMatrixFilter(Math.trunc(Math.random() * 100) / 50),
      );
    }
  }
}

class RoofTile {
  constructor(x, y, width) {
    this.sprite = PIXI.Sprite.from("rooftile");
    this.sprite.scale.set(1.6);
    this.sprite.anchor.set(0, 1);
    this.sprite.x = x + (width - this.sprite.width) / 2;
    this.sprite.y = y;
    this.body = Matter.Bodies.rectangle(
      this.sprite.x + this.sprite.width / 2,
      this.sprite.y - this.sprite.height / 2,
      this.sprite.width,
      this.sprite.height,
      { friction: 0, isStatic: true },
    );
    Matter.World.add(Master.physics.world, this.body);
    this.body.ground = true;
  }
}
