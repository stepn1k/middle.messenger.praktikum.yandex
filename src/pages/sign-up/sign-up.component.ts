import SignUpTemplate from './sign-up.template';
import FormField from '../../components/form-field/form-field.component';
import Block from '../../../core/block';
import Button from '../../components/button';

export interface SignUpPageProps {
  emailInput: FormField;
  loginInput: FormField;
  firstNameInput: FormField;
  secondNameInput: FormField;
  phoneInput: FormField;
  passwordInput: FormField;
  confirmPasswordInput: FormField;
  backButton: Button;
  createButton: Button;
}

export default class SignUpPage extends Block {
  constructor() {
    const context: SignUpPageProps = {
      emailInput: new FormField({
        labelText: 'Email', id: 'email', type: 'email', value: '',
      }),
      loginInput: new FormField({
        labelText: 'Login', id: 'login', type: 'text', value: '',
      }),
      firstNameInput: new FormField({
        labelText: 'First Name', id: 'first_name', type: 'text', value: '',
      }),
      secondNameInput: new FormField({
        labelText: 'Second Name', id: 'second_name', type: 'text', value: '',
      }),
      phoneInput: new FormField({
        labelText: 'Phone', id: 'phone', type: 'tel', value: '',
      }),
      passwordInput: new FormField({
        labelText: 'Password', id: 'password', type: 'password', value: '',
      }),
      confirmPasswordInput: new FormField({
        labelText: 'Confirm Password', id: 'confirmPassword', type: 'password', value: '',
      }),
      createButton: new Button({ label: 'Create account', link: '/messenger', type: 'raised' }),
      backButton: new Button({ label: 'Back to login', link: '/sign_in', type: 'basic' }),
    };
    super(context, SignUpTemplate);
  }

  public render(): HTMLElement {
    return this.element;
  }
}
