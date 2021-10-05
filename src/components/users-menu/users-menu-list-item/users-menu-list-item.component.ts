import Block from '../../../utils/block/block';
import UsersMenuListItemTemplate from './users-menu-list-item.template';
import { User } from '../../../store/store.models';
import Avatar from '../../avatar';
import chatsController from '../../../controllers/chats.controller';
import store from '../../../store/store';

interface UsersMenuListItemProps {
  user: User;
}

export default class UsersMenuListItem extends Block {
  constructor(props: UsersMenuListItemProps) {
    const imageSource = Avatar.baseImageUrl + (
      props.user.avatar ? props.user.avatar : Avatar.baseImageSource
    );
    super({ user: { ...props.user, imageSource } }, UsersMenuListItemTemplate);
  }

  componentDidMount() {
    const removeIcon = this.element.querySelector('.users-menu-list-item__remove') as HTMLDivElement;
    removeIcon.onclick = (event: Event) => {
      event.preventDefault();
      this.removeUserFromChat();
    };
  }

  public removeUserFromChat(): void {
    chatsController.deleteUserFromChat(store.getActiveChat().id, this.props.user.id);
  }
}
