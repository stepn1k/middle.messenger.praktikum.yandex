import ChatsApiService from '../api/chats/chats-api.service';
import store from '../store/store';
import { IChat } from '../api/chats/chats-api.models';

class ChatsController {
  private static chatsControllerInstance: ChatsController;

  constructor() {
    if (ChatsController.chatsControllerInstance) {
      return ChatsController.chatsControllerInstance;
    }
    ChatsController.chatsControllerInstance = this;
  }

  public getChats() {
    return new Promise((resolve, reject) => {
      ChatsApiService.getChats().then((getChatsResponse) => {
        const response = JSON.parse(getChatsResponse.response);
        if (getChatsResponse.status === 200) {
          store.setCurrentChats(response as IChat[]);
          resolve('OK');
        } else {
          reject(response.reason);
        }
      });
    });
  }
}

const chatsController = new ChatsController();

export default chatsController;
