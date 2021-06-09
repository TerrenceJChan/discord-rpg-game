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
  let enemyDamage = Math.floor((ctx.player.atk * random20()) - (ctx.enemy.def * random20()));
  if (enemyDamage < 0) {
    enemyDamage = 0;
  }

  const enemyAttack = chooseWeighted(ctx.enemy.attacks);

  let playerDamage = Math.floor((ctx.enemy.atk * enemyAttack.multiplier * random20()) - (ctx.player.def * random20()));
  if (playerDamage < 0) {
    playerDamage = 0;
  }

  ctx.enemy.hp -= enemyDamage;
  ctx.player.hp -= playerDamage;

  // Generic combat results message to be displayed after each attack
  let genericMsg = `${ctx.player.name} slashes ${ctx.enemy.name} for ${enemyDamage} damage! ${enemyAttack.message} ${ctx.enemy.name} deals ${playerDamage} damage!`;

  // Describes what is happening in the fight
  if (ctx.player.hp <= 0) {
    return `${ctx.player.name} has taken too much damage and cannot carry on! ${ctx.player.name} retreats from the battle.`;
  } else {
    switch (true) {
    case ctx.enemy.hp <= 0: {
      const reward = chooseWeighted(ctx.enemy.drops);
      addItem(reward, ctx);
      const victoryMessage = `${genericMsg} ${ctx.enemy.msgs.defeat}\n\nYou collect one <${reward.mat}> and place it in your inventory.`;
      ctx.enemy = null;
      return victoryMessage;
    }
    case ctx.enemy.hp <= ctx.enemy.maxhp * 0.5 && ctx.enemy.msgs.sub50[1] === false: {
      ctx.enemy.msgs.sub50[1] = true;
      return (genericMsg + ' ' + ctx.enemy.msgs.sub50[0]);
    }
    default: {
      return (genericMsg);
    }
    }
  }
};