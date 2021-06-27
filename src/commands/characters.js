import Character from '../models/Character.js';
import connection from '../database/connection.js';
import currentPlayer from '../middleware/currentPlayer.js';

export const characters = (ctx) => connection(async (db) => {
  const player = await currentPlayer(ctx, db);
  const characters = await Character.loadAllForPlayer(player.id, db);
  const names = characters
    .map(({ name }, i) => `${i + 1}. ${name}`)
    .join('\n');
  ctx.msg.channel.send(`Available characters:\n${names}`);
});
