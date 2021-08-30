import ButtonTemplate from './button.template';
import Templator from '../../utils/templator/templator';

export interface ButtonProps {
  label: string;
  type: 'basic' | 'raised';
  link: string;
  color?: 'red' | 'blue';
}

export default class Button {
  private readonly props: ButtonProps;
  private readonly template: string;
  private readonly color: 'blue' | 'red';

  constructor(props: ButtonProps) {
    this.props = props;
    this.template = ButtonTemplate;
    this.color = props?.color ? props.color : 'blue';
  }

  public render(): string {
    const templateWithContext = new Templator({
      template: this.template,
      context: { ...this.props, color: this.color }
    });
    return templateWithContext.compile();
  }
}
