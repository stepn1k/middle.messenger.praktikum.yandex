import '../static/styles.scss';
import Templator from './utils/templator/templator';
import { ErrorPage } from './pages/error';
import { SignInPage } from './pages/sign-in';
import { ProfilePage } from './pages/profile';
import { MessengerPage } from './pages/messenger';

const extractPageFromUrl = () => {
    const pages = {
        sign_in: SignInPage(),
        profile: ProfilePage({ type: 'profile' }),
        messenger: MessengerPage(),
        edit_profile: ProfilePage({type: 'editProfile'}),
        change_password: ProfilePage({ type: 'changePassword' }),
        error: ErrorPage({ type: '500' }),
        not_found: ErrorPage({ type: '404' })
    }
    const path = window.location.pathname.slice(1);
    return pages[path] || pages['not_found'];
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