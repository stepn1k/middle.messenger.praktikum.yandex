import FormFieldTemplate from './form-field.template';
import Templator from '../../utils/templator/templator';
import Block from '../../../core/block';

export interface FormFieldProps {
  labelText: string;
  value: string | number;
  id: string;
  type: 'text' | 'password' | 'tel' | 'email';
}

export default class FormField extends Block {
  private readonly template: string;

  constructor(props: FormFieldProps) {
    super('div', props);
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
