import { random20, chooseWeighted } from '../utils/random.js';
import { optionsMessage } from '../utils/optionsMessage.js';
import connection from '../database/connection.js';
import currentPlayer from '../middleware/currentPlayer.js';
import currentCharacter from '../middleware/currentCharacter.js';
import currentEnemy from '../middleware/currentEnemy.js';

/**
* @param {object} drop An item to be added to the player's inventory
* @param {string} drop.mat The item's name
*/
const addItem = (drop, inventory) => {
  let result = inventory.find(loot => loot.mat === drop.mat);
  if (result) {
    result.quantity += 1;
  } else {
    inventory.push({ mat: drop.mat, quantity: 1 });
  }
};

export const attack = (ctx, option) => connection(async (db) => {
  const player = await currentPlayer(ctx, db);
  const character = await currentCharacter(ctx, db);
  const enemy = await currentEnemy(ctx, db);
  const { inventory } = ctx;

  // Converts second argument into a number
  if (!isNaN(option)) {
    option = parseInt(option);
  }
  // We do not use !attack 0, so we do some math to change this. Also checks for valid input
  if (Number.isInteger(option) && option > 0 && option <= character.skills.length) {
    option -= 1;
  } else if (Number.isInteger(option)) {
    return 'Please enter a valid option!';
  } else {
    return 'Please select which attack to use!';
  }
  const skill = character.skills[option];

  // Checks if the user has enough resources to use a skill
  if (skill.charge < 0 && skill.charge + character.charge < 0) {
    return `${character.name} does not have enough charges!`;
  } else {
    character.charge += skill.charge;
  }

  let enemyDamage = Math.floor((character.atk * skill.multiplier * random20()) - (enemy.def * random20()));
  if (enemyDamage < 0) {
    enemyDamage = 0;
  }

  const enemyAttack = chooseWeighted(enemy.attacks);

  let playerDamage = Math.floor((enemy.atk * enemyAttack.multiplier * random20()) - (character.def * random20()));
  if (playerDamage < 0) {
    playerDamage = 0;
  }

  enemy.hp -= enemyDamage;
  character.hp -= playerDamage;

  await character.save(db);
  await enemy.save(db);

  // Generic combat results message to be displayed after each attack
  const genericMsg = `${character.name} ${skill.message}! They deal ${enemyDamage} damage. ${enemyAttack.message}! They deal ${playerDamage} damage!`;

  // Describes what is happening in the fight
  if (character.hp <= 0) {
    return `${character.name} has taken too much damage and cannot carry on! ${character.name} retreats from the battle.`;
  } else {
    switch (true) {
    case enemy.hp <= 0: {
      const reward = chooseWeighted(enemy.drops);
      addItem(reward, inventory);
      const victoryMessage = `${genericMsg} ${enemy.msgs.defeat}\n\nYou collect one <${reward.mat}> and place it in your inventory.`;
      await enemy.delete(db);
      return victoryMessage;
    }
    case enemy.hp <= enemy.maxhp * 0.5 && enemy.hp + enemyDamage > enemy.maxhp * 0.5:
      return `${genericMsg} ${enemy.msgs.sub50[0]}\n${optionsMessage(player, character)}`;
    default:
      return `${genericMsg}\n${optionsMessage(player, character)}`;
    }
  }
});
