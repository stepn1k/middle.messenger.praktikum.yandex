export default `
<div class="chat" data-id="{{ componentId }}" >
   <div class="chat-image">
       <img src="{{ imageSource }}">
   </div>
   <div class="chat-body">
        <div class="chat-body-header">
            <h3 class="chat-body-header__title">{{ chatTitle }}</h3>
            <div class="chat-body-header__time">{{ time }}</div>
        </div>
        <div class="chat-body-footer">
             <p class="chat-body-footer__last-message">{{ lastMessage }}</p>
             <div class="chat-body-footer__badge {{ messagesCountClass }}">
                {{ newMessagesCount }}
             </div>
        </div>
    </div>
</div>
`;
