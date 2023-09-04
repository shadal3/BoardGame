

import PubSub from 'pubsub-js';

export class BoardController {
  constructor(component) {
    PubSub.subscribe('destroyCrystal', (msg, {row, col}) => {
        component.destroyCrystal(row, col);
    })
  }
}