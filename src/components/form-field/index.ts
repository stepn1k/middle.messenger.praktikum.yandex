import FormFieldTemplate from './form-field.template';
import { ComponentInterface } from '../../models/component.interface';

export const FormFieldComponent = (props: object = {}): ComponentInterface => {
    return {
        selector: 'form-field-component',
        context: props,
        template: FormFieldTemplate
    }
}