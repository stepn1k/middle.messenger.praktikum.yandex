export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: IChatLastMessage;
}

export interface IChatLastMessage {
  user: {
    first_name: string;
    second_name: string;
    avatar: string;
    email: string;
    login: string;
    phone: string;
  },
  time: Date;
  content: string;
}

export interface CreateChatRequestBody {
  title: string;
}

export interface DeleteChatRequestBody {
  chatId: number;
}
