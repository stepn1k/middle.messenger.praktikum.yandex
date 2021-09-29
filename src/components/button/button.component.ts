import ButtonTemplate from './button.template';
import Block from '../../utils/block/block';

export interface ButtonProps {
  label: string;
  viewType: 'basic' | 'raised';
  color?: 'red' | 'blue';
  events?: Record<string, (event: Event) => void>;
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    const context = { ...props, color: props?.color || 'blue' };
    super(context, ButtonTemplate);
  }
}
