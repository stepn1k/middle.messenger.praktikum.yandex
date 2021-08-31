import MessengerTemplate from './messenger.template';
import Templator from '../../utils/templator/templator';

export default class MessengerPage {
  private readonly template: string;

  private chats = [
    { name: 'Alina', message: 'Hello Stepan!' },
    { name: 'Daniel', message: 'How are you?' },
    { name: 'Gerald', message: 'We will start in 15 minutes' },
    { name: 'Valentin', message: 'gif' },
  ];

  constructor() {
    this.template = MessengerTemplate;
  }

  public render(): string {
    const templateWithContext = new Templator({
      template: this.template,
      context: { chats: this.chats }
    });
    return templateWithContext.compile();
  }
}
