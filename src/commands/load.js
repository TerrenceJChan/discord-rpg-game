import { MessageEmbed } from 'discord.js';
import connection from '../database/connection.js';
import currentPlayer from '../middleware/currentPlayer.js';

export const load = (ctx, name) => connection(async (db) => {
  const player = await currentPlayer(ctx, db);
  const currentCharacter = await player.loadActiveCharacter(db);
  if (await currentCharacter?.loadCurrentHunt(db)) {
    throw new Error('You are currently on a hunt! It would be dangerous to do that right now.');
  }

  const character = await player.loadCharacter(name, db);
  const { username } = ctx.msg.author;
  if (!character) {
    return `You do not have a character named ${name}.`;
  }
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
});
