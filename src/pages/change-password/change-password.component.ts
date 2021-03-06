import ChangePasswordPageTemplate from './change-password.template';
import Block from '../../utils/block/block';
import Button from '../../components/button';
import { PasswordValidator } from '../../utils/validators/validators';
import FormField from '../../components/form-field';
import { router } from '../../index';
import BackAside from '../../components/back-aside';
import profileController from '../../controllers/profile.controller';
import { RouterPaths } from '../../utils/router/router-paths.enum';

export interface ChangePasswordPageContext {
  // aside
  backAside: BackAside

  oldPasswordInput: FormField;
  newPasswordInput: FormField;
  confirmPasswordInput: FormField;
  saveButton: Button;
  goBackButton: Button;
}

export default class ChangePasswordPage extends Block {
  constructor() {
    const context: ChangePasswordPageContext = {
      backAside: new BackAside({ pathToClick: RouterPaths.PROFILE }),
      oldPasswordInput: new FormField({
        labelText: 'Old password',
        value: '',
        id: 'oldPassword',
        type: 'password',
        viewType: 'line',
        placeholder: 'Old password...',
        validator: PasswordValidator,
      }),
      newPasswordInput: new FormField({
        labelText: 'New password',
        value: '',
        id: 'newPassword',
        type: 'password',
        viewType: 'line',
        placeholder: 'New Password...',
        validator: PasswordValidator,
      }),
      confirmPasswordInput: new FormField({
        labelText: 'Confirm New Password',
        value: '',
        id: 'confirmPassword',
        type: 'password',
        viewType: 'line',
        placeholder: 'Confirm New Password...',
        validator: PasswordValidator,
      }),
      saveButton: new Button({
        label: 'Save',
        viewType: 'raised',
        events: { click: ($event) => this.saveNewPassword($event) },
      }),
      goBackButton: new Button({
        label: 'Go Back',
        events: { click: () => router.go('/profile') },
        viewType: 'basic',
      }),
    };
    super(context, ChangePasswordPageTemplate);
  }

  private showInfoMessage(message: string, isSuccess = false): void {
    const messageBlock = this.element.querySelector('.profile-form-table__info-message');
    if (messageBlock) {
      messageBlock.classList.add('visible');
      messageBlock.textContent = message;
    }

    if (isSuccess) {
      messageBlock.classList.add('success');
    }
  }

  private saveNewPassword($event: Event): void {
    $event.preventDefault();
    const isFormValid = [
      this.props.oldPasswordInput,
      this.props.newPasswordInput,
      this.props.confirmPasswordInput]
      .map((input) => input.checkValidation())
      .every((isValid) => isValid);

    if (!isFormValid) {
      return;
    }

    const newValue = this.props.newPasswordInput.getInputValue();
    const confirmValue = this.props.confirmPasswordInput.getInputValue();

    if (newValue !== confirmValue) {
      this.showInfoMessage('Password don\'t match.');
      return;
    }

    profileController.changePassword({
      newPassword: this.props.newPasswordInput.getInputValue(),
      oldPassword: this.props.oldPasswordInput.getInputValue(),
    }).then(() => {
      this.showInfoMessage('The password change was successful.', true);
      setTimeout(() => router.go(RouterPaths.PROFILE), 1500);
    }).catch((err) => this.showInfoMessage(err));
  }
}
