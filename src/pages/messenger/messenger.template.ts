export default `
<div class="messenger">
    <!-- List -->
    <section class="messenger-list">
        <header class="messenger-list-header">
           <div class="messenger-list-header__profile-link" onclick="{{ goToProfile }}">
             <a>Profile</a> <span>&#10148;</span>
           </div>
           <input class="messenger-list-header__quick-search" placeholder="Quick search...">
        </header>
        <div class="messenger-list-chats">
        {{ chats }}
        </div>
    </section>
    <!--  Active Chat  -->
    <div class="messenger-active-chat">
        <div class="messenger-active-chat-header">
            <!--  temporary image  -->
            <img class="messenger-active-chat-header__image" src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png">
            <h2 class="messenger-active-chat-header__username">{{ activeChatUser }}</h2>
        </div>
            {{ messageList }}
        <div class="messenger-active-chat-footer">
            {{ messageInput }}
            <div class="messenger-active-chat-footer__send" onclick="{{ onSendMessage }}">&#10132;</div>
        </div>
    </div>
</div>
`;
