import FormFieldTemplate from './form-field.template';
import Block from '../../../core/block';

export interface FormFieldProps {
  labelText: string;
  value: string | number;
  id: string;
  type: 'text' | 'password' | 'tel' | 'email';
}

export default class FormField extends Block {
  constructor(props: FormFieldProps) {
    super(props, FormFieldTemplate);
  }
}
