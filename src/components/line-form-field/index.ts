import LineFormFieldTemplate from './line-form-field.template';
import { ComponentInterface } from '../../models/component.interface';

export const LineFormFieldComponent = (props: object = {}): ComponentInterface => {
    return {
        selector: 'line-form-field-component',
        context: props,
        template: LineFormFieldTemplate
    }
}