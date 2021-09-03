import { ProfileEditTemplate, ProfileViewTemplate } from './profile.template';
import Block from '../../../core/block';
import LineFormField from '../../components/line-form-field';
import Button from '../../components/button';

export interface User {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  username: string;
  phone_number: string;
}

export enum ProfileModeEnum {
  EDIT = 'edit',
  VIEW = 'view',
}

export interface ProfilePageProps {
  emailInput: LineFormField;
  loginInput: LineFormField;
  firstNameInput: LineFormField;
  secondNameInput: LineFormField;
  usernameInput: LineFormField;
  phoneInput: LineFormField;
  editButton?: Button;
  changePasswordButton?: Button;
  logoutButton?: Button;
  goBackButton?: Button,
  saveButton?: Button;
}

export default class ProfilePage extends Block {
  constructor(user: User, mode = 'view') {
    const context: ProfilePageProps = {
      emailInput: new LineFormField({
        labelText: 'Email',
        value: user.email,
        id: 'email',
        type: 'email',
        disabled: mode === ProfileModeEnum.VIEW,
      }),
      loginInput: new LineFormField({
        labelText: 'Login', value: user.login, id: 'login', type: 'text', disabled: mode === ProfileModeEnum.VIEW,
      }),
      firstNameInput: new LineFormField({
        labelText: 'First Name',
        value: user.first_name,
        id: 'first_name',
        type: 'text',
        disabled: mode === ProfileModeEnum.VIEW,
      }),
      secondNameInput: new LineFormField({
        labelText: 'Second Name',
        value: user.second_name,
        id: 'second_name',
        type: 'text',
        disabled: mode === ProfileModeEnum.VIEW,
      }),
      usernameInput: new LineFormField({
        labelText: 'Username',
        value: user.username,
        id: 'display_name',
        type: 'text',
        disabled: mode === ProfileModeEnum.VIEW,
      }),
      phoneInput: new LineFormField({
        labelText: 'Phone', value: user.phone_number, id: 'phone', type: 'tel', disabled: mode === ProfileModeEnum.VIEW,
      }),
    };
    // buttons
    if (mode === ProfileModeEnum.VIEW) {
      context.editButton = new Button({ label: 'Edit', link: '/edit_profile', type: 'basic' });
      context.changePasswordButton = new Button({ label: 'Change Password', link: '/change_password', type: 'basic' });
      context.logoutButton = new Button({
        label: 'Logout', link: '/sign_in', type: 'basic', color: 'red',
      });
    } else {
      context.saveButton = new Button({ label: 'Save', link: '/profile', type: 'raised' });
      context.goBackButton = new Button({ label: 'Go Back', link: '/profile', type: 'basic' });
    }
    super(
      { ...context, header: user.first_name },
      mode === ProfileModeEnum.VIEW ? ProfileViewTemplate : ProfileEditTemplate,
    );
  }
}
