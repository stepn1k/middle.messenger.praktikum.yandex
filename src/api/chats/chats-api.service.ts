import HttpClient from '../../utils/api/httpClient';
import ApiSettings from '../api.settings';
import { CreateChatRequestBody } from './chats-api.models';

const httpClient = new HttpClient(`${ApiSettings.baseUrl}/chats`);

export default class ChatsApiService {
  static getChats(): Promise<XMLHttpRequest> {
    return httpClient.get('', { withCredentials: true, headers: { 'content-type': 'application/json' } });
  }

  static createChat(data: CreateChatRequestBody): Promise<XMLHttpRequest> {
    return httpClient.post('', { data, withCredentials: true, headers: { 'content-type': 'application/json' } });
  }
}
