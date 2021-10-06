import Block from '../../utils/block/block';
import AddChatTemplate from './add-chat.template';
import chatsController from '../../controllers/chats.controller';

export default class AddChat extends Block {
  private addChatForm: HTMLDivElement;

  private addChatInput: HTMLInputElement;

  constructor() {
    const context = {
      openAddChatForm: () => this.openAddChatForm(),
      closeAddChatForm: () => this.closeAddChatForm(),
    };
    super(context, AddChatTemplate);
  }

  componentDidMount() {
    if (!this.addChatInput) {
      this.addChatInput = this.element.querySelector('.add-chat-component-form__input') as HTMLInputElement;
    }
    this.addChatInput.onkeydown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const newChatTitle = this.addChatInput.value;
        this.addChatInput.value = '';
        chatsController.createChat({ title: newChatTitle });
        this.closeAddChatForm();
      }
    };
  }

  private openAddChatForm() {
    if (!this.addChatForm) {
      this.addChatForm = this.element.querySelector('.add-chat-component-form') as HTMLDivElement;
    }
    this.addChatForm.classList.add('show');
    this.addChatInput.focus();
  }

  private closeAddChatForm() {
    this.addChatForm.classList.remove('show');
  }
}
