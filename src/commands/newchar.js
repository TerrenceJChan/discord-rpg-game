import UniqueViolation from '../database/error/UniqueViolation.js';
import Character from '../models/Character.js';
import connection from '../database/connection.js';
import currentPlayer from '../middleware/currentPlayer.js';

export const newchar = (ctx, name) => connection(async (db) => {
  const player = await currentPlayer(ctx, db);
  const character = await player.loadActiveCharacter(db);
  if (await character?.loadCurrentHunt(db)) {
    throw new Error('You are currently on a hunt! It would be dangerous to do that right now.');
  }
  try {
    const character = await Character.create({
      player_id: player.id,
      name,
    }, db);
    await player.setActiveCharacter(character.id, db);
    character.print(ctx, `Your active adventurer is now ${character.name}.`);
  } catch (error) {
    if (error instanceof UniqueViolation) {
      return `You already have a character named ${name}.`;
    }
    console.log(error);
    return `Failed to create a new character named ${name}: ${error}`;
  }
});
