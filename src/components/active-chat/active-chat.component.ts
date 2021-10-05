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
import UsersMenu from '../users-menu';

export interface ActiveChatProps {
  chat: IChat;
}

export default class ActiveChat extends Block {
  private socket: WebSocketService;

  private isSocketOpen: boolean;

  private messageInput: HTMLInputElement;

  constructor(props: ActiveChatProps) {
    const activeChatItem = props.chat;
    super({
      uiStateClass: activeChatItem ? 'active-chat-item' : 'empty-chat-item',
      imageSource: Avatar.baseImageUrl
          + (activeChatItem?.avatar ? activeChatItem.avatar : Avatar.baseChatImageSource),
      imageChooserComponent: new ImageChooser({ type: ChooserTypeEnum.CHAT }),
      messageListComponent: new MessageList({}),
      usersMenuComponent: new UsersMenu(),
      sendMessage: () => this.sendMessage(),
      toggleOptionsMenu: () => this.toggleOptionMenu(),
      removeChat: () => this.removeChat(),
      openChangeAvatarMenu: () => this.openChangeAvatarMenu(),
      openUsersMenu: () => this.openUsersMenu(),
      backToChats: () => this.backToChats(),
    },
    ActiveChatTemplate);
  }

  componentInit() {
    store.subscribe((state) => {
      if (state.activeChat?.id !== this.props.chat?.id) {
        this.isSocketOpen = false;
        this.props.messageListComponent?.setProps({ messages: null });
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
          chatsController.getChatUsers(this.props.chat.id);
          this.socket.on(this.onMessage.bind(this));
        })
        .catch(() => store.setActiveChat(null));
    }
    this.bindMessageInputListener();
  }

  private bindMessageInputListener(): void {
    this.messageInput = this.element.querySelector('.active-chat-footer__input') as HTMLInputElement;
    this.messageInput.onkeydown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        this.sendMessage();
      }
    };
  }

  private onMessage(data: IMessage[] | IMessage) {
    const messages: Message[] = Array.isArray(data)
      ? data?.map((message) => new Message({ ...message })).reverse()
      : [...this.props.messageListComponent.props.messages, new Message({ ...data })];
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

  public openUsersMenu(): void {
    this.props.usersMenuComponent.openMenu();
  }

  public sendMessage() {
    const message = this.messageInput.value;
    if (message) {
      this.socket.send(message);
      this.messageInput.value = '';
    }
  }

  // for mobile device
  public backToChats(): void {
    store.setActiveChat(null);
    store.setChatUsers(null);
  }
}
