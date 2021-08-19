import ErrorPageTemplate from './error.template';
import { ButtonComponent } from '../../components/button';

export const ErrorPage = (props = null) => {
    const context = {};
    if (props.type === '404') {
        context.title = 'Page Not Found';
        context.subtitle = 'If you entered a web address or followed a link please check it was correct.'
    } else {
        context.title = 'Something went wrong';
        context.subtitle = 'We are already working on fixing problem.';
    }
    return { template: ErrorPageTemplate, context, declaredComponents: [ButtonComponent] }
};
