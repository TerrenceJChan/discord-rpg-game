import connection from '../database/connection.js';
import currentPlayer from '../middleware/currentPlayer.js';

export const load = (ctx, name) => connection(async (db) => {
  const player = await currentPlayer(ctx, db);
  const currentCharacter = await player.loadActiveCharacter(db);
  if (await currentCharacter?.loadCurrentHunt(db)) {
    throw new Error('You are currently on a hunt! It would be dangerous to do that right now.');
  }

  const character = await player.loadCharacter(name, db);
  if (!character) {
    return `You do not have a character named ${name}.`;
  }
  await player.setActiveCharacter(character.id, db);
  character.print(ctx, `Your active adventurer is now ${character.name}.`);
});
