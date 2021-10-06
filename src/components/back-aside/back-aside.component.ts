import BackAsideTemplate from './back-aside.template';
import Block from '../../utils/block/block';
import { RouterPaths } from '../../utils/router/router-paths.enum';
import { router } from '../../index';
import store from '../../store/store';

export default class BackAside extends Block {
  constructor(props: { pathToClick: RouterPaths }) {
    const context = {
      events: {
        click: () => {
          router.go(props.pathToClick);
          // TODO: move it from this component;
          if (props.pathToClick === RouterPaths.MESSENGER) {
            store.setActiveChat(null);
          }
        },
      },
    };
    super(context, BackAsideTemplate);
  }
}
