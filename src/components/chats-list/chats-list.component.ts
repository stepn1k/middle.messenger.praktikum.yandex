import Block from '../../utils/block/block';
import ChatsListTemplate from './chats-list.template';
import { IChat } from '../../api/chats/chats-api.models';
import Chat from '../chat';

export interface ChatsListProps {
  chats: IChat[];
}

export interface ChatsListContext {
  chatsList: Chat[] | string;
}

export default class MessageList extends Block {
  private readonly createChatListFunction: (c: IChat[]) => Chat[] | string;

  constructor(props: ChatsListProps) {
    const createChatList = (chats: IChat[]): Chat[] | string => {
      if (!chats?.length) {
        return 'No chats yet';
      }
      return chats?.map((chat: IChat) => new Chat({
        lastMessage: chat.last_message?.content,
        time: chat.last_message?.time,
        avatar: chat.avatar,
        chatTitle: chat.title,
        newMessagesCount: chat.unread_count,
      }));
    };
    const chatsList = createChatList(props.chats);
    const context: ChatsListContext = { chatsList };
    super(context, ChatsListTemplate);
    this.createChatListFunction = (chats: IChat[]) => createChatList(chats);
  }

  componentDidUpdate(): boolean {
    this.props.chatsList = this.createChatListFunction(this.props.chats);
    return true;
  }
}
