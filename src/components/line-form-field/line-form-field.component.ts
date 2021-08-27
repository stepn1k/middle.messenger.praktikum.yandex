import LineFormFieldTemplate from './line-form-field.template';
import { ComponentInterface } from '../../models/component.interface';

export default (props: object = {}): ComponentInterface => ({
  selector: 'line-form-field-component',
  context: props,
  template: LineFormFieldTemplate,
});
