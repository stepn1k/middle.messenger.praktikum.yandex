import Block from '../../utils/block/block';
import ImageChooserTemplate from './image-chooser.template';
import Button from '../button';
import profileController from '../../controllers/profile.controller';

export default class ImageChooser extends Block {
  public imageInput: HTMLInputElement;

  public preview: HTMLImageElement;

  public imageChooser: HTMLDivElement;

  public chooseButton: HTMLButtonElement;

  constructor() {
    const context = {
      chooseButton: new Button({
        label: 'Choose file',
        viewType: 'basic',
        events: { click: () => this.onClickChooser() },
      }),
      changeButton: new Button({
        label: 'Change',
        viewType: 'raised',
        events: { click: () => this.changeAvatar() },
      }),
      events: { click: ($event: Event) => this.onClickOutside($event) },
    };
    super(context, ImageChooserTemplate);
  }

  componentDidMount() {
    this.bindChildElements();
    this.addImagePreviewListeners();
  }

  private bindChildElements() {
    this.imageInput = this.element.querySelector('.image-chooser__input') as HTMLInputElement;
    this.preview = this.element.querySelector('.image-chooser__preview') as HTMLImageElement;
    this.imageChooser = this.element.querySelector('.image-chooser') as HTMLDivElement;
    this.chooseButton = this.element.querySelector('.button-component_basic') as HTMLButtonElement;
  }

  public openChooser(): void {
    this.element.classList.add('opened');
  }

  public changeAvatar(): void {
    const [file] = this.imageInput.files;
    const formData = new FormData();
    formData.append('avatar', file);
    profileController.changeUserAvatar(formData)
      .then(() => this.closeChooser())
      .catch((err) => this.setErrorMessage(err));
  }

  public closeChooser(): void {
    this.clearFile();
    this.element.classList.remove('opened');
  }

  public onClickOutside($event: Event) {
    const isClickOutside = !this.imageChooser.contains($event.target as Node);
    if (isClickOutside) {
      this.closeChooser();
    }
  }

  private addImagePreviewListeners() {
    this.imageInput.onchange = () => {
      const [file] = this.imageInput.files;
      if (file) {
        this.preview.src = URL.createObjectURL(file);
        this.preview.classList.add('show');
        this.chooseButton.classList.add('hidden');
      }
    };
  }

  public onClickChooser() {
    this.imageInput.click();
  }

  public clearFile(): void {
    this.imageInput.value = null;
    this.preview.src = null;
    this.preview.classList.remove('show');
    this.chooseButton.classList.remove('hidden');
    this.clearErrorMessage();
  }

  private setErrorMessage(message: string): void {
    const errorBlock = this.element.querySelector('.image-chooser__error-block');
    errorBlock.textContent = message;
    errorBlock.classList.add('visible');
  }

  private clearErrorMessage() {
    const errorBlock = this.element.querySelector('.image-chooser__error-block');
    errorBlock.textContent = '';
    errorBlock.classList.remove('visible');
  }
}
