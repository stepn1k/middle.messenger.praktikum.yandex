/* eslint no-param-reassign: 0 */
import { State, User } from './store.models';
import { IChat } from '../api/chats/chats-api.models';
import isEqual from '../utils/methods/isEqual';

const initialState: State = {
  user: null,
  chats: null,
  activeChat: null,
  chatUsers: null,
};

class Store {
  private readonly state: State;

  private static storeInstance: Store;

  private readonly listeners: Record<string, Function> = {};

  constructor(state: State) {
    if (Store.storeInstance) {
      return Store.storeInstance;
    }
    Store.storeInstance = this;
    this.listeners = {};
    this.state = this.makeStateProxy(state);
  }

  public subscribe(subscriber: (state: State) => void, location: string) {
    this.listeners[location] = subscriber;
    subscriber(this.state);
  }

  private emitUpdating() {
    Object.keys(this.listeners).forEach((key) => this.listeners[key](this.state));
  }

  private makeStateProxy(state: State) {
    return new Proxy(state, {
      set: (target: State, item: string, value: unknown) => {
        // @ts-ignore
        if (!isEqual(target[item], value)) {
          // @ts-ignore
          target[item] = value;
          this.emitUpdating();
        }
        return true;
      },
      deleteProperty: () => {
        throw new Error('No Access');
      },
    });
  }

  public getCurrentUser(): User {
    return this.state.user;
  }

  public setCurrentUser(value: User) {
    this.state.user = value;
  }

  public getChats(): IChat[] {
    return this.state.chats;
  }

  public setCurrentChats(chats: IChat[]) {
    this.state.chats = chats;
  }

  public getActiveChat(): IChat {
    return this.state.activeChat;
  }

  public setActiveChat(chat: IChat) {
    this.state.activeChat = chat;
  }

  public setChatUsers(users: User[]) {
    this.state.chatUsers = users;
  }

  public getChatUsers(): User[] {
    return this.state.chatUsers;
  }
}

const store = new Store(initialState);
export default store;
