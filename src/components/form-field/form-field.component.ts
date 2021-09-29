import FormFieldTemplate from './form-field.template';
import Block from '../../utils/block/block';

export interface FormFieldProps {
  labelText: string;
  value: string | number;
  id: string;
  type: 'text' | 'password' | 'tel' | 'email';
  viewType: 'line' | 'basic';
  disabled?: boolean;
  placeholder?: string;
  errorMessage?: string;
  validator?: (value: string) => null | { validatorMessage: string }
  events?: Record<string, (event: Event) => void>;
}

export default class FormField extends Block {
  private readonly validator: (value: string) => null | { validatorMessage: string };

  constructor(props: FormFieldProps) {
    const defaultEvents = {
      focusout: () => this.checkValidation(),
      focusin: () => this.onFocus(),
    };

    const context = {
      ...props,
      events: { ...defaultEvents, ...props.events },
      placeholder: props.placeholder ? props.placeholder : '',
    };

    super(context, FormFieldTemplate);
    this.validator = props.validator;
    if (props.disabled) {
      this.setDisabledState(true);
    }
  }

  public setDisabledState(state: boolean) {
    (this.element.children[0].children[1] as HTMLInputElement).disabled = state;
  }

  public getInputValue(): string {
    return (this.element.children[0].children[1] as HTMLInputElement).value;
  }

  public checkValidation(): boolean {
    this.removeClass('focused');

    // no validator === input is valid
    if (!this.validator) {
      return true;
    }

    const validationResult = this.validator(this.getInputValue());
    if (validationResult) {
      this.addClass('invalid');
      this.setErrorMessage(validationResult.validatorMessage);
      return false;
    }
    this.removeClass('invalid');
    return true;
  }

  public onFocus(): void {
    this.removeClass('invalid');
    this.addClass('focused');
  }

  public setErrorMessage(message: string) {
    this.element.children[1].textContent = message;
  }
}
