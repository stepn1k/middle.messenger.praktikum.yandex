import SignInTemplate from './sign-in.template';
import FormField from '../../components/form-field/form-field.component';
import Button from '../../components/button/button.component';
import Block from '../../../core/block';

export interface SignInPageProps {
  loginInput: FormField;
  passwordInput: FormField;
  loginButton: Button;
  createAccountButton: Button;
}

export default class SignInPage extends Block {
  constructor() {
    const context: SignInPageProps = {
      loginInput: new FormField({
        labelText: 'Login', id: 'login', type: 'text', value: '',
      }),
      passwordInput: new FormField({
        labelText: 'Password', id: 'password', type: 'password', value: '',
      }),
      loginButton: new Button({ label: 'Sign in', link: '/messenger', type: 'raised' }),
      createAccountButton: new Button({ label: 'Create account', link: '/sign_up', type: 'basic' }),
    };
    super(context, SignInTemplate);
  }
}
