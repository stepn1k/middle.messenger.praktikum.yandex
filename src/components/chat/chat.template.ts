export default `
<div class="chat" data-id="{{ componentId }}" >
   <div class="chat-image">
        <!--  Temporary img   -->
        <img src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png">
   </div>
   <div class="chat-body">
        <h3 class="chat-body__author">{{ author }}</h3>
        <p class="chat-body__last-message">{{ lastMessage }}</p>
   </div>
   <div class="chat-info">
       <div class="chat-info__time">{{ time }}</div>
       <div class="chat-info__badge">{{ newMessagesCount }}</div>
   </div>
</div>
`;
