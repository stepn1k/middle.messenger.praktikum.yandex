import ButtonTemplate from './button.template';
import { ComponentInterface } from '../../models/component.interface';

export interface ButtonProps {
  label: string;
  type: 'primary' | 'raised';
  link: string;
  color: 'red' | 'blue';
}

export default (props: ButtonProps): ComponentInterface => {
  const color = props?.color ? props.color : 'blue';

  return {
    selector: 'button-component',
    context: { ...props, color },
    template: ButtonTemplate,
  };
};
