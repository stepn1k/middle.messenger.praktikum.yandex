import MessengerTemplate from './messenger.template';
import Block from '../../utils/block/block';
import Message from '../../components/message';
import Chat from '../../components/chat';
import Input from '../../components/input';
import MessageList from '../../components/message-list';
import { activateChat, chatList } from './dummy-data';
import { router } from '../../index';

export default class MessengerPage extends Block {
  private readonly context: any;

  constructor() {
    const messageList = new MessageList({
      messages: activateChat.messages.map((message) => new Message({
        messageText: message.text,
        time: message.time,
        authorId: message.authorId,
        isExternalMessage: Math.floor((Math.random() * 2 + 1)) > 1, // temporary property
      })),
    });

    const chats = chatList.map((chat) => new Chat({
      lastMessage: chat.lastMessage,
      time: chat.time,
      author: chat.author,
      newMessagesCount: chat.newMessagesCount,
      events: { click: ($event) => this.selectChat($event) },
    }));

    const messageInput = new Input({ placeholder: 'Type message...' });

    super({
      messageList,
      chats,
      messageInput,
      activeChatUser: activateChat.user,
      goToProfile: () => this.goToProfile(),
      onSendMessage: () => this.onSendMessage(),
    }, MessengerTemplate);
    this.context = {
      messageList,
      chats,
      messageInput,
      activeChatUser: activateChat.user,
    };
  }

  public goToProfile() {
    router.go('/profile');
  }

  public selectChat($event: Event): void {
    $event.preventDefault();
  }

  public onSendMessage(): void {
    const inputValue = this.context.messageInput.getValue();

    if (!inputValue) {
      return;
    }

    const newMessage = new Message({ messageText: inputValue, authorId: 'fbf5', time: new Date() });

    const { messageList } = this.context;
    messageList.setProps({ messages: [...messageList.props.messages, newMessage] });

    this.context.messageInput.clearInput();
  }
}
