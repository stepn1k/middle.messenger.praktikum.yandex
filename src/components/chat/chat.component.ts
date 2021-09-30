import Block from '../../utils/block/block';
import Avatar from '../avatar';
import ChatTemplate from './chat.template';

export interface ChatProps {
  lastMessage: string,
  time: number | Date,
  chatTitle: string,
  avatar: string,
  newMessagesCount: number,
  events?: Record<string, (event: Event) => void>;
}

export default class Chat extends Block {
  constructor(props: ChatProps) {
    const getTimeForChatFromDateTime = (time: number | Date): string => new Date(time).toLocaleString('en-US', {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      weekday: 'short',
    }); // example: 11 Th, 13:12
    const context = {
      chatTitle: props.chatTitle,
      lastMessage: props.lastMessage || 'Chat is empty',
      messagesCountClass: props.newMessagesCount ? 'new-messages' : 'empty',
      newMessagesCount: props.newMessagesCount.toString(),
      imageSource: Avatar.baseImageUrl + (props.avatar ? props.avatar : Avatar.baseChatImageSource),
      time: !props.time ? 'New' : getTimeForChatFromDateTime(props.time),
    };
    super(context, ChatTemplate);
  }
}
