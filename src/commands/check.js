import currentPlayer from '../middleware/currentPlayer.js';
import currentCharacter from '../middleware/currentCharacter.js';
import currentEnemy from '../middleware/currentEnemy.js';
import connection from '../database/connection.js';

// Command to check the enemy's remaining health
export const check = (ctx) => connection(async (db) => {
  await currentPlayer(ctx, db);
  await currentCharacter(ctx, db);
  const enemy = await currentEnemy(ctx, db);
  return `${enemy.name} has ${enemy.hp} health remaining.`;
});
