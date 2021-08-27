import FormFieldTemplate from './form-field.template';
import { ComponentInterface } from '../../models/component.interface';

export default (props: object = {}): ComponentInterface => ({
  selector: 'form-field-component',
  context: props,
  template: FormFieldTemplate,
});
