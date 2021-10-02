import Block from '../../utils/block/block';
import ActiveChatTemplate from './active-chat.template';
import { IChat } from '../../api/chats/chats-api.models';
import Avatar from '../avatar';
import chatsController from '../../controllers/chats.controller';
import ImageChooser from '../image-chooser';
import { ChooserTypeEnum } from '../image-chooser/chooser-type.enum';

export interface ActiveChatProps {
  chat: IChat;
}

export interface ActiveChatContext {
  uiStateClass: 'active-chat-item' | 'empty-chat-item',
  imageSource: string;
}

export default class ActiveChat extends Block {
  private readonly createContextFn: (chat: IChat) => ActiveChatContext;

  private readonly imageChooser: ImageChooser;

  constructor(props: ActiveChatProps) {
    const activeChatItem = props.chat;
    const imageChooserComponent = new ImageChooser({ type: ChooserTypeEnum.CHAT });
    const createContext = (chat: IChat): ActiveChatContext => ({
      uiStateClass: chat ? 'active-chat-item' : 'empty-chat-item',
      imageSource: Avatar.baseImageUrl + (chat?.avatar ? chat.avatar : Avatar.baseChatImageSource),
    });
    super({
      ...createContext(activeChatItem),
      imageChooserComponent,
      toggleOptionsMenu: () => this.toggleOptionMenu(),
      removeChat: () => this.removeChat(),
      openChangeAvatarMenu: () => this.openChangeAvatarMenu(),
    },
    ActiveChatTemplate);
    this.createContextFn = createContext;
    this.imageChooser = imageChooserComponent;
  }

  componentDidUpdate(): boolean {
    const newContext = this.createContextFn(this.props.chat);
    this.props.uiStateClass = newContext.uiStateClass;
    this.props.imageSource = newContext.imageSource;
    return true;
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
    this.imageChooser.openChooser(this.props.chat.id);
  }
}
