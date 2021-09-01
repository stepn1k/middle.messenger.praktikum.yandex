import ButtonTemplate from './button.template';
import Templator from '../../utils/templator/templator';
import Block from '../../../core/block';

export interface ButtonProps {
  label: string;
  type: 'basic' | 'raised';
  link: string;
  color?: 'red' | 'blue';
}

export default class Button extends Block {
  private readonly template: string;
  private readonly color: 'blue' | 'red';

  constructor(props: ButtonProps) {
    super(props);
    this.template = ButtonTemplate;
    this.color = props?.color ? props.color : 'blue';
  }

  public render(): string {
    const templateWithContext = new Templator({
      template: this.template,
      context: { ...this.props, color: this.color, componentId: this.id }
    });

    return templateWithContext.compile();
  }
}
