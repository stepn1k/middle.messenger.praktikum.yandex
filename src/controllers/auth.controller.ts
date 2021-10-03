import AuthApiService from '../api/auth/auth-api.service';
import { SignInBodyRequest, SignUpBodyRequest } from '../api/auth/auth-api.models';
import store from '../store/store';
import { User } from '../store/store.models';
import { router } from '../index';
import { RouterPaths } from '../utils/router/router-paths.enum';

class AuthController {
  private static authControllerInstance: AuthController;

  constructor() {
    if (AuthController.authControllerInstance) {
      return AuthController.authControllerInstance;
    }
    AuthController.authControllerInstance = this;
  }

  private setCurrentUser(user: User) {
    store.setCurrentUser(user);
  }

  public getCurrentUser(): User {
    return store.getCurrentUser();
  }

  public signIn(user: SignInBodyRequest) {
    return new Promise((resolve, reject) => {
      AuthApiService.signIn(user).then((signInResponse) => {
        if (signInResponse.status === 200) {
          this.getUserInfo(resolve);
        } else {
          this.setCurrentUser(null);
          const errorMessage = JSON.parse(signInResponse.response).reason;
          reject(errorMessage);
        }
      });
    });
  }

  public signUp(user: SignUpBodyRequest) {
    return new Promise((resolve, reject) => {
      AuthApiService.signUp(user).then((signUpResponse) => {
        if (signUpResponse.status === 200) {
          this.getUserInfo(resolve);
        } else {
          this.setCurrentUser(null);
          const errorMessage = JSON.parse(signUpResponse.response).reason;
          reject(errorMessage);
        }
      });
    });
  }

  private getUserInfo(resolveFn: Function) {
    AuthApiService.getUser().then(({ response }) => {
      const user = JSON.parse(response);
      if (user.id) {
        store.setActiveChat(null);
        this.setCurrentUser(user);
        resolveFn(user);
      } else {
        this.setCurrentUser(null);
        resolveFn('Something went wrong.');
      }
    });
  }

  public logout() {
    return new Promise((resolve) => {
      AuthApiService.logout().then(() => {
        resolve(true);
      });
    });
  }

  public checkUserAuthState() {
    const currentPath = router.getCurrentPath();
    AuthApiService.getUser().then(({ response }) => {
      const user = JSON.parse(response);
      if (user.id) {
        this.setCurrentUser(user);
        if (currentPath === RouterPaths.SIGN_IN) {
          router.go(RouterPaths.MESSENGER);
        }
      } else {
        this.setCurrentUser(null);
        if (currentPath !== RouterPaths.SIGN_UP) {
          router.go(RouterPaths.SIGN_IN);
        }
      }
    });
  }
}

const authController = new AuthController();

export default authController;
