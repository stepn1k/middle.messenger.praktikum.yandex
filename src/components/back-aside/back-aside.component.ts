import BackAsideTemplate from './back-aside.template';
import Block from '../../../core/block';
import { router } from '../../index';

export default class BackAside extends Block {
  constructor() {
    const context = { events: { click: () => router.back() } };
    super(context, BackAsideTemplate);
  }
}
