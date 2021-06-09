import Dragon from '../enemies/Dragon.js';

export const hunt = (ctx) => {
  ctx.enemy = new Dragon;
  return ctx.enemy.msgs.encounter;
};