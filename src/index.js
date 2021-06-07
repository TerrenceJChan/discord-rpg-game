// Intialize dependencies and bot
import * as dotenv from 'dotenv';
import Discord from 'discord.js';

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

// Global variables
let fightState = false;

// Testing objects for enemy and player
let enemy = {
  name: 'The dragon',
  hp: 100,
  atk: 10,
  def: 5,
  attacks: new Map([
    [{ message: 'The dragon breathes devastating fire!', multiplier: 2 }, 1],
    [{ message: 'The dragon takes a swipe with its razor sharp claws.', multiplier: 1 }, 5],
    [{ message: 'The dragon bites with its terrifying jaws.', multiplier: 1.5 }, 2],
  ]),
  drops: new Map([
    [{ mat: 'Dragon Hide' }, 3],
    [{ mat: 'Dragon Talon' }, 2],
    [{ mat: 'Dragon Fang' }, 1],
  ]),
  msgs: {
    encounter: 'Your party tracks down the nest of a large dragon. It shrieks as it rears its head towards you. It\'s going to attack!',
    defeat: 'With a final growl, the defeated dragon collapses onto the ground.',
    // Messages that are printed when enemy's health falls below certain percentages
    sub50: ['Blood runs down the dragon\'s scaly hide. The dragon gives a terrifying roar.', false],
  },
};

let player = {
  name: 'Hero',
  hp: 100,
  atk: 20,
  def: 7,
};

let fightInfo = {
  startingEnemyHp: enemy.hp,
};

let inventory = [];

// Command that begins fight

const checkInv = () => {
  let message = '';
  for (let i = 0; i < inventory.length; i++) {
    message += inventory[i].mat + ' | ' + inventory[i].quantity + '\n';
  }
  return message;
};

const hunt = () => {
  fightState = true;
  return enemy.msgs.encounter;
};

/**
 * @param {number} low The lower bound (inclusive)
 * @param {number} high The upper bound (exclusive)
 * @returns {number} A random number between low and high
 */
const randomRange = (low, high) => Math.random() * (high - low) + low;

/**
 * @param {number} low The lower bound (inclusive)
 * @param {number} high The upper bound (inclusive)
 * @returns {number} A random integer between low and high
 */
const irandomRange = (low, high) => Math.floor(randomRange(low, high + 1));

/**
 * @returns {number} a random number between 0.8 and 1.2
 */
const random20 = () => 1 + irandomRange(-20, 20) / 100;

/**
 * @param {number[]} list A list of numbers
 * @returns {number} the sum of numbers in the list
 */
const sum = (list) => list.reduce((total, value) => total + value, 0);

/**
 * @param {Map<T, number>} options A map of options to their weight
 * @returns {T} One of the options, chosen randomly
 */
const chooseWeighted = (options) => {
  const totalWeight = sum([...options.values()]);
  let which = irandomRange(1, totalWeight);
  for (const [item, weight] of options) {
    which -= weight;
    if (which <= 0) { return item; }
  }
};

/**
 * @param {object} drop An item to be added to the player's inventory
 * @param {string} drop.mat The item's name
 */
const addItem = (drop) => {
  let result = inventory.find(loot => loot.mat === drop.mat);
  if (result) {
    result.quantity += 1;
  } else {
    inventory.push({ mat: drop.mat, quantity: 1 });
  }
};

// Command that calculates the damage and consequences between the enemy and player
const attack = () => {
  let enemyDamage = Math.floor((player.atk * random20()) - (enemy.def * random20()));
  if (enemyDamage < 0) {
    enemyDamage = 0;
  }

  const enemyAttack = chooseWeighted(enemy.attacks);

  let playerDamage = Math.floor((enemy.atk * enemyAttack.multiplier * random20()) - (player.def * random20()));
  if (playerDamage < 0) {
    playerDamage = 0;
  }

  enemy.hp -= enemyDamage;
  player.hp -= playerDamage;

  // Generic combat results message to be displayed after each attack
  let genericMsg = `${player.name} slashes ${enemy.name} for ${enemyDamage} damage! ${enemyAttack.message} ${enemy.name} deals ${playerDamage} damage!`;

  // Describes what is happening in the fight
  if (player.hp <= 0) {
    return `${player.name} has taken too much damage and cannot carry on! ${player.name} retreats from the battle.`;
  } else {
    switch (true) {
    case enemy.hp <= 0: {
      fightState = false;
      const reward = chooseWeighted(enemy.drops);
      addItem(reward);
      console.log(inventory);
      return (genericMsg + ' ' + enemy.msgs.defeat + '\n\n' + `You collect one <${reward.mat}> and place it in your inventory.`);
    }
    case enemy.hp <= fightInfo.startingEnemyHp * 0.5 && enemy.msgs.sub50[1] === false: {
      enemy.msgs.sub50[1] = true;
      return (genericMsg + ' ' + enemy.msgs.sub50[0]);
    }
    default: {
      return (genericMsg);
    }
    }
  }
};

// Command to check the enemy's remaining health
const check = () => {
  return `The ${enemy.name} has ${enemy.hp} health remaining.`;
};

// Interprets the user's commands on Discord
let messageAt = 0;
bot.on('message', (msg) => {
  if (!msg.content.startsWith(COMMAND)) { return; }
  if (Date.now() - messageAt < MESSAGE_TIMEOUT) {
    msg.channel.send('Spam prevented.');
    return;
  }
  messageAt = Date.now();
  if (fightState === false) {
    switch (msg.content) {
    case COMMAND + 'inventory': {
      msg.channel.send(checkInv());
      break;
    }
    case COMMAND + 'hunt': {
      msg.channel.send(hunt());
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
      msg.channel.send(attack());
      break;
    case COMMAND + 'check':
      msg.channel.send(check());
      break;
    }
  }
});

// msg.reply("noot noot");
