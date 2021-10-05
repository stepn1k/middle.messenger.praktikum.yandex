import HttpClient from '../../utils/api/httpClient';
import { ChangePasswordRequestBody, ChangeUserDataRequestBody, SearchUserByLoginRequestBody } from './users-api.models';

const httpClient = new HttpClient(`/user`);

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

  static searchUserByLogin(data: SearchUserByLoginRequestBody): Promise<XMLHttpRequest> {
    return httpClient.post('/search', { data, withCredentials: true, headers: { 'content-type': 'application/json' } });
  }
}
