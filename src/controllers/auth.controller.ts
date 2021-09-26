import AuthApiService from '../api/auth/auth-api.service';
import { SignInBodyRequest, SignUpBodyRequest } from '../api/auth/auth-api.models';
import store from '../store/store';
import { AuthState } from '../store/store.models';
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

  private setAuthState(state: AuthState) {
    store.setAuthState(state);
  }

  public getAuthState(): AuthState {
    return store.getAuthState();
  }

  public signIn(user: SignInBodyRequest) {
    return new Promise((resolve, reject) => {
      AuthApiService.signIn(user).then((signInResponse) => {
        if (signInResponse.status === 200) {
          this.getUserInfo(resolve);
        } else {
          this.setAuthState({ user: null });
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
          this.setAuthState({ user: null });
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
        this.setAuthState({ user });
        resolveFn(user);
      } else {
        this.setAuthState({ user: null });
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
        this.setAuthState({ user });
        if (currentPath === RouterPaths.SIGN_IN) {
          router.go(RouterPaths.MESSENGER);
        }
      } else {
        this.setAuthState({ user: null });
        if (currentPath !== RouterPaths.SIGN_UP) {
          router.go(RouterPaths.SIGN_IN);
        }
      }
    });
  }
}

const authController = new AuthController();

export default authController;
