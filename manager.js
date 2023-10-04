import * as PIXI from "pixi.js";

export class Manager {
    constructor() {
    }
    static currentScene;
    static x;
    static y;

    // With getters but not setters, these variables become read-only
    static get width() {
        return 800//Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    static get height() {
        return 600//Math.max(document.documentElement.clientHeight, window.innerHidth || 0);
    }

    // Use this function ONCE to start the entire machinery
    static initialize(width, height, background) {

        // store our width and height
        Manager._width = width;
        Manager._height = height;

        // Create our pixi app
        Manager.app = new PIXI.Application({
            view: document.getElementById("pixi-canvas"),
            // resizeTo: window , // This line here handles the actual resize!
            // resolution: window.devicePixelRatio || 1,
            // autoDensity: true,
            backgroundColor: background
        });
        Manager.app.ticker.add(Manager.update)
        window.addEventListener("resize", Manager.resize);
        globalThis.__PIXI_APP__ = Manager.app;

    }

    static resize() {
        if (Manager.currentScene) {
            Manager.currentScene.resize(Manager.width, Manager.height);
        }
    }

    static changeScene(newScene) {
        
        if (Manager.currentScene != undefined) Manager.currentScene.transitionOut();
        Manager.currentScene = newScene;
        Manager.currentScene.transitionIn()
    }


    static update(deltaTime) {
        // Group.shared.update(); For your tweens
        if (Manager.currentScene != undefined) {
            Manager.currentScene.update(deltaTime)
        }

    }
}
