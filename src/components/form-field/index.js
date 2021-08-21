import FormFieldTemplate from './form-field.template';

export const FormFieldComponent = (props) => {
    return {
        selector: 'form-field-component',
        context: props,
        template: FormFieldTemplate
    }
}