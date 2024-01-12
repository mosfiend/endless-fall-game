import * as PIXI from "pixi.js";
import { Master } from "../../master.js";
import { manifest } from "../assets/assets";
import { StartMenu } from "./StartMenu";
export class LoaderScene extends PIXI.Container {
  constructor() {
    super();
    this.initializeLoader().then(() => {
      this.gameLoaded();
    });
  }
  update(deltaTime) {}
  async initializeLoader() {
    Master.createPhysics(); // No idea where I should put this, it's not async but I need to be loaded a bit before my assets
    await PIXI.Assets.init({ manifest });
    const bundleIds = manifest.bundles.map((bundle) => bundle.name);
    await PIXI.Assets.loadBundle(bundleIds);
  }
  downloadProgress(progressRatio) {}
  gameLoaded() {
    Master.changeScene(new StartMenu());
  }
  transitionIn() {
    Master.app.stage.addChild(Master.currentScene);
  }

  transitionOut() {
    Master.app.stage.removeChild(Master.currentScene);
  }

  resize() {}
}
