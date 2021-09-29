import MessageTemplate from './message.template';
import Block from '../../utils/block/block';

export interface MessageProps {
  authorId: string;
  time: number | Date;
  messageText: string;
  isExternalMessage?: boolean
}

export interface MessageContext {
  authorId: string;
  time: string;
  messageText: string;
  theme: 'own' | 'external';
}

export default class Message extends Block {
  constructor(props: MessageProps) {
    const context: MessageContext = {
      ...props,
      time: new Date(props.time).toLocaleDateString('en-US'),
      theme: props.isExternalMessage ? 'external' : 'own',
    };
    super(context, MessageTemplate);
  }
}
