import Dragon from '../enemies/Dragon.js';
import connection from '../database/connection.js';
import currentPlayer from '../middleware/currentPlayer.js';
import currentCharacter from '../middleware/currentCharacter.js';
import { optionsMessage } from '../utils/optionsMessage.js';

export const hunt = (ctx) => connection(async (db) => {
  const player = await currentPlayer(ctx, db);
  const character = await currentCharacter(ctx, db);
  if (await character.loadCurrentHunt(db)) {
    return 'You are already on a hunt! It would be dangerous to look for more enemies right now.';
  }
  const enemy = new Dragon();
  await character.startHunt(enemy, db);
  return `${enemy.msgs.encounter}\n${optionsMessage(player, character)}`;
});
