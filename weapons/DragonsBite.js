export default class DragonsBite {
  constructor() {
    this.name = 'Dragon\'s Bite';
    this.description = 'A long, curved blade fortified with the viciousness of a dragon\'s strike',
    this.ingredients = new Map([
      [{ mat: 'Dragon Talon' }, 2],
      [{ mat: 'Dragon Fang' }, 1],
    ]);
    this.base = {
      hp: 50,
      atk: 20,
      def: 5,
    };
    this.skills =
      [
        {
          skill: 'Slash',
          multiplier: 1,
          charge: 1,
          cooldown: 100,
          description: 'Slash widely across your enemy. Gains 1 charge.',
          message: 'swings their sword',
        },
        {
          skill: 'Heavy Slash',
          multiplier: 2,
          charge: -2,
          cooldown: 130,
          description: 'Channel your strength to deliver a powerful slash. Consumes 2 charges.',
          message: 'delivers a powerful slash',
        },
        {
          skill: 'Fury Cuts',
          multiplier: 4,
          charge: -5,
          cooldown: 150,
          description: 'Deliver a series of powerful slashes. Consumes 4 charges.',
          message: 'roars as they deliver a devestating series of quick slashes',
        },
      ];
  }
}
