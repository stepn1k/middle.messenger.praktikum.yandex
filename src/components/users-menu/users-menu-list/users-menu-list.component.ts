import UsersMenuListTemplate from './users-menu-list.template';
import Block from '../../../utils/block/block';
import { User } from '../../../store/store.models';
import UsersMenuListItem from '../users-menu-list-item';

interface UsersMenuListProps {
  users: User[];
}

export default class UsersMenuList extends Block {
  constructor(props: UsersMenuListProps) {
    super({ ...props, userList: [] }, UsersMenuListTemplate);
  }

  componentDidUpdate(): boolean {
    this.props.userList = this.props.users
      ?.map((user: User) => new UsersMenuListItem({ user }));
    return true;
  }
}
