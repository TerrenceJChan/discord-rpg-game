import Diskoard from './diskoard/index.js';

import { TOKEN, MESSAGE_TIMEOUT, COMMAND_PREFIX } from './env.js';

import { signup } from './commands/signup.js';
import { newchar } from './commands/newchar.js';
import { greet } from './commands/greet.js';
import { load } from './commands/load.js';
import { attack } from './commands/attack.js';
import { check } from './commands/check.js';
import { checkInv } from './commands/checkInv.js';
import { hunt } from './commands/hunt.js';

const GLOBAL_CTX = {
  inventory: [],
};

const COMMANDS = {
  newchar,
  signup,
  greet,
  load,
  inventory: checkInv,
  hunt,
  attack,
  check,
};

const ALL_COMMANDS = new Set(Object.keys(COMMANDS));

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
  const ctx = { ...GLOBAL_CTX, msg };
  try {
    const response = await COMMANDS[command](ctx, arg);
    GLOBAL_CTX.inventory = ctx.inventory;

    if (response) {
      msg.channel.send(response);
    }
  } catch (error) {
    msg.channel.send(error.message);
    console.error(error);
  }
});

app.login(TOKEN, (bot) => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

// msg.reply('noot noot');
