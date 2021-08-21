export default `
<div class="messenger">
    <!-- List -->
    <div class="messenger-list">
        <div class="messenger-list-header">
            <a href="/profile" class="messenger-list-header__profile">Profile ></a>
            <input class="messenger-list-header__search" placeholder="Quick Search...">
        </div>
        <divider-component />
        <div class="messenger-list-body">
        
          <FOR_STRUCTURE ARRAY="chats">
            <div class="messenger-list-body-chat">
                <div class="messenger-list-body-chat__username">{{ chats.INDEX.name }}</div>
                <div class="messenger-list-body-chat__last-message">{{ chats.INDEX.message }}</div>
            </div>
            <divider-component />
          </FOR_STRUCTURE>
          
        </div>
    </div>
    <!-- Chat -->
    <div class="messenger-chat">
        <!--  Chat Header  -->
        <div class="messenger-chat-header">
            <div class="messenger-chat-header__user">Stepan</div>
        </div>
        <divider-component />
        <!--  Chat Body  -->
        <div class="messenger-chat-body">
            Chat will be here.
        </div>
        <divider-component />
        <!--  Chat Footer  -->
        <div class="messenger-chat-footer">
            <input placeholder="Message..." class="messenger-chat-footer__input">
            <div class="messenger-chat-footer__send"></div>
         </div>
    </div>
</div>
`;