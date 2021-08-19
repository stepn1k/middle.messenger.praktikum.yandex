import SingInTemplate from './sign-in.template';
import { ButtonComponent } from '../../components/button';

export const SignInPage = (props) => {
    return {
        template: SingInTemplate,
        context: props,
        declaredComponents: [ButtonComponent]
    }
};
