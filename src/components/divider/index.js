import DividerTemplate from './divider.template';

export const DividerComponent = (props) => {
    return {
        selector: 'divider-component',
        context: props,
        template: DividerTemplate
    }
}