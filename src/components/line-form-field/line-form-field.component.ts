import LineFormFieldTemplate from './line-form-field.template';
import Templator from '../../utils/templator/templator';

export interface LineFormFieldProps {
  labelText: string;
  value: string | number;
  id: string;
  type: 'text' | 'password' | 'tel' | 'email';
}

export default class LineFormField {
  private readonly props: LineFormFieldProps;
  private readonly template: string;

  constructor(props: LineFormFieldProps) {
    this.props = props;
    this.template = LineFormFieldTemplate;
  }

  public render(): string {
    const templateWithContext = new Templator({
      template: this.template,
      context: this.props
    });
    return templateWithContext.compile();
  }
}
