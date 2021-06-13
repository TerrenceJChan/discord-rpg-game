import Player from '../../player/Player.js';
import DragonsBite from '../../weapons/DragonsBite.js';

export const load = (ctx) => {
  ctx.player = new Player;
  const weapon = new DragonsBite;
  ctx.player.skills = weapon.skills;
  return `Your active adventurer is ${ctx.player.name}.`;
};