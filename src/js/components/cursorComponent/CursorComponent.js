
import { gsap } from 'gsap';
import * as PIXI from 'pixi.js';

export class CursorComponent extends PIXI.Container {
  constructor() {
    super();

    this.col = 0;
    this.row = 0;

    this._cursor = this._createCursorSprite();

    this._runFadeTween();
    
    this.init();
    this._mount();
  }

  init() {
    document.addEventListener('keydown', this._move.bind(this));
  }

  _move(event) {
    switch (event.key) {
        case "ArrowLeft":
            this.col = this.col - 1 < 0 ? 8 : this.col - 1;
            break;
        case "ArrowRight":
            this.col = (this.col + 1) % 9;
            break;
        case "ArrowUp":
            this.row = this.row - 1 < 0 ? 7 : this.row - 1;;
            break;
        case "ArrowDown":
            this.row = (this.row + 1) % 8;
            break;
        case "Enter":
            PubSub.publish('destroyCrystal', { row: this.row, col: this.col })
    }
    this._cursor.position.set(this.col * 50, this.row * 50)
  }

  _runFadeTween() {
    gsap.fromTo(this._cursor, { alpha: 1}, { alpha: 0.5, duration: 1, yoyo: true, repeat: -1 })
  }

  _createCursorSprite() {
    var graphics = new PIXI.Graphics();
    graphics.position.set(1, 0)
    graphics.lineStyle(3, 0xff0000);
    graphics.drawRect(1, 0, 49, 49);
    return graphics;
  }

  _mount() {
    this.addChild(this._cursor);
  }
}