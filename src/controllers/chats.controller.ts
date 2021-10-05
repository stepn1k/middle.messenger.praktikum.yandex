import ChatsApiService from '../api/chats/chats-api.service';
import store from '../store/store';
import { CreateChatRequestBody, DeleteChatRequestBody, IChat } from '../api/chats/chats-api.models';
import UsersApiService from '../api/users/users-api.service';

class ChatsController {
  constructor() { }

  public getToken(chatId: number) {
    return new Promise((resolve, reject) => {
      ChatsApiService.getToken(chatId).then((getChatsResponse) => {
        const response = JSON.parse(getChatsResponse.response);
        if (getChatsResponse.status === 200) {
          resolve(response);
        } else {
          reject(response.reason);
        }
      });
    });
  }

  public getChats() {
    return new Promise((resolve, reject) => {
      ChatsApiService.getChats().then((getChatsResponse) => {
        const response = JSON.parse(getChatsResponse.response);
        if (getChatsResponse.status === 200) {
          store.setCurrentChats(response as IChat[]);
          resolve(response);
        } else {
          reject(response.reason);
        }
      });
    });
  }

  public getChatUsers(chatId: number) {
    return new Promise((resolve, reject) => {
      ChatsApiService.getChatsUsers(chatId).then((getChatUsersResponse) => {
        const response = JSON.parse(getChatUsersResponse.response);
        if (getChatUsersResponse.status === 200) {
          store.setChatUsers(response);
          resolve(response);
        } else {
          reject(response.reason);
        }
      });
    });
  }

  public searchUserToAdd(login: string) {
    return new Promise((resolve, reject) => {
      UsersApiService.searchUserByLogin({ login }).then((searchUserByLogin) => {
        const response = JSON.parse(searchUserByLogin.response);
        if (searchUserByLogin.status === 200) {
          resolve(response);
        } else {
          reject(response.reason);
        }
      });
    });
  }

  public addUserToChat(chatId: number, userId: number) {
    return new Promise((resolve, reject) => {
      ChatsApiService.addUserToChat(chatId, userId).then((addUserToChat) => {
        this.updateChatUsersHandler(chatId, addUserToChat, resolve, reject);
      });
    });
  }

  public deleteUserFromChat(chatId: number, userId: number) {
    return new Promise((resolve, reject) => {
      ChatsApiService.deleteUserFromChat(chatId, userId).then((deleteUserFromChat) => {
        this.updateChatUsersHandler(chatId, deleteUserFromChat, resolve, reject);
      });
    });
  }

  private updateChatUsersHandler(
    chatId: number, XMLRequest: XMLHttpRequest, resolveFn: any, rejectFn: any,
  ) {
    if (XMLRequest.status === 200) {
      this.getChatUsers(chatId);
      resolveFn('Chat users updated.');
    } else {
      const response = JSON.parse(XMLRequest.response);
      rejectFn(response.reason);
    }
  }

  public createChat(data: CreateChatRequestBody) {
    return new Promise((resolve, reject) => {
      ChatsApiService.createChat(data).then((createChatResponse) => {
        const response = JSON.parse(createChatResponse.response);
        if (createChatResponse.status === 200) {
          this.getChats()
            .then((chats) => {
              // @ts-ignore
              store.setActiveChat(chats[0]);
              resolve('Chat created.');
            })
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
          store.setChatUsers(null);
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
