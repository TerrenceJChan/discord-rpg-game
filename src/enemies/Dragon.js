export default class Dragon {
  constructor() {
    this.name = 'The dragon';
    this.maxhp = 100;
    this.hp = 100;
    this.atk = 10;
    this.def = 5;
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
