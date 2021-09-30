export default `
<div class="messenger">
    <!-- List -->
    <section class="messenger-list">
        <header class="messenger-list-header">
         <div class="messenger-list-header-line">
               <!-- Add chat  -->
               <div class="messenger-list-header__add-chat">
                   {{ addChatComponent }}
                </div>
                <!-- Go to profile -->
               <div class="messenger-list-header__profile-link" onclick="{{ goToProfile }}">
                   <a>Profile</a> <span>&#10148;</span>
               </div>
         </div>
            <!-- Quick Search -->
           <input class="messenger-list-header__quick-search" placeholder="Quick search...">
        </header>
        <!-- Chat List -->
        <div class="messenger-list-chats">
            {{ chatsList }}
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
