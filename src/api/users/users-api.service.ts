import HttpClient from '../../utils/api/httpClient';
import ApiSettings from '../api.settings';
import { ChangePasswordRequestBody, ChangeUserDataRequestBody } from './users-api.models';

const httpClient = new HttpClient(`${ApiSettings.baseUrl}/user`);

export default class UsersApiService {
  static changePassword(data: ChangePasswordRequestBody): Promise<XMLHttpRequest> {
    return httpClient.put('/password',
      { data, withCredentials: true, headers: { 'content-type': 'application/json' } });
  }

  static changeUserProfileData(data: ChangeUserDataRequestBody): Promise<XMLHttpRequest> {
    return httpClient.put('/profile',
      { data, withCredentials: true, headers: { 'content-type': 'application/json' } });
  }

  static changeUserAvatar(data: FormData): Promise<XMLHttpRequest> {
    return httpClient.put('/profile/avatar', { data, withCredentials: true });
  }
}
