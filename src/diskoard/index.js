/**
 * Koa-inspired middleware-based Discord bot interaction handler.
 *
 * If all goes according to plan, at the end of this project we should be able to
 * pop this part out and make it into an NPM package of our own. Make it a goal to
 * put no game-specific code into this folder.
 */
export default class Diskoard {
  constructor() {}

  use(handler) {
    this.handler = handler;
  }

  async handle(event) {
    /* TODO#19: make this method work according to spec */
    this.handler(event);
  }

  run(bot, onready) {
    bot.on('ready', onready);
    bot.on('message', (event) => this.handle(event));
  }
}
