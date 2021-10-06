import SignInTemplate from './sign-in.template';
import FormField from '../../components/form-field/form-field.component';
import Button from '../../components/button/button.component';
import Block from '../../utils/block/block';
import { LoginValidator, PasswordValidator } from '../../utils/validators/validators';
import { router } from '../../index';
import AuthController from '../../controllers/auth.controller';
import { RouterPaths } from '../../utils/router/router-paths.enum';

export interface SignInPageContext {
  loginInput: FormField;
  passwordInput: FormField;
  loginButton: Button;
  createAccountButton: Button;
}

export default class SignInPage extends Block {
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
        viewType: 'raised',
        events: { click: ($event) => this.signIn($event) },
      }),
      createAccountButton: new Button({
        label: 'Create account',
        viewType: 'basic',
        events: { click: () => this.goToCreateAccount() },
      }),
    };
    super(context, SignInTemplate);
  }

  public signIn($event: Event): void {
    $event.preventDefault();
    const isFormValid = [this.props.loginInput, this.props.passwordInput]
      .map((input) => input.checkValidation())
      .every((isValid) => isValid);

    if (!isFormValid) {
      return;
    }

    AuthController.signIn({
      login: this.props.loginInput.getInputValue(),
      password: this.props.passwordInput.getInputValue(),
    }).then(() => router.go(RouterPaths.MESSENGER))
      .catch((err) => this.showErrorMessage(err));
  }

  public goToCreateAccount() {
    router.go(RouterPaths.SIGN_UP);
  }

  private showErrorMessage(message: string): void {
    const errorBlock = this.element.querySelector('.sign-in-form__error');
    if (errorBlock) {
      errorBlock.classList.add('show');
      errorBlock.textContent = message;
    }
  }
}
