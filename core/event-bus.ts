export default class EventBus {
  protected listeners: Record<string, ((...args: any) => void)[]>;

  constructor() {
    this.listeners = {};
  }

  subscribe(event: string, callback: (...args: any) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  unsubscribe(event: string, callback: (...args: any) => void): void {
    if (!this.listeners[event]) {
      throw new Error(`No event: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: string, ...args: any): void {
    if (!this.listeners[event]) {
      throw new Error(`No event: ${event}`);
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }

}
