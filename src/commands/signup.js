import connection from '../database/connection.js';
import Player from '../database/models/Player.js';

export const signup = (ctx) => connection(async (db) => {
  const { id } = ctx.msg.author;
  try {
    await Player.create({ id }, db);
    return 'Account created successfully!';
  } catch (error) {
    return `Account was not created: ${error.message}`;
  }
});
