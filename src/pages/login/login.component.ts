import LoginTemplate from './login.template';
import FormField, { FormFieldProps } from '../../components/form-field/form-field.component';
import Button, { ButtonProps } from '../../components/button/button.component';
import Templator from '../../utils/templator/templator';
import Block from '../../../core/block';

export interface LoginPageProps {
  type: 'signIn' | 'signUp';
}

export default class LoginPage extends Block {
  private readonly template: string;
  private readonly header: string;

  private formArray: FormFieldProps[];
  private buttonsArray: ButtonProps[];

  public formTemplate: string;
  public buttonsTemplate: string;


  constructor(props: LoginPageProps) {
    super('div', props);
    this.template = LoginTemplate;
    this.header = props.type === 'signIn' ? 'Log in to your account' : 'Create an account';

    switch (props.type) {
      case 'signIn':
        this.formArray = [
          { labelText: 'Login', id: 'login', type: 'text', value: '' },
          { labelText: 'Password', id: 'password', type: 'password', value: '' },
        ];
        this.buttonsArray = [
          { label: 'Sign in', link: '/messenger', type: 'raised' },
          { label: 'Create account', link: '/sign_up', type: 'basic' },
        ];
        break;
      case 'signUp':
        this.formArray = [
          { labelText: 'Email', id: 'email', type: 'email', value: '' },
          { labelText: 'Login', id: 'login', type: 'text', value: '' },
          { labelText: 'First Name', id: 'first_name', type: 'text', value: '' },
          { labelText: 'Second Name', id: 'second_name', type: 'text', value: '' },
          { labelText: 'Phone', id: 'phone', type: 'tel', value: '' },
          { labelText: 'Password', id: 'password', type: 'password', value: '' },
          { labelText: 'Confirm Password', id: 'confirmPassword', type: 'password', value: '' },
        ];
        this.buttonsArray = [
          { label: 'Create account', link: '/messenger', type: 'raised' },
          { label: 'Back to login', link: '/sign_in', type: 'basic' },
        ];
        break;
    }

    this.buttonsTemplate = this.buttonsArray.map(button => new Button(button).render()).join('');
    this.formTemplate = this.formArray.map(formField => new FormField(formField).render()).join('');
  }

  public render(): string {
    const templateWithContext = new Templator({
      template: this.template,
      context: { header: this.header, formTemplate: this.formTemplate, buttonsTemplate: this.buttonsTemplate }
    });
    return templateWithContext.compile();
  }

}
