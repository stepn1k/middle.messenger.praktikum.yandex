import '../static/styles.scss';
import ErrorPage from './pages/error';
import ProfilePage from './pages/profile';
import MessengerPage from './pages/messenger';
import SignInPage from './pages/sign-in';
import SignUpPage from './pages/sign-up';

const pages: { [key: string]: any } = {
  sign_in: () => new SignInPage(),
  sign_up: () => new SignUpPage(),
  profile: () => new ProfilePage({ type: 'profile' }),
  messenger: () => new MessengerPage(),
  edit_profile: () => new ProfilePage({ type: 'editProfile' }),
  change_password: () => new ProfilePage({ type: 'changePassword' }),
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
