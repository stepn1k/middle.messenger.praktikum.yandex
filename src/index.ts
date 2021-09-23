/* eslint import/prefer-default-export: 0 */
import '../static/styles.scss';
import SignInPage from './pages/sign-in';
import SignUpPage from './pages/sign-up';
import ProfilePage from './pages/profile';

import Router from './utils/router/router';
import { User } from './models/user.interface';
import { ProfileModeEnum } from './pages/profile/profile.component';
import ErrorPage from './pages/error';
import MessengerPage from './pages/messenger';

// temporary object
const currentUser: User = {
  email: 'example@yandex.by',
  login: 'exampleLogin',
  first_name: 'Stepan',
  second_name: 'Kalutsky',
  username: 'Stepan K.',
  phone_number: '+37529999999',
};

export const router = new Router('pages');

router.use('/', new SignInPage())
  .use('/messenger', new MessengerPage())
  .use('/sign-up', new SignUpPage())
  .use('/profile', new ProfilePage({ user: currentUser, mode: ProfileModeEnum.VIEW }))
  .use('/settings', new ProfilePage({ user: currentUser, mode: ProfileModeEnum.EDIT }))
  .use('/change-password', new ErrorPage({ type: '404' }))
  .use('/error', new ErrorPage({ type: '500' }))
  .useNotFound('/not-found', new ErrorPage({ type: '404' }))
  .start();
