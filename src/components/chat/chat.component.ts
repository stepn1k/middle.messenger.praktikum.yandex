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
    const context = {
      ...props,
      time: new Date(props.time).toISOString().substr(11, 8),
    };
    super(context, ChatTemplate);
  }
}
