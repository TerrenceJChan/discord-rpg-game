import Dragon from '../enemies/Dragon.js';

export const hunt = (ctx) => {
  if (ctx.player) {
    ctx.enemy = new Dragon;
    return ctx.enemy.msgs.encounter;
  } else {
    return 'You have no active adventurer!';
  }
};