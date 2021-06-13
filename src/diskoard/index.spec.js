import { jest } from '@jest/globals';
import Diskoard from './index.js';

describe('Diskoard', function () {
  describe('middleware composition', function () {
    it('`#handle()` should call a middleware function provided by the `#use()` method', async function () {
      const app = new Diskoard();
      const handler = jest.fn();
      app.use(handler);
      await app.handle({});
      expect(handler).toHaveBeenCalled();
    });

    it('calling `next` from the last middleware should just do nothing', async function () {
      const app = new Diskoard();
      const handler = jest.fn((ctx, next) => next());
      app.use(handler);
      await app.handle({});
      expect(handler).toHaveBeenCalled();
    });

    it('should pass a `next` function to the middleware to facilitate chaining', async function () {
      const app = new Diskoard();
      const middleware = jest.fn((ctx, next) => next());
      const handler = jest.fn();
      app.use(middleware);
      app.use(handler);
      await app.handle({});
      expect(middleware, 'middleware').toHaveBeenCalled();
      expect(handler, 'handler').toHaveBeenCalled();
    });

    it('should pass the same context argument to all chained middleware', async function () {
      const app = new Diskoard();
      const middleware = jest.fn((ctx, next) => next());
      const handler = jest.fn();
      app.use(middleware);
      app.use(handler);
      await app.handle({});
      expect(handler).toHaveBeenCalledWith(expect.any(Object), expect.any(Function));
      const ctx = middleware.calls[0][0];
      expect(handler).toHaveBeenCalledWith(ctx, expect.any(Function));
    });

    it('the context argument passed to middleware should include the handled event data', async function () {
      const app = new Diskoard();
      const event = {};
      const handler = jest.fn();
      app.use(handler);
      await app.handle(event);
      expect(handler).toHaveBeenCalled();
      const ctx = handler.calls[0][0];
      expect(ctx).toHaveProperty('event', event);
    });

    it('errors thrown from a middleware should be able to be caught by an upstream middleware', async function () {
      const app = new Diskoard();
      const errorHandled = jest.fn();
      app.use(async (ctx, next) => {
        try {
          await next();
        } catch {
          errorHandled();
          return;
        }
        expect.fail();
      });
      app.use(async () => { throw new Error(); });
      await app.handle({});
      expect(errorHandled).toHaveBeenCalled();
    });
  });
});
