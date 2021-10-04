/* eslint-disable no-console */
import ApiSettings from '../api.settings';

export default class WebSocketService {
  private socket: WebSocket;

  private interval: NodeJS.Timer;

  private callbackOnMessage: any;

  private init(socket: WebSocket): void {
    socket.addEventListener('open', this.open.bind(this));
    socket.addEventListener('close', this.close.bind(this));
    socket.addEventListener('message', this.message.bind(this));
    socket.addEventListener('error', this.error.bind(this));
  }

  private open(): void {
    console.log('Connected');
    this.socket.send(JSON.stringify({ content: '0', type: 'get old' }));
    this.interval = setInterval(() => this.pingConnection(), 15000);
  }

  private close(event: CloseEvent): void {
    if (event.wasClean) {
      console.log('Closed');
    } else {
      console.log('Closed Incorrect');
    }
  }

  private message(event: MessageEvent): void {
    const message = JSON.parse(event.data);
    if (message.type !== 'pong') {
      this.callbackOnMessage(message);
    }
    return JSON.parse(event.data);
  }

  private error(event: ErrorEvent): void {
    console.log('Error', event.message);
  }

  public send(message: string): void {
    this.socket.send(JSON.stringify({ content: message, type: 'message' }));
  }

  private pingConnection(): void {
    this.socket.send(JSON.stringify({ type: 'ping' }));
  }

  public connect(chatId: number, userId: number, chatToken: string): void {
    if (this.socket) {
      this.closeConnect();
    }
    this.socket = new WebSocket(`${ApiSettings.webSocketUrl}/chats/${userId}/${chatId}/${chatToken}`);
    this.init(this.socket);
  }

  public closeConnect(): void {
    this.socket.close();
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  public on(callback: any) {
    this.callbackOnMessage = callback;
  }
}
