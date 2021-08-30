import FormFieldTemplate from './form-field.template';
import Templator from '../../utils/templator/templator';

export interface FormFieldProps {
  labelText: string;
  value: string | number;
  id: string;
  type: 'text' | 'password' | 'tel' | 'email';
}

export default class FormField {
  private readonly props: FormFieldProps;
  private readonly template: string;

  constructor(props: FormFieldProps) {
    this.props = props;
    this.template = FormFieldTemplate;
  }

  public render(): string {
    const templateWithContext = new Templator({
      template: this.template,
      context: this.props
    });
    return templateWithContext.compile();
  }
}
