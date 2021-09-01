import ErrorPageTemplate from './error.template';
import Templator from '../../utils/templator/templator';
import Button from '../../components/button';
import Block from '../../../core/block';

export interface ErrorPageProps {
  type: '404' | '500';
}

export default class ErrorPage extends Block {
  private readonly template: string;

  private readonly buttonTemplate: string;

  private readonly title: string;

  private readonly subtitle: string;

  constructor(props: ErrorPageProps) {
    super(props);
    this.template = ErrorPageTemplate;
    this.title = props.type === '404' ? 'Page Not Found' : 'Something went wrong';
    this.subtitle = props.type === '404'
      ? 'If you entered a web address or followed a link please check it was correct.'
      : 'We are already working on fixing problem.';
    this.buttonTemplate = new Button({ label: 'Back to Chats', link: '/messenger', type: 'basic' }).render();
  }

  public render(): string {
    const templateWithContext = new Templator({
      template: this.template,
      context: { title: this.title, subtitle: this.subtitle, button: this.buttonTemplate },
    });
    return templateWithContext.compile();
  }
}
