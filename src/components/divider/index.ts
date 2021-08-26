import DividerTemplate from './divider.template';
import { ComponentInterface } from '../../models/component.interface';

export const DividerComponent = (): ComponentInterface => {
    return {
        selector: 'divider-component',
        context: {},
        template: DividerTemplate
    }
}