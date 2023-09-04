
import { sound } from '@pixi/sound';
import { gsap } from 'gsap';
import * as PIXI from 'pixi.js';

const Sprite = PIXI.Sprite;

export class CrystalComponent extends PIXI.Container {
    constructor(col, row) {
        super();

        this._col = col;
        this._row = row;
        this._isDestroyed = false;
        this._crystal = this._createCrystalSprite('crystal');


        this._mount();
    }

    destroyCrystal() {
        if (!this._isDestroyed) {
            const tl = gsap.timeline();
            tl.to(this._crystal.scale, { x: 0.65, y: 0.65, duration: 0.2 })
                .to(this._crystal.scale, { x: 0, y: 0, duration: 0.5 })
                .then(() => tl.kill());
            this._isDestroyed = true;
            sound.play('destroy');
        }
    }

    _createCrystalSprite(name) {
        const textureCache = PIXI.utils.TextureCache;
        const sprite = new Sprite(textureCache[name]);
        sprite.scale.set(0.4);
        sprite.anchor.set(0.5);
        sprite.position.set(this._col * 50 + 25, this._row * 50 + 23)
        return sprite;
    }

    _mount() {
        this.addChild(this._crystal);
    }
}