export interface IMessage {
  chat_id: number;
  content: string;
  file: any;
  id: number;
  is_read: boolean;
  time: Date;
  type: string;
  user_id: number;
}
