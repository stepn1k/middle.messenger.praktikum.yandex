import ChatsApiService from '../api/chats/chats-api.service';
import store from '../store/store';
import { CreateChatRequestBody, IChat } from '../api/chats/chats-api.models';

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

  public createChat(data: CreateChatRequestBody) {
    return new Promise((resolve, reject) => {
      ChatsApiService.createChat(data).then((createChatResponse) => {
        const response = JSON.parse(createChatResponse.response);
        if (createChatResponse.status === 200) {
          this.getChats()
            .then(() => resolve('Chat created.'))
            .catch((err) => reject(err));
        } else {
          reject(response.reason);
        }
      });
    });
  }
}

const chatsController = new ChatsController();

export default chatsController;
