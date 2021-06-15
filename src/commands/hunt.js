import Dragon from '../enemies/Dragon.js';
import {optionsMessage} from '../utils/optionsMessage.js';

export const hunt = (ctx) => {
  if (ctx.player) {
    ctx.enemy = new Dragon;
    return `${ctx.enemy.msgs.encounter}
    ${optionsMessage(ctx)}`;
  } else {
    return 'You have no active adventurer!';
  }
};
