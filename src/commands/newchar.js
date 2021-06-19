import { MessageEmbed } from 'discord.js';
import { COMMAND_PREFIX } from '../env';
import Player from '../models/Player.js';
import Character from '../models/Character.js';
import connection from '../database/connection.js';

export const newchar = (ctx, name) => connection(async (db) => {
  const { id, username } = ctx.msg.author;
  const player = await Player.load(id, db);
  if (!player) {
    return `You have not signed up. Please create an account with the \`${COMMAND_PREFIX}signup\` command.`;
  }
  try {
    const character = await Character.create({
      player_id: id,
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
