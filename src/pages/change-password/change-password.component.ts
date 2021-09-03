import ChangePasswordPageTemplate from './change-password.template';
import Block from '../../../core/block';
import Button from '../../components/button';
import LineFormField from '../../components/line-form-field';

export interface ChangePasswordPageProps {
  oldPasswordInput: LineFormField;
  newPasswordInput: LineFormField;
  confirmPasswordInput: LineFormField;
  saveButton: Button;
  goBackButton: Button;
}

export default class ChangePasswordPage extends Block {
  constructor() {
    const context: ChangePasswordPageProps = {
      oldPasswordInput: new LineFormField({
        labelText: 'Old password', value: '', id: 'oldPassword', type: 'password',
      }),
      newPasswordInput: new LineFormField({
        labelText: 'New password', value: '', id: 'newPassword', type: 'password',
      }),
      confirmPasswordInput: new LineFormField({
        labelText: 'Confirm New Password', value: '', id: 'confirmPassword', type: 'password',
      }),
      saveButton: new Button({ label: 'Save', link: '/profile', type: 'raised' }),
      goBackButton: new Button({ label: 'Go Back', link: '/profile', type: 'basic' }),
    };
    super(context, ChangePasswordPageTemplate);
  }
}
