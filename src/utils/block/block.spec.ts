import { expect } from 'chai';
import 'mocha';
import { JSDOM } from 'jsdom';
import Block from './block';

declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
    }
  }
}

const dom = new JSDOM('<!DOCTYPE html><div class="app"></div>');
(global as NodeJS.Global).document = dom.window.document;

function createElement() {
  const context = { test: 'Test string' };
  const template = '<div>{{ test }}</div>';
  // @ts-ignore
  return new Block(context, template);
}

describe('Block', () => {
  it('Block creating', () => {
    const el = createElement();
    expect(el).to.not.be.null;
    expect(el).to.be.instanceof(Block);
  });

  it('Block has id', () => {
    const el = createElement();
    expect(el.id).to.be.a('string');
  });

  it('Block render return element', () => {
    const el = createElement();
    expect(el.render().outerHTML).to.eq('<div>Test string</div>');
  });

  it('Block has template with props', () => {
    const el = createElement();
    expect((el.element as HTMLElement).outerHTML).to.eq('<div>Test string</div>');
  });
});
