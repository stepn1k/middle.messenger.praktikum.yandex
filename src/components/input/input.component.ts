import Block from '../../../core/block';
import InputTemplate from './input.template';

export interface InputContext {
  placeholder: string;
  events?: Record<string, (event: Event) => void>;
}

export default class Input extends Block {
  constructor(props: any) {
    super(props, InputTemplate);
  }

  public getValue(): string {
    return (this.element.children[0] as HTMLInputElement).value;
  }

  public clearInput(): void {
    (this.element.children[0] as HTMLInputElement).value = '';
  }
}
