import { MessageEmbed } from 'discord.js';
import DragonsBite from '../weapons/DragonsBite.js';
import Hunt from './Hunt.js';

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

  static async loadAllForPlayer(playerId, db) {
    const { rows: characters } = await db.sql`SELECT * FROM characters WHERE player_id = ${playerId}`;
    return characters.map((character) => new this(character));
  }

  static async forPlayer(id, name, db) {
    const { rows: [character] } = await db.sql`SELECT * FROM characters WHERE player_id = ${id} AND name = ${name}`;
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

  async startHunt(enemy, db) {
    await enemy.save(db);
    return Hunt.create({
      character_id: this.id,
      enemy_id: enemy.id,
    }, db);
  }

  async loadCurrentHunt(db) {
    return Hunt.forCharacter(this.id, db);
  }

  async save(db) {
    // Currently we only have changes to charge and HP... but we may need to extend
    // this query for more attributes day
    await db.sql`
      UPDATE characters SET
        charge = ${this.charge},
        hp = ${this.hp}
        WHERE id = ${this.id}
    `;
  }

  print(ctx, message = '') {
    ctx.msg.channel.send(
      message,
      {
        embed: new MessageEmbed()
          .setTitle(this.name)
          .setAuthor(ctx.msg.author.username, ctx.msg.author.displayAvatarURL())
          .addField('ATK', this.atk, true)
          .addField('DEF', this.def, true)
          .addField('HP', `${this.hp}/${this.maxhp}`, true),
      },
    );
  }
}
