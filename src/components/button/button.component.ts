import ButtonTemplate from './button.template';
import { ComponentInterface } from '../../models/component.interface';
import { ButtonProps } from './button-props.interface';

export default (props: ButtonProps): ComponentInterface => {
  const color = props?.color ? props.color : 'blue';

  return {
    selector: 'button-component',
    context: { ...props, color },
    template: ButtonTemplate,
  };
};
