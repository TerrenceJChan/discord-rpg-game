import Player from '../../player/Player.js';

export const load = (ctx) => {
  ctx.player = new Player;
  return `Your active adventurer is ${ctx.player.name}.`;
};