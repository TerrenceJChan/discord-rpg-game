// Command to check the enemy's remaining health
export const check = (ctx) => {
  return `The ${ctx.enemy.name} has ${ctx.enemy.hp} health remaining.`;
};