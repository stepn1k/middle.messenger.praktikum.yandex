import ButtonTemplate from './button.template';

export const ButtonComponent = (props = {}) => {
    if (!props.color) {
        props.color = 'primary'
    }
    return {
        selector: 'button-component',
        context: props,
        template: ButtonTemplate
    }
}