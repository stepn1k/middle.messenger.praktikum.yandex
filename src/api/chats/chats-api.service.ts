import HttpClient from '../../utils/api/httpClient';
import ApiSettings from '../api.settings';

const httpClient = new HttpClient(`${ApiSettings.baseUrl}/chats`);

export default class ChatsApiService {
  static getChats(): Promise<XMLHttpRequest> {
    return httpClient.get('', { withCredentials: true, headers: { 'content-type': 'application/json' } });
  }
}
