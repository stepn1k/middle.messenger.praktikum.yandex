import HttpClient from '../../utils/api/httpClient';
import { CreateChatRequestBody, DeleteChatRequestBody } from './chats-api.models';

const httpClient = new HttpClient('/chats');

export default class ChatsApiService {
  static getChats(): Promise<XMLHttpRequest> {
    return httpClient.get('', { withCredentials: true, headers: { 'content-type': 'application/json' } });
  }

  static createChat(data: CreateChatRequestBody): Promise<XMLHttpRequest> {
    return httpClient.post('', { data, withCredentials: true, headers: { 'content-type': 'application/json' } });
  }

  static removeChat(data: DeleteChatRequestBody): Promise<XMLHttpRequest> {
    return httpClient.delete('', { data, withCredentials: true, headers: { 'content-type': 'application/json' } });
  }

  static changeChatAvatar(data: FormData): Promise<XMLHttpRequest> {
    return httpClient.put('/avatar', { data, withCredentials: true });
  }

  static getToken(chatId: number): Promise<XMLHttpRequest> {
    return httpClient.post(`/token/${chatId}`, { withCredentials: true });
  }

  static getChatsUsers(chatId: number): Promise<XMLHttpRequest> {
    return httpClient.get(`/${chatId}/users`, { withCredentials: true });
  }

  static addUserToChat(chatId: number, userId: number): Promise<XMLHttpRequest> {
    return httpClient.put('/users', {
      data: { users: [userId], chatId },
      withCredentials: true,
      headers: { 'content-type': 'application/json' },
    });
  }

  static deleteUserFromChat(chatId: number, userId: number): Promise<XMLHttpRequest> {
    return httpClient.delete('/users', {
      data: { users: [userId], chatId },
      withCredentials: true,
      headers: { 'content-type': 'application/json' },
    });
  }
}
