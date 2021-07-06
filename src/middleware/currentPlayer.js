import { COMMAND_PREFIX } from '../env.js';
import Player from '../models/Player.js';

export default async (ctx, db) => {
  const { id } = ctx.msg.author;
  const player = await Player.load(id, db);
  if (!player) {
    throw new Error(`You have not signed up. Please create an account with the \`${COMMAND_PREFIX}signup\` command.`);
  }
  ctx.player = player;
  return player;
};
