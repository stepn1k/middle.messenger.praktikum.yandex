import ErrorPageTemplate from './error.template';
import { ButtonComponent } from '../../components/button';

export const ErrorPage = (props = {}) => {
    const title = props.type === '404'
        ? 'Page Not Found'
        : 'Something went wrong';
    const subtitle = props.type === '404'
        ? 'If you entered a web address or followed a link please check it was correct.'
        : 'We are already working on fixing problem.';

    return {
        template: ErrorPageTemplate,
        context: { title, subtitle, ...props },
        declaredComponents: [ButtonComponent]
    }
};
