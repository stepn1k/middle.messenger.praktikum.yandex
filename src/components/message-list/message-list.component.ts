import Block from '../../utils/block/block';
import MessageListTemplate from './message-list.template';
import Message from '../message';

export interface MessageListProps {
  messages?: Message[];
}

export default class MessageList extends Block {
  constructor(props: MessageListProps) {
    super({ ...props, messages: [] }, MessageListTemplate);
  }

  componentDidMount() {
    if (this.props.messages === null) {
      this.element.classList.add('loading');
    } else if (!this.props.messages?.length) {
      this.element.classList.add('empty');
    } else {
      this.element.classList.remove('empty');
      this.element.classList.remove('loading');
    }
  }

  public scrollDown() {
    this.element.querySelector('#bottom')?.scrollIntoView();
  }

  onComponentRendered() {
    this.scrollDown();
  }
}
