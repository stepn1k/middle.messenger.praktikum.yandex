import { assert } from 'chai';
import Router from './router';
import { JSDOM } from 'jsdom';
import Block from '../block/block';

declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
    }
  }
}

const dom = new JSDOM('<!DOCTYPE html><div data-router-outlet="app"></div>');
(global as any).window = dom.window;
(global as any).document = dom.window.document;


describe('Router', function () {
  it('Must be defined', function () {
    const router = new Router('app');
    assert.exists(router);
  });

  it('New Router has an empty arr of routes', function () {
    const router = new Router('app');
    assert.isArray(router.routes, 'Routes is array');
    assert.lengthOf(router.routes, 0, 'No routes');
  });

  it('Can add a new route', function () {
    const router = new Router('app');
    // @ts-ignore
    router.use('/not-found', () => new Block({}, '<div>test</div>'));
    assert.lengthOf(router.routes, 1, 'Added a route');
    assert.equal(router.routes[0].getPathName(), '/not-found', 'Route path name is correct');
  });
});
