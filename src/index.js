// Intialize dependencies and bot
import * as dotenv from 'dotenv';
import Discord from 'discord.js';

import { greet } from './commands/greet.js';
import { attack } from './commands/attack.js';
import { check } from './commands/check.js';
import { checkInv } from './commands/checkInv.js';
import { hunt } from './commands/hunt.js';

dotenv.config();
const bot = new Discord.Client();

const {
  TOKEN,
  MESSAGE_TIMEOUT = 5000,
  COMMAND_PREFIX = '!',
} = process.env;

bot.login(TOKEN);

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

// Testing objects for enemy and player
let enemy;

let player = {
  name: 'Hero',
  hp: 100,
  atk: 20,
  def: 7,
};

let inventory = [];

const TOWN_COMMANDS = {
  inventory: () => checkInv(inventory),

  greet,

  hunt: () => {
    enemy = hunt();
    return enemy.msgs.encounter;
  },
};

const FIGHT_COMMANDS = {
  attack: () => {
    const response = attack(player, enemy, inventory);
    if (enemy.hp <= 0) {
      enemy = null;
    }
    return response;
  },

  check: () => check(enemy),
};

const ALL_COMMANDS = new Set([
  ...Object.keys(TOWN_COMMANDS),
  ...Object.keys(FIGHT_COMMANDS),
]);

// Interprets the user's commands on Discord
let messageAt = 0;
bot.on('message', (msg) => {
  if (!msg.content.startsWith(COMMAND_PREFIX)) { return; }
  if (Date.now() - messageAt < MESSAGE_TIMEOUT) {
    msg.channel.send('Spam prevented.');
    return;
  }
  messageAt = Date.now();
  const command = msg.content.slice(COMMAND_PREFIX.length);
  if (!ALL_COMMANDS.has(command)) {
    msg.channel.send(`Unknown command: ${command}`);
    return;
  }

  let commandHandler;
  if (enemy) {
    commandHandler = FIGHT_COMMANDS[command];
    if (!commandHandler) {
      msg.channel.send('This command is not available during battle!');
      return;
    }
  } else {
    commandHandler = TOWN_COMMANDS[command];
    if (!commandHandler) {
      msg.channel.send('This command is only available during battle!');
      return;
    }
  }

  const response = commandHandler(player, enemy, inventory);
  msg.channel.send(response);
});

// msg.reply("noot noot");
