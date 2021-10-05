import Block from '../../utils/block/block';
import UsersMenuTemplate from './users-menu.template';
import store from '../../store/store';
import UsersMenuList from './users-menu-list';
import chatsController from '../../controllers/chats.controller';
import { User } from '../../store/store.models';
import isEqual from '../../utils/methods/isEqual';

export default class UsersMenu extends Block {
  private menu: HTMLDivElement;

  private addMenu: HTMLInputElement;

  private users: User[];

  constructor() {
    super({
      userListComponent: new UsersMenuList({ users: [] }),
      events: { click: ($event: Event) => this.clickOutside($event) },
    }, UsersMenuTemplate);
  }

  componentInit() {
    store.subscribe((state) => {
      if (!isEqual(state.chatUsers, this.users)) {
        this.users = store.getChatUsers();
        this.props.userListComponent?.setProps({ users: this.users });
      }
    }, 'usersMenu');
  }

  componentDidMount() {
    this.menu = this.element.querySelector('.users-menu-component') as HTMLDivElement;
    this.addMenu = this.element.querySelector('.users-menu-component-add-user__input') as HTMLInputElement;
    this.addMenu.value = '';
    this.initInputHandler();
  }

  private initInputHandler(): void {
    this.addMenu.onchange = () => {
      if (this.addMenu.value) { // TODO: implement search with displaying users
        chatsController.searchUserToAdd(this.addMenu.value)
          .then((users: User[]) => {
            if (users[0]?.login === this.addMenu.value) {
              const chatId = store.getActiveChat().id;
              const userId = users[0]?.id;
              chatsController.addUserToChat(chatId, userId);
              this.addMenu.value = '';
            }
          });
      }
    };
  }

  public openMenu(): void {
    this.element.classList.add('show');
    this.users = store.getChatUsers();
    this.props.userListComponent?.setProps({ users: this.users });
  }

  public closeMenu(): void {
    this.element.classList.remove('show');
  }

  public clickOutside($event: Event): void {
    const isClickOutside = !this.menu.contains($event.target as Node);
    if (isClickOutside) {
      this.closeMenu();
    }
  }
}
