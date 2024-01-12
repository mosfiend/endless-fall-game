import * as PIXI from 'pixi.js'
import { Manager } from "../manager.js"

export class TemplateScene extends PIXI.Container {
      constructor(loading) {
            super();
            this.screenWidth = Manager.width;
            this.screenHeight = Manager.height;
             
             this.text = new PIXI.Text('This is a PixiJS text', {
                  fontFamily: 'Arial',
                  fontSize: 24,
                  fill: 0xff1010,
                  align: 'center',
              });
              this.addChild(this.text)

      }
      transitionIn() {
            Manager.app.stage.addChild(this)
      }
      transitionOut() {
            Manager.app.stage.removeChild(Manager.currentScene);
            // Manager.app.stage.off("mousemove") remember to turn off events
      }
      resize(newWidth, newHeight) {
            this.screenWidth = newWidth;
            this.screenHeight = newHeight
      }
      update(deltaTime) {

      }
}           