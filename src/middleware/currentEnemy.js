import { COMMAND_PREFIX } from '../env.js';

export default async (ctx, db) => {
  const hunt = await ctx.character.loadCurrentHunt(db);
  if (!hunt) {
    throw new Error(`You are not currently on a hunt! Start one with the \`${COMMAND_PREFIX}hunt\` command.`);
  }
  const enemy = await hunt.loadEnemy(db);
  ctx.enemy = enemy;
  return enemy;
};
