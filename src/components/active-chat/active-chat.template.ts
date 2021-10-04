export default `
<div data-id="{{ componentId }}" class="messenger-active-chat {{ uiStateClass }}">
    <div class="active-chat">
        <div class="active-chat-header">
            <img class="active-chat-header__image" alt="chat-avatar" src="{{ imageSource }}">
            <div class="active-chat-header__chat-name"> {{ chat.title }} </div>
            <div class="active-chat-header__options" onclick="{{ toggleOptionsMenu }}"><i class="fas fa-ellipsis-v"></i>
                <div class="active-chat-header__options-menu">
                    <div class="options-menu__item" onclick="{{ openChangeAvatarMenu }}"><i class="far fa-file-image"></i>Change Chat Avatar</div>
                    <div class="options-menu__item" onclick="{{ openUsersMenu }}"><i class="fas fa-users-cog"></i></i>Users Menu</div>
                    <div class="divider"></div>
                    <div class="options-menu__item warning-theme" onclick="{{ removeChat }}"><i class="far fa-trash-alt"></i>Remove Chat</div>
                </div>
            </div>
        </div>
        <div class="active-chat-body">
            {{ messageListComponent }}
        </div>
        <div class="active-chat-footer">
            <div class="active-chat-footer__input">{{ messageInputComponent }}</div>
            <div class="active-chat-footer__send-icon" onclick="{{ sendMessage }}">&#10132;</div>
        </div>
    </div>

    <div class="empty-state">
        Choose a chat to start your conversation.
    </div>

    <!-- Image Chooser PopUp -->
    {{ imageChooserComponent }}

     <!-- Users Menu PopUp -->
    {{ usersMenuComponent }}
</div>
`;
