import LoginTemplate from './login.template';
import { ButtonComponent } from '../../components/button';
import { FormFieldComponent } from '../../components/form-field';

const formArray = [];
const buttons = [];

export const LoginPage = (props = {}) => {
    const header = props.type === 'signIn' ? 'Log in to your account' : 'Create an account';

    switch (props.type) {
        case 'signIn':
            formArray.push(
                `{ labelText: 'Login', id: 'login', type: 'text' }`,
                `{ labelText: 'Password', id: 'password', type: 'password' }`
            );
            buttons.push(
                `{ label: 'Sign in', link: '/messenger', type: 'raised' }`,
                `{ label: 'Create account', link: '/sign_up', type: 'basic' }`
            );
            break;
        case 'singUp':
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
            break;
    }

    return {
        template: LoginTemplate,
        context: { ...props, header, buttons, formArray },
        declaredComponents: [FormFieldComponent, ButtonComponent]
    }
};
