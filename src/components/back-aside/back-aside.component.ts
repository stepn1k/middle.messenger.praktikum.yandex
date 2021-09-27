import BackAsideTemplate from './back-aside.template';
import Block from '../../../core/block';
import { RouterPaths } from '../../utils/router/router-paths.enum';
import { router } from '../../index';

export default class BackAside extends Block {
  constructor(props: { pathToClick: RouterPaths }) {
    const context = {
      events: { click: () => router.go(props.pathToClick) },
    };
    super(context, BackAsideTemplate);
  }
}
