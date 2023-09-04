
import { sound } from '@pixi/sound';
import * as PIXI from 'pixi.js';
import { ResizeComponent } from '../resizeComponent/ResizeComponent';
import { ScorePlateController } from './ScorePlateController';

const Sprite = PIXI.Sprite;

const styleConfig = {
  fontFamily: "Arial",
  fontSize: 42,
  fill: "0xf0cc19",
  stroke: 'black',
  strokeThickness: 4,

};

export class ScorePlateComponent extends PIXI.Container {
  constructor() {
    super();
    // add controller
    this._controller = new ScorePlateController(this);

    //elements
    this._scorePlate = this._createScorePlate('scoreBar');
    this._pixiText = this._createText();

    this._mount();

    this.resizeComponent();
  }

  resizeComponent() {
    window.addEventListener('resize', this.resizeHandler.bind(this));
    this.resizeHandler();
  }

  resizeHandler() {
    if (!window.isPortrait) {
      this.position.set(580, 150);
    } else {
      this.position.set(210, 80);
    }
  }

  updateScorePlate() {
    const currentValue = parseInt(this._pixiText.text);
    this._pixiText.text = (currentValue + 1).toString();
    if (currentValue === 81) {
      sound.play('complete')
    }
  }

  _createText() {
    const style = new PIXI.TextStyle(styleConfig);
    const text = new PIXI.Text("0", style);
    text.anchor.set(0.5);
    text.position.set(115, 25);
    return text;
  }

  _createScorePlate(name) {
    const textureCache = PIXI.utils.TextureCache;
    const sprite = new Sprite(textureCache[name]);
    sprite.scale.set(0.5);
    return sprite;
  }

  _mount() {
    this.addChild(this._scorePlate, this._pixiText);
    this.position.set(580, 150);
  }
}