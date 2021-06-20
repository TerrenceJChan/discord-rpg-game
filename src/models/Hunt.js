import Enemy from './Enemy.js';

export default class Hunt {
  static async create({ character_id, enemy_id }, db) {
    const { rows: [hunt] } = await db.sql`
      INSERT INTO hunt (character_id, enemy_id)
        VALUES (${character_id}, ${enemy_id})
        RETURNING *
    `;
    return new this(hunt);
  }

  static async forCharacter(id, db) {
    const { rows: [hunt] } = await db.sql`SELECT * FROM hunt WHERE character_id = ${id} LIMIT 1`;
    if (!hunt) { return null; }
    return new this(hunt);
  }

  constructor({ character_id, enemy_id }) {
    this.character_id = character_id;
    this.enemy_id = enemy_id;
  }

  async loadEnemy(db) {
    return Enemy.load(this.enemy_id, db);
  }
}
