import MessengerTemplate from './messenger.template';
import Block from '../../utils/block/block';
import { router } from '../../index';
import store from '../../store/store';
import chatsController from '../../controllers/chats.controller';
import { RouterPaths } from '../../utils/router/router-paths.enum';
import ChatsList from '../../components/chats-list';
import AddChat from '../../components/add-chat';

export default class MessengerPage extends Block {
  private readonly chatsList: ChatsList;

  constructor() {
    const addChatComponent = new AddChat();
    const chatsList = new ChatsList({ chats: store.getChats() });
    super({
      addChatComponent,
      chatsList,
      goToProfile: () => this.goToProfile(),
    }, MessengerTemplate);
    this.chatsList = chatsList;
  }

  componentInit() {
    chatsController.getChats();
  }

  componentDidMount() {
    store.subscribe((state) => {
      this.chatsList?.setProps({ chats: state.chats });
    }, 'messenger');
  }

  public goToProfile() {
    router.go(RouterPaths.PROFILE);
  }
}
