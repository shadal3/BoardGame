
import * as PIXI from 'pixi.js';
import { CrystalComponent } from '../crystalComponent/CrystalComponent';
import { CursorComponent } from '../cursorComponent/cursorComponent';
import { ResizeComponent } from '../resizeComponent/ResizeComponent';
import { BoardController } from './BoardController';

const Sprite = PIXI.Sprite;

export class BoardComponent extends PIXI.Container {
  constructor() {
    super();

    //attach controller
    this._controller = new BoardController(this);

    // elements
    this._board = this._createBoardSprite('board');

    //components
    this._crystals = this._createCrystals();
    this._cursor = new CursorComponent();

    this._mount();
  }

  destroyCrystal(row, col) {
    this._crystals[col][row].destroyCrystal();

  }

  _createBoardSprite(name) {
    const textureCache = PIXI.utils.TextureCache;
    const sprite = new Sprite(textureCache[name]);
    sprite.scale.set(0.4);
    return sprite;
  }

  _createCrystals() {
    const outerArray = []

    for (let col = 0; col < 9; col++) {
      const innerArray = [];

      for (let row = 0; row < 8; row++) {
        innerArray.push(new CrystalComponent(col, row))
      }
      outerArray.push(innerArray);
    }

    return outerArray;
  }

  _mount() {
    this.position.set(80, 150);

    this.addChild(this._board, this._cursor);

    this._crystals.flat().forEach(_ => this.addChild(_));

  }
}