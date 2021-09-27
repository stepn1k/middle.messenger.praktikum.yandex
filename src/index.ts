import '../static/styles.scss';
import SignInPage from './pages/sign-in';
import SignUpPage from './pages/sign-up';
import ProfilePage from './pages/profile';
import Router from './utils/router/router';
import { ProfileModeEnum } from './pages/profile/profile.component';
import ErrorPage from './pages/error';
import MessengerPage from './pages/messenger';
import ChangePasswordPage from './pages/change-password';
import authController from './controllers/auth.controller';

export const router = new Router('pages');

router.use('/', () => new SignInPage())
  .use('/messenger', () => new MessengerPage())
  .use('/sign-up', () => new SignUpPage())
  .use('/profile', () => new ProfilePage({ mode: ProfileModeEnum.VIEW }))
  .use('/settings', () => new ProfilePage({ mode: ProfileModeEnum.EDIT }))
  .use('/change-password', () => new ChangePasswordPage())
  .use('/error', () => new ErrorPage({ type: '500' }))
  .useNotFound('/not-found', () => new ErrorPage({ type: '404' }))
  .start();

authController.checkUserAuthState();
