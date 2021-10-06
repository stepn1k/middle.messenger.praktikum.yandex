import HttpClient from '../../utils/api/httpClient';
import { SignInBodyRequest } from './auth-api.models';

const httpClient = new HttpClient('/auth');

export default class AuthApiService {
  static signUp(data: SignInBodyRequest): Promise<XMLHttpRequest> {
    return httpClient.post('/signup', { data, withCredentials: true, headers: { 'content-type': 'application/json' } });
  }

  static signIn(data: SignInBodyRequest): Promise<XMLHttpRequest> {
    return httpClient.post('/signin', { data, withCredentials: true, headers: { 'content-type': 'application/json' } });
  }

  static getUser(): Promise<XMLHttpRequest> {
    return httpClient.get('/user', { withCredentials: true });
  }

  static logout(): Promise<XMLHttpRequest> {
    return httpClient.post('/logout', { withCredentials: true, headers: { 'content-type': 'application/json' } });
  }
}
