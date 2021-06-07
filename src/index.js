// Intialize dependencies and bot
import * as dotenv from 'dotenv';
import Discord from 'discord.js';

import {attack} from './commands/attack.js';
import {check} from './commands/check.js';
import {checkInv} from './commands/checkInv.js';
import {hunt} from './commands/hunt.js';

dotenv.config();
const bot = new Discord.Client();

const {
  TOKEN,
  MESSAGE_TIMEOUT = 5000,
  COMMAND_PREFIX: COMMAND = '!',
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

// Interprets the user's commands on Discord
let messageAt = 0;
bot.on('message', (msg) => {
  if (!msg.content.startsWith(COMMAND)) { return; }
  if (Date.now() - messageAt < MESSAGE_TIMEOUT) {
    msg.channel.send('Spam prevented.');
    return;
  }
  messageAt = Date.now();
  if (!enemy) {
    switch (msg.content) {
    case COMMAND + 'inventory': {
      msg.channel.send(checkInv(inventory));
      break;
    }
    case COMMAND + 'hunt': {
      enemy = hunt();
      msg.channel.send(enemy.msgs.encounter);
      break;
    }
    case COMMAND + 'greet': {
      msg.channel.send('Hello!');
      break;
    }
    }
  } else {
    switch (msg.content) {
    case COMMAND + 'attack':
      msg.channel.send(attack(player, enemy, inventory));
      if (enemy.hp <= 0) {
        enemy = null;
      }
      break;
    case COMMAND + 'check':
      msg.channel.send(check(enemy));
      break;
    }
  }
});

// msg.reply("noot noot");
