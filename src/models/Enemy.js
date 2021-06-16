const ENEMY_TYPES = new Map();

export default class Enemy {
  static declare(types) {
    for (const [type, Class] of Object.entries(types)) {
      ENEMY_TYPES.set(type, Class);
    }
  }

  static async load(id, db) {
    const { rows: [enemy] } = await db.sql`SELECT * FROM enemies WHERE id = ${id}`;
    if (!enemy) { return null; }

    const EnemyClass = ENEMY_TYPES.get(enemy.type);
    return new EnemyClass(enemy);
  }

  constructor({
    id,
    type,
    name,
    maxhp,
    hp = maxhp,
    atk,
    def,
  }) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.maxhp = maxhp;
    this.hp = hp;
    this.atk = atk;
    this.def = def;
  }

  async save(db) {
    if (this.id) {
      await db.sql`
        UPDATE enemies SET
          maxhp = ${this.maxhp},
          hp = ${this.hp},
          atk = ${this.atk},
          def = ${this.def}
          WHERE id = ${this.id}
      `;
    } else {
      const { rows: [{ id }] } = await db.sql`
        INSERT INTO enemies (type, maxhp, hp, atk, def)
          VALUES (${this.type}, ${this.maxhp}, ${this.hp}, ${this.atk}, ${this.def})
          RETURNING id
      `;
      this.id = id;
    }
  }

  async delete(db) {
    if (this.id) {
      await db.sql`DELETE FROM enemies WHERE id = ${this.id}`;
    }
  }
}
