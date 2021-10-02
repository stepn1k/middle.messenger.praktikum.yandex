import ChatsApiService from '../api/chats/chats-api.service';
import store from '../store/store';
import { CreateChatRequestBody, DeleteChatRequestBody, IChat } from '../api/chats/chats-api.models';

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

  public removeChat(data: DeleteChatRequestBody) {
    return new Promise((resolve, reject) => {
      ChatsApiService.removeChat(data).then((deleteChatResponse) => {
        const response = JSON.parse(deleteChatResponse.response);
        if (deleteChatResponse.status === 200) {
          store.setActiveChat(null);
          this.getChats()
            .then(() => resolve('Chat deleted.'))
            .catch((err) => reject(err));
        } else {
          reject(response.reason);
        }
      });
    });
  }

  public changeChatAvatar(formData: FormData) {
    return new Promise((resolve, reject) => {
      ChatsApiService.changeChatAvatar(formData)
        .then((changeAvatarResponse) => {
          const response = JSON.parse(changeAvatarResponse.response);
          if (changeAvatarResponse.status === 200) {
            const chats = store.getChats();
            const indexToUpdate = chats.findIndex((chat) => chat.id === response.id);
            const newChats = [
              ...chats.slice(0, indexToUpdate),
              { ...chats[indexToUpdate], ...response },
              ...chats.slice(indexToUpdate + 1),
            ];
            store.setActiveChat(response);
            store.setCurrentChats(newChats);
            resolve('OK');
          } else {
            reject(response.reason);
          }
        })
        .catch(
          () => reject('Something went wrong. Please try again later or choose another format.'),
        );
    });
  }
}

const chatsController = new ChatsController();

export default chatsController;
