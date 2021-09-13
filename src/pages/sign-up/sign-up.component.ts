import SignUpTemplate from './sign-up.template';
import FormField from '../../components/form-field/form-field.component';
import Block from '../../../core/block';
import Button from '../../components/button';
import {
  EmailValidator,
  LoginValidator,
  NameValidator,
  PasswordValidator,
  PhoneValidator,
} from '../../utils/validators/validators';

export interface SignUpPageContext {
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
  private readonly signUpForm: Record<string, FormField>;

  constructor() {
    const context: SignUpPageContext = {
      emailInput: new FormField({
        labelText: 'Email',
        id: 'email',
        type: 'email',
        value: '',
        viewType: 'basic',
        validator: EmailValidator,
      }),
      loginInput: new FormField({
        labelText: 'Login',
        id: 'login',
        type: 'text',
        value: '',
        viewType: 'basic',
        validator: LoginValidator,
      }),
      firstNameInput: new FormField({
        labelText: 'First Name',
        id: 'first_name',
        type: 'text',
        value: '',
        viewType: 'basic',
        validator: NameValidator,
      }),
      secondNameInput: new FormField({
        labelText: 'Second Name',
        id: 'second_name',
        type: 'text',
        value: '',
        viewType: 'basic',
        validator: NameValidator,
      }),
      phoneInput: new FormField({
        labelText: 'Phone',
        id: 'phone',
        type: 'tel',
        value: '',
        viewType: 'basic',
        validator: PhoneValidator,
      }),
      passwordInput: new FormField({
        labelText: 'Password',
        id: 'password',
        type: 'password',
        value: '',
        viewType: 'basic',
        validator: PasswordValidator,
      }),
      confirmPasswordInput: new FormField({
        labelText: 'Confirm Password',
        id: 'confirmPassword',
        type: 'password',
        value: '',
        viewType: 'basic',
        validator: PasswordValidator,
      }),
      createButton: new Button({
        label: 'Create account',
        link: '/messenger',
        viewType: 'raised',
        events: { click: ($event) => this.createAccount($event) },
      }),
      backButton: new Button({ label: 'Back to login', link: '/sign_in', viewType: 'basic' }),
    };
    super(context, SignUpTemplate);
    this.signUpForm = {
      email: context.emailInput,
      login: context.loginInput,
      first_name: context.firstNameInput,
      second_name: context.secondNameInput,
      phone: context.phoneInput,
      password: context.passwordInput,
      confirmPassword: context.confirmPasswordInput,
    };
  }

  public createAccount($event: Event): void {
    $event.preventDefault();
    const isFormValid = Object.keys(this.signUpForm)
      .map((inputKey) => this.signUpForm[inputKey].checkValidation())
      .every((isValid) => isValid);

    if (!isFormValid) {
      return;
    }

    const formValue = this.getFormObject(this.signUpForm);

    if (formValue.confirmPassword !== formValue.password) {
      this.signUpForm.confirmPassword.addClass('invalid');
      this.signUpForm.confirmPassword.setErrorMessage('Passwords don\'t match');
      return;
    }

    console.log(formValue);
  }

  private getFormObject(form: Record<string, FormField>): Record<string, any> {
    const formValue: any = {};
    Object.keys(form).forEach((key) => {
      formValue[key] = form[key].getInputValue();
    });
    return formValue;
  }
}
