import Block from '../../../core/block';
import MessageListTemplate from './message-list.template';
import Message from '../message';

export interface MessageListProps {
  messages: Message[];
}

export default class MessageList extends Block {
  constructor(props: MessageListProps) {
    super(props, MessageListTemplate);
  }
}
