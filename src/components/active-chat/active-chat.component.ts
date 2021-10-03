import Block from '../../utils/block/block';
import ActiveChatTemplate from './active-chat.template';
import { IChat } from '../../api/chats/chats-api.models';
import Avatar from '../avatar';
import chatsController from '../../controllers/chats.controller';
import ImageChooser from '../image-chooser';
import { ChooserTypeEnum } from '../image-chooser/chooser-type.enum';
import WebSocketService from '../../api/web-socket/web-socket.service';
import store from '../../store/store';
import MessageList from '../message-list';
import Message from '../message';
import { IMessage } from '../message/message.interface';
import Input from '../input';

export interface ActiveChatProps {
  chat: IChat;
}

export default class ActiveChat extends Block {
  private socket: WebSocketService;

  private isSocketOpen: boolean;

  constructor(props: ActiveChatProps) {
    const activeChatItem = props.chat;

    super({
        uiStateClass: activeChatItem ? 'active-chat-item' : 'empty-chat-item',
        imageSource: Avatar.baseImageUrl
          + (activeChatItem?.avatar ? activeChatItem.avatar : Avatar.baseChatImageSource),
        imageChooserComponent: new ImageChooser({ type: ChooserTypeEnum.CHAT }),
        messageListComponent: new MessageList({}),
        messageInputComponent: new Input({ placeholder: 'Type your message' }),
        sendMessage: () => this.sendMessage(),
        toggleOptionsMenu: () => this.toggleOptionMenu(),
        removeChat: () => this.removeChat(),
        openChangeAvatarMenu: () => this.openChangeAvatarMenu(),
      },
      ActiveChatTemplate);
  }

  componentInit() {
    store.subscribe((state) => {
      if (state.activeChat?.id !== this.props.chat?.id) {
        this.isSocketOpen = false;
        this.socket?.closeConnect();
      }
    }, 'chat');
  }

  componentDidUpdate(): boolean {
    this.props.uiStateClass = this.props.chat ? 'active-chat-item' : 'empty-chat-item';
    this.props.imageSource = Avatar.baseImageUrl
      + (this.props.chat?.avatar ? this.props.chat.avatar : Avatar.baseChatImageSource);
    return true;
  }

  componentDidMount() {
    if (!this.isSocketOpen && this.props.chat) {
      chatsController
        .getToken(this.props.chat.id)
        .then(({ token }) => {
          this.socket = new WebSocketService();
          this.socket.connect(this.props.chat.id, store.getCurrentUser().id, token);
          this.isSocketOpen = true;
          this.socket.on(this.onMessage.bind(this));
        })
        .catch(() => store.setActiveChat(null));
    }
  }

  private onMessage(data: IMessage[]) {
    const messages = data?.map(((message) => new Message({ ...message }))).reverse() || [];
    this.props.messageListComponent?.setProps({ messages });
  }

  public toggleOptionMenu(): void {
    const menu = this.element.querySelector('.active-chat-header__options-menu');
    const isOpen = menu.classList.contains('visible');

    if (isOpen) {
      menu.classList.remove('visible');
    } else {
      menu.classList.add('visible');
    }
  }

  public removeChat(): void {
    chatsController.removeChat({ chatId: this.props.chat.id });
  }

  public openChangeAvatarMenu(): void {
    this.props.imageChooserComponent.openChooser(this.props.chat.id);
  }

  public sendMessage() {
    const message = this.props.messageInputComponent.getValue();
    if (message) {
      this.socket.send(message);
      this.props.messageInputComponent.clearInput();
    }

  }
}
