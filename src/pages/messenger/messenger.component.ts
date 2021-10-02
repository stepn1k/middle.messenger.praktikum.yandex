import MessengerTemplate from './messenger.template';
import Block from '../../utils/block/block';
import { router } from '../../index';
import store from '../../store/store';
import chatsController from '../../controllers/chats.controller';
import { RouterPaths } from '../../utils/router/router-paths.enum';
import ChatsList from '../../components/chats-list';
import AddChat from '../../components/add-chat';
import ActiveChat from '../../components/active-chat';

export default class MessengerPage extends Block {
  private readonly chatsList: ChatsList;

  private readonly activeChat: ActiveChat;

  constructor() {
    const addChatComponent = new AddChat();
    const activeChatComponent = new ActiveChat({ chat: null });
    const chatsList = new ChatsList({ chats: store.getChats() });
    super({
      addChatComponent,
      chatsList,
      activeChatComponent,
      goToProfile: () => this.goToProfile(),
    }, MessengerTemplate);
    this.chatsList = chatsList;
    this.activeChat = activeChatComponent;
  }

  componentInit() {
    chatsController.getChats();
  }

  componentDidMount() {
    store.subscribe((state) => {
      this.activeChat?.setProps({ chat: state.activeChat });
      this.chatsList?.setProps({ chats: state.chats });
    }, 'messenger');
  }

  public goToProfile() {
    router.go(RouterPaths.PROFILE);
  }
}
