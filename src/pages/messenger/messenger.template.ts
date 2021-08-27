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
                    <h4 class="messenger-list-body-chat-content__username">{{ chats.INDEX.name }}</h4>
                     <!--  Message  -->
                    <p class="messenger-list-body-chat-content__last-message">{{ chats.INDEX.message }}</p>
                </div>
            </div>
            <divider-component />
          </FOR_STRUCTURE>
         </div>
    </div>
    
    <!-- Chat -->
    <div class="messenger-chat">
        <!--  Chat Header  -->
        <h2 class="messenger-chat-header">
            <div class="messenger-chat-header__user">Stepan</div>
        </h2>
        <divider-component />
        <!--  Chat Body  -->
        <section class="messenger-chat-body">
            Chat will be here.
        </section>
        <divider-component />
        <!--  Chat Footer  -->
        <div class="messenger-chat-footer">
            <input placeholder="Message..." class="messenger-chat-footer__input" name="message" id="message" type="text">
            <div class="messenger-chat-footer__send"></div>
         </div>
    </div>
</div>
`;
