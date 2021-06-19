// Intialize dependencies and bot
import * as dotenv from 'dotenv';
dotenv.config();

import Discord from 'discord.js';
import Diskoard from './diskoard/index.js';

import { signup } from './commands/signup.js';
import { newchar } from './commands/newchar.js';
import { greet } from './commands/greet.js';
import { load } from './commands/load.js';
import { attack } from './commands/attack.js';
import { check } from './commands/check.js';
import { checkInv } from './commands/checkInv.js';
import { hunt } from './commands/hunt.js';

const {
  TOKEN,
  MESSAGE_TIMEOUT = 5000,
  COMMAND_PREFIX = '!',
} = process.env;

const GLOBAL_CTX = {
  player: null,
  enemy: null,
  inventory: [],
};

const TOWN_COMMANDS = {
  newchar,
  signup,
  greet,
  load,
  inventory: checkInv,
  hunt,
};

const FIGHT_COMMANDS = {
  attack,
  check,
};

const ALL_COMMANDS = new Set([
  ...Object.keys(TOWN_COMMANDS),
  ...Object.keys(FIGHT_COMMANDS),
]);

// Interprets the user's commands on Discord
let messageAt = 0;

const app = new Diskoard();

app.use(async (msg) => {
  // Bot sends nothing if user sends a non-command
  if (!msg.content.startsWith(COMMAND_PREFIX)) { return; }
  // Spam prevention
  if (Date.now() - messageAt < MESSAGE_TIMEOUT) {
    msg.channel.send('Spam prevented.');
    return;
  }
  messageAt = Date.now();
  // 'Removes' the COMMAND_PREFIX from the user's message
  const [command, arg] = msg.content.slice(COMMAND_PREFIX.length).split(' ');
  // Rejects invalid command
  if (!ALL_COMMANDS.has(command)) {
    msg.channel.send(`Unknown command: ${command}`);
    return;
  }
  // Handles valid command
  let commandHandler;
  if (GLOBAL_CTX.enemy && GLOBAL_CTX.player) {
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

  const ctx = { ...GLOBAL_CTX, msg };
  const response = await commandHandler(ctx, arg);
  GLOBAL_CTX.player = ctx.player;
  GLOBAL_CTX.enemy = ctx.enemy;
  GLOBAL_CTX.inventory = ctx.inventory;

  if (response) {
    msg.channel.send(response);
  }
});

const bot = new Discord.Client();
bot.login(TOKEN);

app.run(bot, () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

// msg.reply('noot noot');
