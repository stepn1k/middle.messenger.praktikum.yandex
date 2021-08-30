import DividerTemplate from './divider.template';
import Templator from '../../utils/templator/templator';

export default class Divider {
  private readonly template: string;

  constructor() {
    this.template = DividerTemplate;
  }

  public render(): string {
    const templateWithContext = new Templator({ template: this.template, context: {} });
    return templateWithContext.compile();
  }
}
