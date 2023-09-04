import './assets/css/main.css';

import { sound } from '@pixi/sound';
import * as PIXI from 'pixi.js';
import { GameRoot } from './js/GameRoot';

window.PIXI = PIXI;

let renderer = PIXI.autoDetectRenderer({
  width: 1024,
  height: 576
});

renderer.view.style.position = "absolute";
renderer.view.style.width = window.innerWidth + "px";
renderer.view.style.height = window.innerHeight + "px";
renderer.view.style.display = "block";

document.body.appendChild(renderer.view);
window.renderer = renderer;

let stage = new PIXI.Container();
window.stage = stage;

const resizeHandler = () => {
  window.isPortrait = window.innerHeight > window.innerWidth;
  window.globalScaleFactorX = renderer.width / window.innerWidth;
  window.globalScaleFactorY = renderer.height / window.innerHeight;
  
  renderer.view.style.width = window.innerWidth + "px";
  renderer.view.style.height = window.innerHeight + "px";
};

window.addEventListener('resize', resizeHandler, false);

resizeHandler();

const loader = new PIXI.Loader();

loader.add('background', "./assets/img/bg_game.png");
loader.add('board', "./assets/img/board.png");
loader.add('crystal', "./assets/img/crystal_yellow.png");
loader.add('scoreBar', "./assets/img/score_bar.png");

loader.add('start', "./assets/sounds/start.wav");
loader.add('destroy', "./assets/sounds/destroy.wav");
loader.add('complete', "./assets/sounds/complete.wav");

loader.onLoad.add((loader, resources) => {
    console.log("loading: " + resources.url);
    console.log("progress: " + loader.progress + "%");
});

sound.add('start', './assets/sounds/start.wav');
sound.add('destroy', './assets/sounds/destroy.wav');
sound.add('complete', './assets/sounds/complete.wav');

loader.load(() => {
  const gameRoot = new GameRoot();
  stage.addChild(gameRoot);
});

animate();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}


