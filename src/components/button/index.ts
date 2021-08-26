import ButtonTemplate from './button.template';
import { ComponentInterface } from '../../models/component.interface';

export const ButtonComponent = (props: { color?: string } = {}): ComponentInterface => {
    if (!props.color) {
        props.color = 'primary'
    }
    return {
        selector: 'button-component',
        context: props,
        template: ButtonTemplate
    }
}