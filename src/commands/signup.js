import UniqueViolation from '../database/error/UniqueViolation.js';
import connection from '../database/connection.js';
import Player from '../models/Player.js';

export const signup = (ctx) => connection(async (db) => {
  const { id } = ctx.msg.author;
  try {
    await Player.create({ id }, db);
    return 'Account created successfully!';
  } catch (error) {
    if (error instanceof UniqueViolation) {
      return 'You already have an account.';
    }
    console.error(error);
    return `Account was not created: ${error.message}`;
  }
});
