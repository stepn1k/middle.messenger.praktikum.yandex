import ErrorPageTemplate from './error.template';
import Button from '../../components/button';
import Block from '../../../core/block';
import { router } from '../../index';

export interface ErrorPageProps {
  type: '404' | '500';
}

export interface ErrorPageContext {
  title: string;
  subtitle: string;
  button: Button;
}

export default class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    const context: ErrorPageContext = {
      title: props.type === '404' ? 'Page Not Found' : 'Something went wrong',
      subtitle: props.type === '404'
        ? 'If you entered a web address or followed a link please check it was correct.'
        : 'We are already working on fixing problem.',
      button: new Button({ label: 'Back to Chats', events: { click: () => router.go('/messenger') }, viewType: 'basic' }),
    };
    super(context, ErrorPageTemplate);
  }
}
