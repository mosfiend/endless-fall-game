import { Graphics, Container, Sprite, Text, Texture } from "pixi.js";
import { Master } from "../master.js";
import { Stage } from "./Stage.js";
import { Button } from "@pixi/ui";
export class StartMenu extends Container {
  constructor() {
    super();
    this.screenWidth = Master.width;
    this.screenHeight = Master.height;
    this.menuBox = new Container();
    this.menuBox.position.set(this.screenWidth / 2, this.screenHeight / 2);

    const props1 = {
      x: this.screenWidth / 4,
      y: this.screenHeight / 2,
      text: "Game1",
      textColor: 0xffff00,
      isDisabled: false,
      action: () => {
    Manager.changeScene(new Stage())
        console.log("hi :)");
      },
    };
    const props2 = {
      x: this.screenWidth*3 / 4,
      y: this.screenHeight / 2,
      text: "Game2",
      textColor: 0xffff00,
      isDisabled: false,
      action: (event) => {
                if (event === "press") Master.changeScene(new Stage());
      },
    };
    this.game1 = new SpriteButton(props1);
    this.game2 = new SpriteButton(props2);
    this.addChild(this.game1.view, this.game2.view);

    const infoText = new Text("Welcome to the Game", {
      fontSize: 24,
      fill: 0xffffff,
      align: "center",
    });
    infoText.anchor.set(0.5, 0.5);
    infoText.position.set(0, -80);
    this.menuBox.addChild(infoText);
  }

  transitionIn() {
    Master.app.stage.addChild(Master.currentScene);
  }

  transitionOut() {
    Master.app.stage.removeChild(Master.currentScene);
  }

  resize(newWidth, newHeight) {
    this.screenWidth = newWidth;
    this.screenHeight = newHeight;
    this.menuBox.position.set(this.screenWidth / 2, this.screenHeight / 2);
  }

  update(deltaTime) {
    // Update logic goes here
  }
}
export class SpriteButton extends Button {
  constructor(props) {
    super();
    this.buttonView = new Sprite();
    this.view = this.buttonView;
    this.buttonView.x = props.x;
    this.buttonView.y = props.y;

    this.buttonView.texture = Texture.from("button");

    this.buttonView.anchor.set(0.5);

    this.textView = new Text(props.text, {
      // ...defaultTextStyle,
      fontSize: 40,
      fill: props.textColor,
    });
    this.textView.y = -10;
    this.textView.anchor.set(0.5);

    this.buttonView.addChild(this.textView);

    this.enabled = !props.disabled;

    this.resize();

    this.action = props.action;
  }

  down() {
    this.buttonView.texture = Texture.from("button_pressed");
    // this.action("down");
  }

  up() {
    // this.buttonView.texture = utils.isMobile.any
      // ? Texture.from("button")
      // : 
        Texture.from("button_hover");

    this.action("up");
  }

  upOut() {
    this.buttonView.texture = Texture.from("button");
    this.action("upOut");
  }

  out() {
    if (!this.isDown) {
      this.buttonView.texture = Texture.from("button");
    }
    this.action("out");
  }

  press() {
    this.action("onPress");
  }

  hover() {
    if (!this.isDown) {
      this.buttonView.texture = Texture.from("button_hover");
    }
    this.action("hover");
  }

  resize() {
    // centerView(this.view);
    console.log("biggs");
  }
}
