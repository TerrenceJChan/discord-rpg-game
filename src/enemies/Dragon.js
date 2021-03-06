import Enemy from '../models/Enemy.js';

export default class Dragon extends Enemy {
  constructor({
    id,
    type = 'Dragon',
    name = 'Dragon',
    maxhp = 100,
    hp = 100,
    atk = 10,
    def = 5,
  } = {}) {
    super({ id, type, name, maxhp, hp, atk, def });

    // TODO: convert these into methods somehow?
    this.attacks = new Map([
      [{ message: 'The dragon breathes devastating fire', multiplier: 2 }, 1],
      [{ message: 'The dragon takes a swipe with its razor sharp claws', multiplier: 1 }, 5],
      [{ message: 'The dragon bites with its terrifying jaws', multiplier: 1.5 }, 2],
    ]);
    this.drops = new Map([
      [{ mat: 'Dragon Hide' }, 3],
      [{ mat: 'Dragon Talon' }, 2],
      [{ mat: 'Dragon Fang' }, 1],
    ]);
    this.msgs = {
      encounter: 'Your party tracks down the nest of a large dragon. It shrieks as it rears its head towards you. It\'s going to attack!',
      defeat: 'With a final growl, the defeated dragon collapses onto the ground.',
      // Messages that are printed when enemy's health falls below certain percentages
      sub50: ['Blood runs down the dragon\'s scaly hide. The dragon gives a terrifying roar.', false],
    };
  }
}

Enemy.declare({ Dragon });
