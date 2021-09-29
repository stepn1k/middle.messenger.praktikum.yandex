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
import ImageChooser from '../../components/image-chooser';
import FormField from '../../components/form-field';
import Avatar from '../../components/avatar';
import { router } from '../../index';
import BackAside from '../../components/back-aside';
import authController from '../../controllers/auth.controller';
import { RouterPaths } from '../../utils/router/router-paths.enum';
import store from '../../store/store';
import isEqual from '../../utils/methods/isEqual';
import profileController from '../../controllers/profile.controller';
import { ChangeUserDataRequestBody } from '../../api/users/users-api.models';

export enum ProfileModeEnum {
  EDIT = 'edit',
  VIEW = 'view',
}

export interface ProfilePageProps {
  mode?: ProfileModeEnum;
}

export interface ProfilePageContext {
  avatar: Avatar;
  // aside
  backAside: BackAside;
  // image chooser
  imageChooser: ImageChooser;
  // form
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

  private defaultForm: { [key: string]: string | number };

  private avatar: Avatar;

  constructor({ mode }: ProfilePageProps) {
    const isViewMode = mode === ProfileModeEnum.VIEW;
    const user = store.getCurrentUser();
    const context: ProfilePageContext = {
      avatar: new Avatar({
        clickable: !isViewMode,
        src: user?.avatar,
        events: { click: () => context.imageChooser.openChooser() },
      }),
      imageChooser: new ImageChooser(),
      backAside: new BackAside(
        { pathToClick: isViewMode ? RouterPaths.MESSENGER : RouterPaths.PROFILE },
      ),
      emailInput: new FormField({
        labelText: 'Email',
        value: user?.email,
        id: 'email',
        type: 'email',
        viewType: 'line',
        disabled: isViewMode,
        validator: EmailValidator,
      }),
      loginInput: new FormField({
        labelText: 'Login',
        value: user?.login,
        id: 'login',
        type: 'text',
        viewType: 'line',
        disabled: isViewMode,
        validator: LoginValidator,
      }),
      firstNameInput: new FormField({
        labelText: 'First Name',
        value: user?.first_name,
        id: 'first_name',
        type: 'text',
        viewType: 'line',
        disabled: isViewMode,
        validator: NameValidator,
      }),
      secondNameInput: new FormField({
        labelText: 'Second Name',
        value: user?.second_name,
        id: 'second_name',
        type: 'text',
        viewType: 'line',
        disabled: isViewMode,
        validator: NameValidator,
      }),
      usernameInput: new FormField({
        labelText: 'Username',
        value: user?.display_name || 'No username yet...',
        id: 'display_name',
        type: 'text',
        viewType: 'line',
        disabled: isViewMode,
        validator: NotEmptyValidator,
      }),
      phoneInput: new FormField({
        labelText: 'Phone',
        value: user?.phone,
        id: 'phone',
        type: 'tel',
        viewType: 'line',
        disabled: isViewMode,
        validator: PhoneValidator,
      }),
    };
    // buttons
    if (mode === ProfileModeEnum.VIEW) {
      context.editButton = new Button({
        label: 'Edit',
        viewType: 'basic',
        events: { click: () => router.go(RouterPaths.SETTINGS) },
      });
      context.changePasswordButton = new Button({
        label: 'Change Password',
        viewType: 'basic',
        events: { click: () => router.go(RouterPaths.CHANGE_PASSWORD) },
      });
      context.logoutButton = new Button({
        label: 'Logout',
        viewType: 'basic',
        color: 'red',
        events: { click: () => this.logout() },
      });
    } else {
      context.saveButton = new Button({
        label: 'Save',
        viewType: 'raised',
        events: { click: ($event) => this.saveForm($event) },
      });
      context.goBackButton = new Button({
        label: 'Go Back',
        viewType: 'basic',
        events: { click: () => router.go(RouterPaths.PROFILE) },
      });
    }
    super(
      { ...context, user, mode },
      isViewMode ? ProfileViewTemplate : ProfileEditTemplate,
    );
    this.avatar = context.avatar;
    this.editableForm = {
      email: context.emailInput,
      login: context.loginInput,
      first_name: context.firstNameInput,
      second_name: context.secondNameInput,
      display_name: context.usernameInput,
      phone: context.phoneInput,
    };
    this.defaultForm = this.getFormObject(this.editableForm);
  }

  private logout(): void {
    authController.logout().then(() => router.go(RouterPaths.SIGN_IN));
  }

  public componentDidMount() {
    store.subscribe((state) => {
      const newUserInfo = state.user;
      if (newUserInfo && !isEqual(newUserInfo, this.props.user)) {
        this.editableForm.email.setProps({ value: newUserInfo.email });
        this.editableForm.login.setProps({ value: newUserInfo.login });
        this.editableForm.first_name.setProps({ value: newUserInfo.first_name });
        this.editableForm.second_name.setProps({ value: newUserInfo.second_name });
        this.editableForm.display_name.setProps({ value: newUserInfo.display_name || 'No username yet...' });
        this.editableForm.phone.setProps({ value: newUserInfo.phone });
        this.avatar.setProps({ src: newUserInfo.avatar });
        this.defaultForm = this.getFormObject(this.editableForm);
      }
    }, 'profile');
  }

  private saveForm($event: Event): void {
    $event.preventDefault();
    const isFormValid = Object.keys(this.editableForm)
      .map((inputKey) => this.editableForm[inputKey].checkValidation())
      .every((isValid) => isValid);

    if (!isFormValid) {
      return;
    }

    const currentForm = this.getFormObject(this.editableForm);

    if (isEqual(currentForm, this.defaultForm)) {
      this.showInfoMessage('Nothing changed');
      return;
    }

    profileController.changeProfileData(currentForm as ChangeUserDataRequestBody)
      .then(() => router.go(RouterPaths.PROFILE))
      .catch((err) => this.showInfoMessage(err));
  }

  private getFormObject(form: Record<string, FormField>): Record<string, any> {
    const formValue: any = {};
    Object.keys(form).forEach((key) => {
      formValue[key] = form[key].getInputValue();
    });
    return formValue;
  }

  private showInfoMessage(message: string): void {
    const messageBlock = this.element.querySelector('.profile-form__info-block');
    if (messageBlock) {
      messageBlock.classList.add('visible');
      messageBlock.textContent = message;
    }
  }
}
