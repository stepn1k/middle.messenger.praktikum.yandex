import DividerTemplate from './divider.template';
import Templator from '../../utils/templator/templator';
import Block from '../../../core/block';

export default class Divider extends Block {
  private readonly template: string;

  constructor() {
    super({})
    this.template = DividerTemplate;
  }

  public render(): string {
    const templateWithContext = new Templator({ template: this.template, context: { componentId: this.id } });
    return templateWithContext.compile();
  }
}
