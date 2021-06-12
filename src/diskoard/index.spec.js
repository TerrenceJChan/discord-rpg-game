import { expect } from 'chai';
import sinon from 'sinon';
import Diskoard from './index.js';

describe('Diskoard', function () {
  describe('middleware composition', function () {
    it('`#handle()` should call a middleware function provided by the `#use()` method', async function () {
      const app = new Diskoard();
      const handler = sinon.spy();
      app.use(handler);
      await app.handle({});
      expect(handler).to.have.been.called;
    });

    it('calling `next` from the last middleware should just do nothing', async function () {
      const app = new Diskoard();
      const handler = sinon.spy((ctx, next) => next());
      app.use(handler);
      await app.handle({});
      expect(handler).to.have.been.called;
    });

    it('should pass a `next` function to the middleware to facilitate chaining', async function () {
      const app = new Diskoard();
      const middleware = sinon.spy((ctx, next) => next());
      const handler = sinon.spy();
      app.use(middleware);
      app.use(handler);
      await app.handle({});
      expect(middleware, 'middleware').to.have.been.called;
      expect(handler, 'handler').to.have.been.called;
    });

    it('should pass the same context argument to all chained middleware', async function () {
      const app = new Diskoard();
      const middleware = sinon.spy((ctx, next) => next());
      const handler = sinon.spy();
      app.use(middleware);
      app.use(handler);
      await app.handle({});
      expect(middleware).to.have.been.called;
      const ctx = middleware.getCall(0).args[0];
      expect(handler).to.have.been.calledWith(ctx);
    });

    it('the context argument passed to middleware should include the handled event data', async function () {
      const app = new Diskoard();
      const event = {};
      const handler = sinon.spy();
      app.use(handler);
      await app.handle(event);
      expect(handler).to.have.been.called;
      const ctx = handler.getCall(0).args[0];
      expect(ctx).to.have.property('event', event);
    });

    it('errors thrown from a middleware should be able to be caught by an upstream middleware', async function () {
      const app = new Diskoard();
      const errorHandled = sinon.spy();
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
      expect(errorHandled).to.have.been.called;
    });
  });
});
