import LineFormFieldTemplate from './line-form-field.template';
import Block from '../../../core/block';

export interface LineFormFieldProps {
  labelText: string;
  value: string | number;
  id: string;
  type: 'text' | 'password' | 'tel' | 'email';
}

export default class LineFormField extends Block {
  constructor(props: LineFormFieldProps) {
    super(props, LineFormFieldTemplate);
  }

  public render(): HTMLElement {
    return this.element;
  }
}
