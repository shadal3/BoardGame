import { sound } from '@pixi/sound';
import { BoardComponent } from './components/boardComponent/BoardComponent';
import { ResizeComponent } from './components/resizeComponent/ResizeComponent';
import { ScorePlateComponent } from './components/scorePlateComponent/ScorePlateComponent';

export class GameComponents extends ResizeComponent {
  constructor() {
    super();    

    //components
    this._board = new BoardComponent();
    this._scorePlate = new ScorePlateComponent();

    this.resizeGame();

    // mount
    this.mount();

    sound.play('start');
  }

  resizeGame() {
    window.addEventListener('resize', this.resizeHandler.bind(this, this, 1));
    this.resizeHandler(this, 1);
  }

  resizeHandler(container, baseScale) {
    this.position.set(window.renderer.width * 0, window.renderer.height * 0.1);
    super.resizeHandler(container, baseScale);
  }

  mount() {
    this.addChild(this._board, this._scorePlate);
  }
}