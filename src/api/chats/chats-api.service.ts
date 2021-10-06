import HttpClient from '../../utils/api/httpClient';
import { CreateChatRequestBody, DeleteChatRequestBody } from './chats-api.models';

const httpClient = new HttpClient('/chats');

export default class ChatsApiService {
  static getChats(): Promise<XMLHttpRequest> {
    return httpClient.get('');
  }

  static createChat(data: CreateChatRequestBody): Promise<XMLHttpRequest> {
    return httpClient.post('', { data });
  }

  static removeChat(data: DeleteChatRequestBody): Promise<XMLHttpRequest> {
    return httpClient.delete('', { data });
  }

  static changeChatAvatar(data: FormData): Promise<XMLHttpRequest> {
    return httpClient.put('/avatar', { data, headers: {} });
  }

  static getToken(chatId: number): Promise<XMLHttpRequest> {
    return httpClient.post(`/token/${chatId}`);
  }

  static getChatsUsers(chatId: number): Promise<XMLHttpRequest> {
    return httpClient.get(`/${chatId}/users`);
  }

  static addUserToChat(chatId: number, userId: number): Promise<XMLHttpRequest> {
    return httpClient.put('/users', { data: { users: [userId], chatId } });
  }

  static deleteUserFromChat(chatId: number, userId: number): Promise<XMLHttpRequest> {
    return httpClient.delete('/users', { data: { users: [userId], chatId } });
  }
}
