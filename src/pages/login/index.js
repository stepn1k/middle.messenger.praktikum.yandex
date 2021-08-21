import LoginTemplate from './login.template';
import { ButtonComponent } from '../../components/button';
import { FormFieldComponent } from '../../components/form-field';

export const LoginPage = (props = {}) => {
    const header = props.type === 'signIn' ? 'Log in to your account' : 'Create an account';
    const formArray = [];
    const buttons = [];

    if (props.type === 'signIn') {
        formArray.push(
            `{ labelText: 'Login', id: 'login', type: 'text' }`,
            `{ labelText: 'Password', id: 'password', type: 'password' }`
        );
        buttons.push(
            `{ label: 'Sign in', link: '/messenger', type: 'raised' }`,
            `{ label: 'Create account', link: '/sign_up', type: 'basic' }`
        );
    } else {
        formArray.push(
            `{ labelText: 'Email', id: 'email', type: 'email' }`,
            `{ labelText: 'Login', id: 'login', type: 'text' }`,
            `{ labelText: 'First Name', id: 'first_name', type: 'text' }`,
            `{ labelText: 'Second Name', id: 'second_name', type: 'text' }`,
            `{ labelText: 'Phone', id: 'phone', type: 'tel' }`,
            `{ labelText: 'Password', id: 'password', type: 'password' }`,
            `{ labelText: 'Confirm Password', id: 'confirmPassword', type: 'password' }`
        );
        buttons.push(
            `{ label: 'Create account', link: '/messenger', type: 'raised' }`,
            `{ label: 'Back to login', link: '/sign_in', type: 'basic' }`
        );
    }

    return {
        template: LoginTemplate,
        context: { header, buttons, formArray, ...props },
        declaredComponents: [FormFieldComponent, ButtonComponent]
    }
};
