import * as PIXI from "pixi.js"
export class TextZone extends PIXI.Container {
    constructor(content) {
        super();
        this.box = new PIXI.Graphics()
            .beginFill(0x28262b)
            .drawRect(105, 230, 90, 30)
        this.zones = []
        this.content = "PAWN"
        this.text = new PIXI.Text(this.content, {
            fontFamily: 'VT323',
            fontSize: 45,
            fill: 0xff1010,
            stroke: 0x5f3b9b,
            strokeThickness: 5,
            letterSpacing: 1,
            align: 'center',
        });
        this.text.x = 110
        this.text.y = 225
        this.text.height = 40

        this.cursor = PIXI.Sprite.from("pointer")

        this.cursor.x = this.text.x
        this.cursor.y = this.text.y + this.text.height
        this.cursor.betwix = false
   
        this.addChild(this.box, this.text);

    }

    update(deltaTime) {
    }

    editorMode() {

    }

    moveCursor(dir) {
        if (!this.cursor.betwix) {
            this.cursorIdx = (this.cursorIdx + dir + this.content.length) % this.content.length
            this.cursor.x = this.text.x + (this.cursorIdx * this.text.width / this.content.length) + this.text.width*dir / (-this.content.length*2)
            this.cursor.y = this.text.y + this.text.height/3

        }
        else {
            this.cursor.x = this.text.x + this.cursorIdx * this.text.width / this.content.length
            this.cursor.y = this.text.y + this.text.height/2
        }

        this.cursor.betwix = !this.cursor.betwix
    }

    handleEvent(key) {
        if (key === "a" || key === "ArrowLeft") this.moveCursor(-1);
        if (key === "d" || key === "ArrowRight") this.moveCursor(1);

    
    }
}