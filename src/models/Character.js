import DragonsBite from '../weapons/DragonsBite.js';

export default class Character {
  static async create(
    {
      player_id,
      name,
      atk = 10,
      def = 10,
      maxhp = 100,
      hp = maxhp,
      charge = 0,
    },
    db,
  ) {
    const { rows: [character] } = await db.sql`
      INSERT INTO characters (player_id, name, atk, def, hp, maxhp, charge)
        VALUES (${player_id}, ${name}, ${atk}, ${def}, ${hp}, ${maxhp}, ${charge})
        RETURNING *
    `;
    return new this(character);
  }

  static async load(id, db) {
    const { rows: [character] } = await db.sql`SELECT * FROM characters WHERE id = ${id}`;
    if (!character) { return null; }
    return new this(character);
  }

  constructor({ id, player_id, name, atk, def, maxhp, hp, charge }) {
    this.id = id;
    this.player_id = player_id;
    this.name = name;
    this.atk = atk;
    this.def = def;
    this.maxhp = maxhp;
    this.hp = hp;
    this.charge = charge;

    // TODO: implement these officially
    this.skills = new DragonsBite().skills;
  }
}
