import PubSub from 'pubsub-js';

export class ScorePlateController {
  constructor(component) {
    PubSub.subscribe('destroyCrystal', (msg, data) => {
        component.updateScorePlate();
    })
  }
}