import Character from './Character.js';

export default class Player {
  static async load(id, db) {
    const { rows: [player] } = await db.sql`SELECT * FROM players WHERE id = ${id}`;
    if (!player) { return null; }
    return new this(player);
  }

  static async create({ id }, db) {
    const { rows: [player] } = await db.sql`INSERT INTO players (id) VALUES (${id}) RETURNING *`;
    return new this(player);
  }

  constructor({ id, active_character }) {
    this.id = id;
    this.active_character = active_character;
  }

  async setActiveCharacter(id, db) {
    await db.sql`UPDATE players SET active_character = ${id} WHERE id = ${this.id}`;
    this.active_character = id;
  }

  async loadCharacter(name, db) {
    const { rows: [character] } = await db.sql`SELECT * FROM characters WHERE player_id = ${this.id} AND name = ${name}`;
    if (!character) { return null; }
    return new Character(character);
  }

  async loadActiveCharacter(db) {
    if (!this.active_character) { return null; }
    return Character.load(this.active_character, db);
  }
}
