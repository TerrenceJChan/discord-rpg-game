import { MessageEmbed } from 'discord.js';
import Character from '../models/Character.js';
import connection from '../database/connection.js';
import currentPlayer from '../middleware/currentPlayer.js';

export const newchar = (ctx, name) => connection(async (db) => {
  const player = await currentPlayer(ctx, db);
  const character = await player.loadActiveCharacter(db);
  if (await character?.loadCurrentHunt(db)) {
    throw new Error('You are currently on a hunt! It would be dangerous to do that right now.');
  }
  const { username } = ctx.msg.author;
  try {
    const character = await Character.create({
      player_id: player.id,
      name,
    }, db);
    await player.setActiveCharacter(character.id, db);
    ctx.msg.channel.send(
      `Your active adventurer is now ${character.name}.`,
      {
        embed: new MessageEmbed()
          .setTitle(character.name)
          .setAuthor(username, ctx.msg.author.displayAvatarURL())
          .addField('ATK', character.atk, true)
          .addField('DEF', character.def, true)
          .addField('HP', `${character.hp}/${character.maxhp}`, true),
      },
    );
  } catch (error) {
    return `Failed to create a new character named ${name}: ${error}`;
  }
});
