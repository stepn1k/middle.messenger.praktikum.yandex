import { IChat } from '../api/chats/chats-api.models';

export interface State {
  user: User;
  chats: IChat[],
  activeChat: IChat;
}

export interface User {
  id: string;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}
