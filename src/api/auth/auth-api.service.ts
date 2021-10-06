import HttpClient from '../../utils/api/httpClient';
import { SignInBodyRequest } from './auth-api.models';

const httpClient = new HttpClient('/auth');

export default class AuthApiService {
  static signUp(data: SignInBodyRequest): Promise<XMLHttpRequest> {
    return httpClient.post('/signup', { data });
  }

  static signIn(data: SignInBodyRequest): Promise<XMLHttpRequest> {
    return httpClient.post('/signin', { data });
  }

  static getUser(): Promise<XMLHttpRequest> {
    return httpClient.get('/user');
  }

  static logout(): Promise<XMLHttpRequest> {
    return httpClient.post('/logout');
  }
}
