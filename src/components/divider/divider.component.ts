import DividerTemplate from './divider.template';
import { ComponentInterface } from '../../models/component.interface';

export default (): ComponentInterface => ({
  selector: 'divider-component',
  context: {},
  template: DividerTemplate,
});
