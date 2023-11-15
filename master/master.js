import { Application } from "pixi.js";
import Matter from "matter-js";

export class Master {
  constructor() {}
  static currentScene;
  static x;
  static y;

  // With getters but not setters, these variables become read-only
  static get width() {
    return 800; //Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }
  static get height() {
    return 600; //Math.max(document.documentElement.clientHeight, window.innerHidth || 0);
  }

  // Use this function ONCE to start the entire machinery
  static initialize(width, height, background) {
    // store our width and height
    Master._width = width;
    Master._height = height;

    // Create our pixi app
    Master.app = new Application({
      view: document.getElementById("pixi-canvas"),
      // resizeTo: window , // This line here handles the actual resize!
      // resolution: window.devicePixelRatio || 1,
      // autoDensity: true,
      backgroundColor: background,
    });
    Master.app.ticker.add(Master.update);
    window.addEventListener("resize", Master.resize);
    globalThis.__PIXI_APP__ = Master.app;
  }

  static resize() {
    if (Master.currentScene) {
      Master.currentScene.resize(Master.width, Master.height);
    }
  }

  static changeScene(newScene) {
    if (Master.currentScene != undefined) Master.currentScene.transitionOut();
    Master.currentScene = newScene;
    Master.currentScene.transitionIn();
  }

  static createPhysics() {
    Master.physics = Matter.Engine.create();
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, Master.physics);
  }

  static update(deltaTime) {
    // Group.shared.update(); For your tweens
    if (Master.currentScene != undefined) {
      Master.currentScene.update(deltaTime);
    }
  }
}
