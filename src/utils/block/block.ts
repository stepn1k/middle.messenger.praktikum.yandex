import EventBus from './event-bus';
import Templator from '../templator/templator';

type Props = Record<string, any>;

export default abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FLOW_RENDERED: 'flow:rendered',
  };

  public readonly props: Props;

  public readonly template: string;

  public readonly id: string;

  private readonly eventBus: EventBus;

  public element: HTMLElement;

  protected constructor(props: Props, template: string) {
    this.eventBus = new EventBus();
    this.id = Block.generateId();
    this.props = this.makePropsProxy(props);
    this.template = template;
    this.registerEvents(this.eventBus);
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  private static generateId(): string {
    return `${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
  }

  private makePropsProxy(props: Props) {
    return new Proxy(props, {
      deleteProperty() {
        throw new Error('No Access');
      },
    });
  }

  private registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.onInit.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this.onComponentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this.onComponentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this.onRender.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDERED, this.onComponentRendered.bind(this));
  }

  private addEvents(element: HTMLElement): void {
    const { events = {} } = this.props || {};
    Object.keys(events).forEach((eventName) => {
      if (element) {
        element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private onInit(): void {
    this.componentInit();
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  public componentInit() { }

  private onComponentDidUpdate(): void {
    const response = this.componentDidUpdate();
    if (response) {
      this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }
  }

  public componentDidUpdate(): boolean {
    return true;
  }

  public setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.eventBus.emit(Block.EVENTS.FLOW_CDU);
  };

  private onComponentDidMount(): void {
    const templateWithContext = new Templator({
      template: this.template,
      context: { ...this.props, componentId: this.id },
    });
    const newElement = templateWithContext.compile();
    this.element = newElement as HTMLElement;
    this.componentDidMount();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  public componentDidMount() { }

  private onRender(): void {
    if (this.element) {
      this.addEvents(this.element);
      const currentElement = document.querySelector(`[data-id='${this.id}']`);
      currentElement?.replaceWith(this.element);
      this.eventBus.emit(Block.EVENTS.FLOW_RENDERED);
    }
  }

  public render(): HTMLElement {
    return this.element;
  }

  public onComponentRendered() { }

  public addClass(className: string) {
    this.element.classList.add(className);
  }

  public removeClass(className: string) {
    this.element.classList.remove(className);
  }
}
