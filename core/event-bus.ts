export default class EventBus {
  protected listeners: Record<string, ((...args: any) => void)[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string | number, callback: (...args: any) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string | number, callback: (...args: any) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

  emit(event: string | number, ...args: any[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}
