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

const ctx = {
  player: {
    name: 'Hero',
    hp: 100,
    atk: 20,
    def: 7,
  },
  enemy: null,
  inventory: [],
};

const TOWN_COMMANDS = {
  greet,

  inventory: checkInv,

  hunt,
};

const FIGHT_COMMANDS = {
  attack: () => attack(ctx),

  check: () => check(ctx),
};

const ALL_COMMANDS = new Set([
  ...Object.keys(TOWN_COMMANDS),
  ...Object.keys(FIGHT_COMMANDS),
]);

// Interprets the user's commands on Discord
let messageAt = 0;
bot.on('message', (msg) => {
  // Bot sends nothing if user sends a non-command
  if (!msg.content.startsWith(COMMAND_PREFIX)) { return; }
  // Spam prevention
  if (Date.now() - messageAt < MESSAGE_TIMEOUT) {
    msg.channel.send('Spam prevented.');
    return;
  }
  messageAt = Date.now();
  // "Removes" the COMMAND_PREFIX from the user's message
  const command = msg.content.slice(COMMAND_PREFIX.length);
  // Rejects invalid command
  if (!ALL_COMMANDS.has(command)) {
    msg.channel.send(`Unknown command: ${command}`);
    return;
  }
  // Handles valid command
  let commandHandler;
  if (ctx.enemy) {
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
  const response = commandHandler(ctx);
  msg.channel.send(response);
});

// msg.reply("noot noot");
