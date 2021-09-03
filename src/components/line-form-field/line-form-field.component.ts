import LineFormFieldTemplate from './line-form-field.template';
import Block from '../../../core/block';

export interface LineFormFieldProps {
  labelText: string;
  value: string | number;
  id: string;
  type: 'text' | 'password' | 'tel' | 'email';
  disabled?: boolean;
}

export default class LineFormField extends Block {
  constructor(props: LineFormFieldProps) {
    const context = {
      ...props,
      disabled: props.disabled ? 'disabled' : 'enabled',
    };
    super(context, LineFormFieldTemplate);
  }
}
