import Block from '../../utils/block/block';
import MessageListTemplate from './message-list.template';
import Message from '../message';

export interface MessageListProps {
  messages?: Message[];
}

export default class MessageList extends Block {
  constructor(props: MessageListProps) {
    super(props, MessageListTemplate);
  }

  componentDidMount() {
    if (!this.props.messages?.length) {
      this.element.classList.add('empty');
    } else {
      this.element.classList.remove('empty');
    }
    return true;
  }
}
