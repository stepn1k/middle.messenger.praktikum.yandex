import MessengerTemplate from './messenger.template';
import DividerComponent from '../../components/divider';
import { ComponentInterface } from '../../models/component.interface';

const chats = [
  { name: 'Alina', message: 'Hello Stepan!' },
  { name: 'Daniel', message: 'How are you?' },
  { name: 'Gerald', message: 'We will start in 15 minutes' },
  { name: 'Valentin', message: 'gif' },
];

export default (): ComponentInterface => ({
  template: MessengerTemplate,
  context: { chats },
  declaredComponents: [DividerComponent],
});

export default class MessengerPage {
  constructor() {
  }
}