import connection from '../database/connection.js';
import currentPlayer from '../middleware/currentPlayer.js';

export const character = (ctx, name) => connection(async (db) => {
  const player = await currentPlayer(ctx, db);
  const character = await player.loadCharacter(name, db);
  if (!character) {
    return `You do not have a character named ${name}.`;
  }
  character.print(ctx);
});
