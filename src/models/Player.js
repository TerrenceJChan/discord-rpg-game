export default class Player {
  static async load(id, db) {
    const { rows: [player] } = await db.sql`SELECT * FROM players WHERE id = ${id}`;
    return player;
  }

  static async create({ id }, db) {
    const { rows: [player] } = await db.sql`INSERT INTO players (id) VALUES (${id}) RETURNING *`;
    return player;
  }
}
