import ButtonTemplate from './button.template';

export const ButtonComponent = (props) => {
    return {
        selector: 'button-component',
        context: props,
        template: ButtonTemplate
    }
}