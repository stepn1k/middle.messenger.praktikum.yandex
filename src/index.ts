import '../static/styles.scss';
import ErrorPage from './pages/error';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import MessengerPage from './pages/messenger';

const pages: { [key: string]: any } = {
  sign_in: () => new LoginPage({ type: 'signIn' }),
  sign_up: () => new LoginPage({ type: 'signUp' }),
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
  setTimeout(() => template.setProps({type: 'changePassword'}), 3000);
  //console.log(template.render());
  const templateForRender = template.render();

  // render template
  const rootElement = document.getElementById('root');
  rootElement.innerHTML = templateForRender;
};

initApplication();
