import SignInTemplate from './sign-in.template';
import FormField from '../../components/form-field/form-field.component';
import Button from '../../components/button/button.component';
import Block from '../../../core/block';
import { LoginValidator, PasswordValidator } from '../../utils/validators/validators';

export interface SignInPageContext {
  loginInput: FormField;
  passwordInput: FormField;
  loginButton: Button;
  createAccountButton: Button;
}

export default class SignInPage extends Block {
  private loginInput: FormField;

  private passwordInput: FormField;

  constructor() {
    const context: SignInPageContext = {
      loginInput: new FormField({
        labelText: 'Login',
        id: 'login',
        type: 'text',
        value: '',
        viewType: 'basic',
        validator: LoginValidator,
      }),
      passwordInput: new FormField({
        labelText: 'Password',
        id: 'password',
        type: 'password',
        value: '',
        viewType: 'basic',
        validator: PasswordValidator,
      }),
      loginButton: new Button({
        label: 'Sign in',
        link: '/messenger',
        viewType: 'raised',
        events: { click: ($event) => this.signIn($event) },
      }),
      createAccountButton: new Button({ label: 'Create account', link: '/sign_up', viewType: 'basic' }),
    };
    super(context, SignInTemplate);
    this.loginInput = context.loginInput;
    this.passwordInput = context.passwordInput;
  }

  public signIn($event: Event): void {
    $event.preventDefault();
    const isFormValid = [this.loginInput, this.passwordInput]
      .map((input) => input.checkValidation())
      .every((isValid) => isValid);

    if (!isFormValid) {
      return;
    }

    console.log({
      login: this.loginInput.getInputValue(),
      password: this.passwordInput.getInputValue(),
    });
  }
}
