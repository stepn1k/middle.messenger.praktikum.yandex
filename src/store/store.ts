/* eslint no-param-reassign: 0 */
import { AuthState, State } from './store.models';

const initialState: State = {
  authState: {
    user: null,
  },
};

class Store {
  private readonly state: State;

  private static storeInstance: Store;

  private listeners: Function[] = [];

  static EVENTS = {
    FLOW_SDU: 'flow:store-did-update',
  };

  constructor(state: State) {
    if (Store.storeInstance) {
      return Store.storeInstance;
    }
    Store.storeInstance = this;
    this.listeners = [];
    this.state = this.makeStateProxy(state);
  }

  public subscribe(subscriber: (state: State) => void) {
    this.listeners.push((subscriber));
    subscriber(this.state);
  }

  private stateUpdated() {
    this.listeners.forEach((subscriber) => subscriber(this.state));
  }

  private makeStateProxy(state: State) {
    return new Proxy(state, {
      set: (target: State, item: string, value: unknown) => {
        // @ts-ignore
        target[item] = value;
        this.stateUpdated();
        return true;
      },
      deleteProperty: () => {
        throw new Error('No Access');
      },
    });
  }

  public getAuthState(): AuthState {
    return this.state.authState;
  }

  public setAuthState(authState: AuthState): void {
    this.state.authState = authState;
  }
}

const store = new Store(initialState);
export default store;
