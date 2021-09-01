import EventBus from './event-bus';

type Props = Record<string, any>;

export default abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public readonly props: Props;

  public readonly id: string;

  private readonly eventBus: EventBus;

  public element: HTMLElement;

  protected constructor(props: Props) {
    this.eventBus = new EventBus();
    this.id = Block.generateId();
    this.props = this.makePropsProxy(props);
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

  private registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.onInit.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this.onComponentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this.onComponentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this.onRender.bind(this));
  }

  private onInit() {
    this.element = document.createElement('div');
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private onComponentDidUpdate() {
    const response = this.componentDidUpdate();
    if (response) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  public componentDidUpdate() {
    return true;
  }

  public setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.eventBus.emit(Block.EVENTS.FLOW_CDU);
  };

  private onComponentDidMount() {
  }

  private onRender() {
    const block: string = this.render();
    if (this.element) {
      this.element.innerHTML = block;
      const currentElement = document.querySelector(`[data-id='${this.id}']`);
      currentElement?.parentNode?.replaceChild(this.element.children[0], currentElement);
    }
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  public render(): string {
    return '';
  }
}
