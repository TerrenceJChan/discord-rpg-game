// Intialize dependencies and bot
import * as dotenv from 'dotenv';
import Discord from 'discord.js';

dotenv.config();
const bot = new Discord.Client();

const {
  TOKEN,
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
  def: 5,
  attacks: new Map([
    [{ message: 'The dragon breathes devastating fire!', atk: 15 }, 1],
    [{ message: 'The dragon takes a swipe with its razor sharp claws.', atk: 10 }, 5],
    [{ message: 'The dragon bites with its terrifying jaws.', atk: 12 }, 2],
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

// Command that begins fight
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

// Command that calculates the damage and consequences between the enemy and player
const attack = () => {
  let enemyDamage = Math.floor((player.atk * random20()) - (enemy.def * random20()));
  console.log(enemyDamage);
  if (enemyDamage < 0) {
    enemyDamage = 0;
  }

  const enemyAttack = chooseWeighted(enemy.attacks);

  let playerDamage = Math.floor((enemyAttack.atk * random20()) - (player.def * random20()));
  console.log(playerDamage);
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
    case enemy.hp <= 0:
      return genericMsg + ' ' + enemy.msgs.defeat;
    case enemy.hp <= fightInfo.startingEnemyHp * 0.5 && enemy.msgs.sub50[1] === false:
      enemy.msgs.sub50[1] = true;
      return genericMsg + ' ' + enemy.msgs.sub50[0];
    default:
      return genericMsg;
    }
  }
};

// Command to check the enemy's remaining health
const check = () => {
  return `The ${enemy.name} has ${enemy.hp} health remaining.`;
};

// Interprets the user's commands on Discord
bot.on('message', msg => {
  if (fightState === false) {
    if (msg.content.charAt(0) === COMMAND) {
      switch (msg.content) {
      case COMMAND + 'hunt':
        msg.channel.send(hunt());
        break;
      case COMMAND + 'greet':
        msg.channel.send('Hello!');
        break;
      }
    }
  } else {
    if (msg.content.charAt(0) === COMMAND) {
      switch (msg.content) {
      case COMMAND + 'attack':
        msg.channel.send(attack());
        break;
      case COMMAND + 'check':
        msg.channel.send(check());
        break;
      }
    }
  }
});

// msg.reply("noot noot");
