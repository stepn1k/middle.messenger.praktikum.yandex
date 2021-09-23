import ChangePasswordPageTemplate from './change-password.template';
import Block from '../../../core/block';
import Button from '../../components/button';
import { PasswordValidator } from '../../utils/validators/validators';
import FormField from '../../components/form-field';
import { router } from '../../index';
import BackAside from '../../components/back-aside';

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
  private oldPasswordInput: FormField;

  private newPasswordInput: FormField;

  private confirmPasswordInput: FormField;

  constructor() {
    const context: ChangePasswordPageContext = {
      backAside: new BackAside(),
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
    this.oldPasswordInput = context.oldPasswordInput;
    this.newPasswordInput = context.newPasswordInput;
    this.confirmPasswordInput = context.confirmPasswordInput;
  }

  public setErrorMessage(message: string): void {
    const errorBlock = document.getElementById('change-password-form-error');
    errorBlock.classList.add('visible');
    errorBlock.textContent = message;
  }

  public clearErrorMessage(): void {
    const errorBlock = document.getElementById('change-password-form-error');
    errorBlock.classList.remove('visible');
  }

  public saveNewPassword($event: Event): void {
    $event.preventDefault();
    const isFormValid = [this.oldPasswordInput, this.newPasswordInput, this.confirmPasswordInput]
      .map((input) => input.checkValidation())
      .every((isValid) => isValid);

    if (!isFormValid) {
      return;
    }

    const newValue = this.newPasswordInput.getInputValue();
    const confirmValue = this.confirmPasswordInput.getInputValue();

    if (newValue !== confirmValue) {
      this.setErrorMessage('Password don\'t match.');
      return;
    }

    this.clearErrorMessage();

    console.log({
      newValue: this.newPasswordInput.getInputValue(),
      oldValue: this.oldPasswordInput.getInputValue(),
    });

    router.go('/profile');
  }
}
