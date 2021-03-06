export default `
<div class="messenger">
    <!-- List -->
    <section class="messenger-list">
        <header class="messenger-list-header">
           <!-- Add chat  -->
           <div class="messenger-list-header__add-chat">
              {{ addChatComponent }}
           </div>
           <!-- Go to profile -->
           <div class="messenger-list-header__profile-link" onclick="{{ goToProfile }}">
              <a>Profile</a> <span>&#10148;</span>
           </div>
        </header>
        <!-- Chat List -->
        <div class="messenger-list-chats">
            {{ chatsList }}
        </div>
    </section>
    <!--  Active Chat   -->
     <div class="messenger-chat">
        {{ activeChatComponent }}
    </div>
</div>
`;
