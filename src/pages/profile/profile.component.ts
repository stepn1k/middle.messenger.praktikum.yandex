import ProfilePageTemplate from './profile.template';
import { FormFieldProps } from '../../components/form-field/form-field.component';
import { ButtonProps } from '../../components/button/button.component';
import Templator from '../../utils/templator/templator';
import Button from '../../components/button';
import LineFormField from '../../components/line-form-field';
import Divider from '../../components/divider';
import Block from '../../../core/block';

export interface ProfilePageProps {
  type: 'profile' | 'editProfile' | 'changePassword';
}

export default class ProfilePage extends Block {
  private readonly header: string;
  private readonly template: string;

  private readonly pageType: 'profile' | 'editProfile' | 'changePassword';

  private formArray: FormFieldProps[];
  private buttonsArray: ButtonProps[];

  private user = {
    email: 'example@yandex.by',
    login: 'exampleLogin',
    first_name: 'Stepan',
    second_name: 'Kalutsky',
    username: 'Stepan K.',
    phone_number: '+37529999999',
  };

  public formTemplate: string;
  public buttonsTemplate: string;

  constructor(props: ProfilePageProps) {
    super('div', props);
    this.header = props.type === 'changePassword' ? 'Change your password' : this.user.first_name;
    this.pageType = props.type;
    this.template = ProfilePageTemplate;
    switch (props.type) {
      // Profile Page
      case 'profile':
        this.formArray = [
          { labelText: 'Email', value: this.user.email, id: 'email', type: 'email' },
          { labelText: 'Login', value: this.user.login, id: 'login', type: 'text' },
          { labelText: 'First Name', value: this.user.first_name, id: 'first_name', type: 'text' },
          { labelText: 'Second Name', value: this.user.second_name, id: 'second_name', type: 'text' },
          { labelText: 'Username', value: this.user.username, id: 'display_name', type: 'text' },
          { labelText: 'Phone', value: this.user.phone_number, id: 'phone', type: 'tel' },
        ];
        this.buttonsArray = [
          { label: 'Edit', link: '/edit_profile', type: 'basic' },
          { label: 'Change Password', link: '/change_password', type: 'basic' },
          { label: 'Logout', link: '/sign_in', type: 'basic', color: 'red' },
        ];
        break;
      // Change Password Page
      case 'changePassword':
        this.formArray = [
          { labelText: 'Old password', value: '', id: 'oldPassword', type: 'password' },
          { labelText: 'New password', value: '', id: 'newPassword', type: 'password' },
          { labelText: 'Confirm New Password', value: '', id: 'confirmPassword', type: 'password' },
        ];
        this.buttonsArray = [
          { label: 'Save', link: '/profile', type: 'raised' },
          { label: 'Go Back', link: '/profile', type: 'basic' },
        ];
        break;
      // Edit Profile Page
      case 'editProfile':
        this.formArray = [
          { labelText: 'Email', value: this.user.email, id: 'email', type: 'email' },
          { labelText: 'Login', value: this.user.login, id: 'login', type: 'text' },
          { labelText: 'First Name', value: this.user.first_name, id: 'first_name', type: 'text' },
          { labelText: 'Second Name', value: this.user.second_name, id: 'second_name', type: 'text' },
          { labelText: 'Username', value: this.user.username, id: 'display_name', type: 'text' },
          { labelText: 'Phone', value: this.user.phone_number, id: 'phone', type: 'tel' },
        ];
        this.buttonsArray = [
          { label: 'Save', link: '/profile', type: 'raised' },
          { label: 'Go Back', link: '/profile', type: 'basic' },
        ];
        break;
    }

    this.formTemplate = this.formArray
      .map(formField => new LineFormField(formField).render() + new Divider().render()).join('');

    this.buttonsTemplate = this.buttonsArray
      .map((button) => new Button(button).render() + new Divider().render()).join('');
  }

  init() {
    console.log('init', 'profile page');
  }

  componentDidMount() {
    console.log('mount', 'profile page');
  }

  componentDidUpdate() {
    console.log('update');
  }

  public render(): string {
    console.log('render profile page');
    const templateWithContext = new Templator({
      template: this.template,
      context: {
        formTemplate: this.formTemplate,
        buttonsTemplate: this.buttonsTemplate,
        header: this.header,
        type: this.pageType
      }
    });
    return templateWithContext.compile();
  }

}
