import Block from '../../utils/block/block';
import UsersMenuTemplate from './users-menu.template';

export default class UsersMenu extends Block {
  constructor(props: any) {
    super(props, UsersMenuTemplate);
  }
}
