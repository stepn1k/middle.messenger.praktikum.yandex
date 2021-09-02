import DividerTemplate from './divider.template';
import Block from '../../../core/block';

export default class Divider extends Block {
  constructor() {
    super({}, DividerTemplate);
  }

  public render(): HTMLElement {
    return this.element;
  }
}
