import { ProfileEditTemplate, ProfileViewTemplate } from './profile.template';
import Block from '../../../core/block';
import Button from '../../components/button';
import {
  EmailValidator,
  LoginValidator,
  NameValidator,
  NotEmptyValidator,
  PhoneValidator,
} from '../../utils/validators/validators';
import FormField from '../../components/form-field';
import { User } from '../../models/user.interface';

export enum ProfileModeEnum {
  EDIT = 'edit',
  VIEW = 'view',
}

export interface ProfilePageProps {
  user: User;
  mode?: ProfileModeEnum;
}

export interface ProfilePageContext {
  emailInput: FormField;
  loginInput: FormField;
  firstNameInput: FormField;
  secondNameInput: FormField;
  usernameInput: FormField;
  phoneInput: FormField;
  // view
  editButton?: Button;
  changePasswordButton?: Button;
  logoutButton?: Button;
  // edit
  goBackButton?: Button,
  saveButton?: Button;
}

export default class ProfilePage extends Block {
  private readonly editableForm: { [key: string]: FormField };

  private readonly defaultForm: { [key: string]: string | number };

  constructor({ user, mode }: ProfilePageProps) {
    const isViewMode = mode === ProfileModeEnum.VIEW;
    const context: ProfilePageContext = {
      emailInput: new FormField({
        labelText: 'Email',
        value: user.email,
        id: 'email',
        type: 'email',
        viewType: 'line',
        disabled: isViewMode,
        validator: EmailValidator,
      }),
      loginInput: new FormField({
        labelText: 'Login',
        value: user.login,
        id: 'login',
        type: 'text',
        viewType: 'line',
        disabled: isViewMode,
        validator: LoginValidator,
      }),
      firstNameInput: new FormField({
        labelText: 'First Name',
        value: user.first_name,
        id: 'first_name',
        type: 'text',
        viewType: 'line',
        disabled: isViewMode,
        validator: NameValidator,
      }),
      secondNameInput: new FormField({
        labelText: 'Second Name',
        value: user.second_name,
        id: 'second_name',
        type: 'text',
        viewType: 'line',
        disabled: isViewMode,
        validator: NameValidator,
      }),
      usernameInput: new FormField({
        labelText: 'Username',
        value: user.username,
        id: 'display_name',
        type: 'text',
        viewType: 'line',
        disabled: isViewMode,
        validator: NotEmptyValidator,
      }),
      phoneInput: new FormField({
        labelText: 'Phone',
        value: user.phone_number,
        id: 'phone',
        type: 'tel',
        viewType: 'line',
        disabled: isViewMode,
        validator: PhoneValidator,
      }),
    };
    // buttons
    if (mode === ProfileModeEnum.VIEW) {
      context.editButton = new Button({ label: 'Edit', link: '/edit_profile', viewType: 'basic' });
      context.changePasswordButton = new Button({
        label: 'Change Password',
        link: '/change_password',
        viewType: 'basic',
      });
      context.logoutButton = new Button({
        label: 'Logout', link: '/sign_in', viewType: 'basic', color: 'red',
      });
    } else {
      context.saveButton = new Button({
        label: 'Save',
        link: '/profile',
        viewType: 'raised',
        events: { click: ($event) => this.saveForm($event) },
      });
      context.goBackButton = new Button({ label: 'Go Back', link: '/profile', viewType: 'basic' });
    }
    super(
      { ...context, header: user.first_name },
      isViewMode? ProfileViewTemplate : ProfileEditTemplate,
    );
    this.editableForm = {
      email: context.emailInput,
      login: context.loginInput,
      first_name: context.firstNameInput,
      second_name: context.secondNameInput,
      username: context.usernameInput,
      phone: context.phoneInput,
    };
    this.defaultForm = this.getFormObject(this.editableForm);
  }

  public saveForm($event: Event): void {
    $event.preventDefault();
    const isFormValid = Object.keys(this.editableForm)
      .map((inputKey) => this.editableForm[inputKey].checkValidation())
      .every((isValid) => isValid);

    if (!isFormValid) {
      return;
    }

    const currentForm = this.getFormObject(this.editableForm);

    // if nothing to update
    if (JSON.stringify(this.defaultForm) === JSON.stringify(currentForm)) {
      return;
    }

    console.log(currentForm);
  }

  private getFormObject(form: Record<string, FormField>): Record<string, any> {
    const formValue: any = {};
    Object.keys(form).forEach((key) => {
      formValue[key] = form[key].getInputValue();
    });
    return formValue;
  }
}
