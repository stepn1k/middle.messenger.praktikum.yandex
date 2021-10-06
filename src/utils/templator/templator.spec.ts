import Templator from './templator';
import * as chai from 'chai';

describe('Templator', () => {
  const template = `
    <div class="{{ className }}">
        <img src="{{ imageSource }}" alt="test">
        <div>{{ testString }}</div>
    </div>`;

  const context = {
    className: 'style-class__test',
    imageSource: '/static/img/avatar.jpg',
    testString: 'Test string'
  };
  const templator = new Templator({ context, template });

  it('Templator filled all props in template', () => {
    const actualText = (templator.compile() as HTMLElement).outerHTML;
    const expectedText = `<div class="style-class__test">
        <img src="/static/img/avatar.jpg" alt="test">
        <div>Test string</div>
    </div>`;
    chai.expect(actualText).to.eq(expectedText);
  });
});

