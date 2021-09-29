/* eslint no-param-reassign: 0 */
import { State, User } from './store.models';

const initialState: State = {
  user: null,
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
    // TODO: find way to work with subscription correctly
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
        target[item] = value;
        this.emitUpdating();
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
}

const store = new Store(initialState);
export default store;
