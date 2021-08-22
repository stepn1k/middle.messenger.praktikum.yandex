export default `
<div class="messenger">
    <!-- List -->
    <div class="messenger-list">
        <div class="messenger-list-header">
            <!--  Profile -->
            <a class="messenger-list-header__profile" href="/profile">Profile &#10148;</a>
            <!-- Quick Search -->
            <input class="messenger-list-header__search" placeholder="Quick Search...">
        </div>
        <divider-component />
        <!-- Chats -->
        <div class="messenger-list-body">
          <FOR_STRUCTURE ARRAY="chats">
            <!-- Chat -->
            <div class="messenger-list-body-chat">
                <!-- Avatar -->
                <div class="messenger-list-body-chat-avatar"></div>
                <div class="messenger-list-body-chat-content">
                     <!--  Username  -->
                    <div class="messenger-list-body-chat-content__username">{{ chats.INDEX.name }}</div>
                     <!--  Message  -->
                    <div class="messenger-list-body-chat-content__last-message">{{ chats.INDEX.message }}</div>
                </div>
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
            <input placeholder="Message..." class="messenger-chat-footer__input" name="message" id="message" type="text">
            <div class="messenger-chat-footer__send"></div>
         </div>
    </div>
</div>
`;