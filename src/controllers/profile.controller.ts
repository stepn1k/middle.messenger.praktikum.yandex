import { ChangePasswordRequestBody } from '../api/users/users-api.models';
import UsersApiService from '../api/users/users-api.service';

class ProfileController {
  private static profileControllerInstance: ProfileController;

  constructor() {
    if (ProfileController.profileControllerInstance) {
      return ProfileController.profileControllerInstance;
    }
    ProfileController.profileControllerInstance = this;
  }

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
}

const profileController = new ProfileController();

export default profileController;
