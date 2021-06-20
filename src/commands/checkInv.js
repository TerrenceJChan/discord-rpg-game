import currentPlayer from '../middleware/currentPlayer.js';
import currentCharacter from '../middleware/currentCharacter.js';
import inTown from '../middleware/inTown.js';
import connection from '../database/connection.js';

export const checkInv = (ctx) => connection(async (db) => {
  await currentPlayer(ctx, db);
  await currentCharacter(ctx, db);
  await inTown(ctx, db);

  const { inventory } = ctx;
  if (inventory.length === 0) {
    return 'Your inventory is empty!';
  }
  let message = '';
  for (const item of inventory) {
    message += `${item.mat} | ${item.quantity} \n`;
  }
  return message;
});
