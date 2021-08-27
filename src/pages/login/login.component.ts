import LoginTemplate from './login.template';
import ButtonComponent from '../../components/button';
import FormFieldComponent from '../../components/form-field';
import { ComponentInterface } from '../../models/component.interface';

let formArray: string[];
let buttons: string[];

export default (props: { type: 'signIn' | 'signUp' }): ComponentInterface => {
  const header = props.type === 'signIn' ? 'Log in to your account' : 'Create an account';

  switch (props.type) {
    case 'signIn':
      formArray = [
        '{ labelText: \'Login\', id: \'login\', type: \'text\' }',
        '{ labelText: \'Password\', id: \'password\', type: \'password\' }',
      ];
      buttons = [
        '{ label: \'Sign in\', link: \'/messenger\', type: \'raised\' }',
        '{ label: \'Create account\', link: \'/sign_up\', type: \'basic\' }',
      ];
      break;
    case 'signUp':
      formArray = [
        '{ labelText: \'Email\', id: \'email\', type: \'email\' }',
        '{ labelText: \'Login\', id: \'login\', type: \'text\' }',
        '{ labelText: \'First Name\', id: \'first_name\', type: \'text\' }',
        '{ labelText: \'Second Name\', id: \'second_name\', type: \'text\' }',
        '{ labelText: \'Phone\', id: \'phone\', type: \'tel\' }',
        '{ labelText: \'Password\', id: \'password\', type: \'password\' }',
        '{ labelText: \'Confirm Password\', id: \'confirmPassword\', type: \'password\' }',
      ];
      buttons = [
        '{ label: \'Create account\', link: \'/messenger\', type: \'raised\' }',
        '{ label: \'Back to login\', link: \'/sign_in\', type: \'basic\' }',
      ];
      break;
    default:
      formArray = [];
      buttons = [];
  }

  return {
    template: LoginTemplate,
    context: {
      ...props, header, buttons, formArray,
    },
    declaredComponents: [FormFieldComponent, ButtonComponent],
  };
};
