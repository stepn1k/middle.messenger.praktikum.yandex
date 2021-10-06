import MessageTemplate from './message.template';
import Block from '../../utils/block/block';
import store from '../../store/store';
import { IMessage } from './message.interface';

export default class Message extends Block {
  constructor(props: IMessage) {
    const messageUser = store.getChatUsers()?.find((el) => el.id === props.user_id);
    const fullName = messageUser ? `${messageUser.first_name} ${messageUser.second_name}` : 'No Name';
    const getTimeForMessageFromDateTime = (time: number | Date): string => new Date(time).toLocaleString('en-US', {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
    }); // example: 13:12
    const context = {
      ...props,
      author: fullName,
      theme: props.user_id !== store.getCurrentUser().id ? 'external' : 'own',
      time: getTimeForMessageFromDateTime(props.time),
    };
    super(context, MessageTemplate);
  }
}
