import { random20, chooseWeighted } from '../utils/random.js';

/**
* @param {object} drop An item to be added to the player's inventory
* @param {string} drop.mat The item's name
*/
const addItem = (drop, ctx) => {
  let result = ctx.inventory.find(loot => loot.mat === drop.mat);
  if (result) {
    result.quantity += 1;
  } else {
    ctx.inventory.push({ mat: drop.mat, quantity: 1 });
  }
};

export const attack = (ctx) => {
  const { player, enemy } = ctx;
  let enemyDamage = Math.floor((player.atk * random20()) - (enemy.def * random20()));
  if (enemyDamage < 0) {
    enemyDamage = 0;
  }

  const enemyAttack = chooseWeighted(enemy.attacks);

  let playerDamage = Math.floor((enemy.atk * enemyAttack.multiplier * random20()) - (ctx.player.def * random20()));
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
      const reward = chooseWeighted(enemy.drops);
      addItem(reward, ctx);
      const victoryMessage = `${genericMsg} ${enemy.msgs.defeat}\n\nYou collect one <${reward.mat}> and place it in your inventory.`;
      ctx.enemy = null;
      return victoryMessage;
    }
    case enemy.hp <= enemy.maxhp * 0.5 && enemy.msgs.sub50[1] === false: {
      enemy.msgs.sub50[1] = true;
      return (genericMsg + ' ' + enemy.msgs.sub50[0]);
    }
    default: {
      return (genericMsg);
    }
    }
  }
};
