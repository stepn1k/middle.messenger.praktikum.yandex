import { ChangePasswordRequestBody, ChangeUserDataRequestBody } from '../api/users/users-api.models';
import UsersApiService from '../api/users/users-api.service';
import store from '../store/store';

class ProfileController {
  public changePassword(body: ChangePasswordRequestBody) {
    return new Promise((resolve, reject) => {
      UsersApiService.changePassword(body).then((changePasswordResponse) => {
        if (changePasswordResponse.status === 200) {
          resolve('OK');
        } else {
          const response = JSON.parse(changePasswordResponse.response);
          reject(response.reason);
        }
      });
    });
  }

  public changeUserAvatar(body: FormData) {
    return new Promise((resolve, reject) => {
      UsersApiService.changeUserAvatar(body)
        .then((res) => this.changeUserDataHandler(res, resolve, reject))
        .catch(() => reject('Something went wrong. Please try again later or choose another format.'));
    });
  }

  public changeProfileData(body: ChangeUserDataRequestBody) {
    return new Promise((resolve, reject) => {
      UsersApiService.changeUserProfileData(body)
        .then((res) => this.changeUserDataHandler(res, resolve, reject));
    });
  }

  private changeUserDataHandler(xmlRequest: XMLHttpRequest, resolveFn: any, rejectFn: any) {
    const response = JSON.parse(xmlRequest.response);
    if (xmlRequest.status === 200) {
      store.setCurrentUser(response);
      resolveFn('OK');
    } else {
      rejectFn(response.reason);
    }
  }
}

const profileController = new ProfileController();

export default profileController;
