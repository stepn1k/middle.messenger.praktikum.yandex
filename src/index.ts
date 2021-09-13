import '../static/styles.scss';
import ErrorPage from './pages/error';
import ProfilePage from './pages/profile';
import MessengerPage from './pages/messenger';
import SignInPage from './pages/sign-in';
import SignUpPage from './pages/sign-up';
import ChangePasswordPage from './pages/change-password';
import { ProfileModeEnum } from './pages/profile/profile.component';
import { User } from './models/user.interface';

// temporary object
const currentUser: User = {
  email: 'example@yandex.by',
  login: 'exampleLogin',
  first_name: 'Stepan',
  second_name: 'Kalutsky',
  username: 'Stepan K.',
  phone_number: '+37529999999',
};

const pages: { [key: string]: any } = {
  sign_in: () => new SignInPage(),
  sign_up: () => new SignUpPage(),
  profile: () => new ProfilePage({ user: currentUser, mode: ProfileModeEnum.VIEW }),
  edit_profile: () => new ProfilePage({ user: currentUser, mode: ProfileModeEnum.EDIT }),
  messenger: () => new MessengerPage(),
  change_password: () => new ChangePasswordPage(),
  error: () => new ErrorPage({ type: '500' }),
  not_found: () => new ErrorPage({ type: '404' }),
};

const extractPageFromUrl = () => {
  const path = window.location.pathname.slice(1);

  return (path === ''
    ? pages.sign_in
    : pages[path] || pages.not_found)();
};

const initApplication = () => {
  // compile template
  const template = extractPageFromUrl();
  const templateForRender = template.render();

  // render template
  const rootElement = document.getElementById('root');
  rootElement.appendChild(templateForRender);
};

initApplication();
