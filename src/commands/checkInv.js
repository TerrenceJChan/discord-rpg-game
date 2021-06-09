export const checkInv = ({ inventory }) => {
  if (inventory.length === 0) {
    return 'Your inventory is empty!';
  }
  let message = '';
  for (const item of ctx.inventory) {
    message += `${item.mat} | ${item.quantity} \n`;
  }
  return message;
};
