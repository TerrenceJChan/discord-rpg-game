import { COMMAND_PREFIX } from '../env.js';

export default async (ctx, db) => {
  const character = await ctx.player.loadActiveCharacter(db);
  if (!character) {
    throw new Error(`You have no active adventurer! Select one with the \`${COMMAND_PREFIX}load\` command, or create one with \`${COMMAND_PREFIX}newchar\`.`);
  }
  ctx.character = character;
  return character;
};
