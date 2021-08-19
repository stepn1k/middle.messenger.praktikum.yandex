import LineFormFieldTemplate from './line-form-field.template';

export const LineFormFieldComponent = (props) => {
    return {
        selector: 'line-form-field-component',
        context: props,
        template: LineFormFieldTemplate
    }
}