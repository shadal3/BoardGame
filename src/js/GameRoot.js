import { sound } from '@pixi/sound';
import * as PIXI from 'pixi.js';
import { BoardComponent } from './components/boardComponent/BoardComponent';
import { ResizeComponent } from './components/resizeComponent/ResizeComponent';
import { ScorePlateComponent } from './components/scorePlateComponent/ScorePlateComponent';
import { GameComponents } from './GameComponents';

const Sprite = PIXI.Sprite;

export class GameRoot extends PIXI.Container {
  constructor() {
    super();

    // elements
    this._background = this.createSprite('background');
    this._gameComponents = new GameComponents();

    // mount
    this.mount();
  }

  createSprite(name) {
    const textureCache = PIXI.utils.TextureCache;
    const sprite = new Sprite(textureCache[name]);
    return sprite;
  }

  mount() {
    this.addChild(this._background, this._gameComponents);
  }
}