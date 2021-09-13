import Block from '../../../core/block';
import ChatTemplate from './chat.template';

export interface ChatProps {
  lastMessage: string,
  time: number | Date,
  author: string,
  newMessagesCount: number,
  events?: Record<string, (event: Event) => void>;
}

export default class Chat extends Block {
  constructor(props: ChatProps) {
    const getTimeForChatFromDateTime = (time: number | Date): string =>
      new Date(time).toLocaleString('en-US', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        weekday: 'short'
      }); // example: 11 Th, 13:12
    const context = {
      ...props,
      time: getTimeForChatFromDateTime(props.time)
    };
    super(context, ChatTemplate);
  }
}
