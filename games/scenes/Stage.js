import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { Master } from "../master.js";
import { Background } from "../game/Background.js";
import { Hero } from "../game/Hero.js";
import { PlatBuffer } from "../game/Platforms.js";
import { TrainWreck } from "../game/Collision.js";
import { Crowd } from "../game/Crowd.js";
import { TextZone } from "../game/Text.js";
import * as Filters from "pixi-filters";
import { sound } from "@pixi/sound";
export class Stage extends PIXI.Container {
  constructor() {
    super();
    this.screenWidth = Master.width;
    this.screenHeight = Master.height;
    this.filter = new Filters.AsciiFilter();
    this.keySet = new Set();
    this.writerMode = false;
    this.theme = sound._sounds.around;
    this.theme.volume = 0.05;
    this.theme.speed = 1.24;
    this.theme.play();
    // this.song = sound.add("spice", "/assets/images/ITS.mp3")
    /// ELEMENTS
    this.bg = new Background(this.screenHeight);
    this.groundHeight = this.bg.groundHeight;
    this.crowd = new Crowd(10, this.groundHeight);
    this.hero = new Hero(this.screenWidth / 2, 150, this.keySet);
    this.platforms = new TrainWreck(this.groundHeight);
    this.text = new TextZone();
    this.addChild(this.bg, this.hero, this.platforms, this.crowd, this.text);
    this.interactive = true;
    this.on("pointerdown", () => {
      this.hero.startJump();
    });

    this.watch(Master.app.view);
    // Event handling

    Matter.Events.on(Master.physics, "collisionStart", (e) => {
      this.hero.land(e);
    });
  }
  transitionIn() {
    Master.app.stage.addChild(Master.currentScene);
  }
  transitionOut() {
    Master.app.stage.removeChild(Master.currentScene);
    // Manager.app.stage.off("mousemove") remember to turn off events
  }
  resize(newWidth, newHeight) {
    this.screenWidth = newWidth;
    this.screenHeight = newHeight;
  }
  update(deltaTime) {
    if (this.text.content.toLowerCase() === "") {
      this.crowd.chaos();
      this.addChild(new PIXI.Text("Congratulations!", { fontSize: 40 }));
    }

    this.handleEvent();

    if (!this.writerMode) {
      this.bg.update(deltaTime);
      this.hero.update(deltaTime);
      this.platforms.update(deltaTime);
      this.crowd.update(deltaTime);
    }
  }

  changeMode(mode) {
    if (!this.writerMode) {
      this.text.cursorIdx = 0;
      this.bg.filters = [this.filter];
      this.platforms.filters = [this.filter];
      this.crowd.filters = [this.filter];
      this.text.addChild(this.text.cursor);
    } else {
      this.bg.filters.pop();
      this.platforms.filters.pop();
      this.crowd.filters.pop();
      this.text.removeChild(this.text.cursor);
    }
    this.writerMode = !this.writerMode;
    this.hero.body.isStatic = !this.hero.body.isStatic;
  }
  watch(el) {
    el.addEventListener("keydown", (e) => {
      this.keySet.add(e.key);
      this.handleEvent(e.key);
    });
    el.addEventListener("keyup", (e) => {
      this.keySet.delete(e.key);
    });
  }
  handleEvent(key) {
    if (key === "k") {
      this.changeMode();
    }
    // two types of input here, keySet for character movement and the key parameter for more delicate movements (changing stats)
    if (!this.writerMode) {
      this.hero.handleEvent(key, this.keySet);
    } else {
      this.text.handleEvent(key);
    }
  }
}
