import '../static/styles.scss';
import Templator from './utils/templator/templator';
import { ErrorPage } from './pages/error';
import { LoginPage } from './pages/login';
import { ProfilePage } from './pages/profile';
import { MessengerPage } from './pages/messenger';

const extractPageFromUrl = () => {
    const pages = {
        sign_in: LoginPage({ type: 'signIn' }),
        sign_up: LoginPage({ type: 'signUp' }),
        profile: ProfilePage({ type: 'profile' }),
        messenger: MessengerPage(),
        edit_profile: ProfilePage({ type: 'editProfile' }),
        change_password: ProfilePage({ type: 'changePassword' }),
        error: ErrorPage({ type: '500' }),
        not_found: ErrorPage({ type: '404' })
    }
    const path = window.location.pathname.slice(1);

    return path === ''
        ? pages.sign_in
        : pages[path] || pages['not_found'];
}

const initApplication = () => {
    // compile template
    const template = new Templator(extractPageFromUrl());
    const templateForRender = template.compile();

    // render template
    const rootElement = document.getElementById('root');
    rootElement.innerHTML = templateForRender;
}

initApplication();