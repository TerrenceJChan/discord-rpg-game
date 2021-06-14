import { getPool } from './pool.js';

export default async function connection(handler) {
  const pgclient = await getPool().connect();

  const client = {
    sql: async (strings, ...replacements) => {
      const query = strings.reduce((sql, segment, i) => `${sql}$${i}${segment}`);
      return pgclient.query(query, replacements);
    },
    transaction: async (callback) => {
      try {
        await client.sql`BEGIN`;
        await callback();
        await client.sql`COMMIT`;
      } catch (error) {
        await client.sql`ROLLBACK`;
      }
    },
  };
  try {
    return await handler(client);
  } finally {
    pgclient.release();
  }
}

/** Example

  await connection(async (db) => {
    let { rows: [player] } = await db.sql`SELECT * FROM players WHERE id = ${msg.author.id}`;
    if (!player) {
      console.log('No player, inserting!');
      await db.sql`INSERT INTO players (id) VALUES (${msg.author.id})`;
      ({ rows: [player] } = await db.sql`SELECT * FROM players WHERE id = ${msg.author.id}`);
    }
    console.log(player);
  });

*/
