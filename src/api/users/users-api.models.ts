export interface ChangePasswordRequestBody {
  oldPassword: string;
  newPassword: string;
}

export interface ChangeUserDataRequestBody {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}
