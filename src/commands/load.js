import * as dotenv from 'dotenv';
dotenv.config();

import { MessageEmbed } from 'discord.js';
import Player from '../models/Player.js';
import connection from '../database/connection.js';

const { COMMAND_PREFIX } = process.env;

export const load = (ctx, name) => connection(async (db) => {
  const { id, username } = ctx.msg.author;
  const player = await Player.load(id, db);
  if (!player) {
    return `You have not signed up. Please create an account with the \`${COMMAND_PREFIX}signup\` command.`;
  }
  const character = await player.loadCharacter(name, db);
  if (!character) {
    return `You do not have a character named ${name}.`;
  }
  ctx.player = character; // TODO: take this line out, it's just so we can still run global enemy/hunt/attack stuff
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
