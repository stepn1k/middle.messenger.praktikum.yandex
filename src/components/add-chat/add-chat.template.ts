export default `<div class="add-chat-component" data-id="{{ componentId }}">
    <span class="add-chat-component__button" onclick="{{ openAddChatForm }}">
        <i class="fas fa-comment-medical"></i> Create Chat
    </span>
    <div class="add-chat-component-form">
        <i class="fas fa-angle-left" onclick="{{ closeAddChatForm }}"></i>
        <input class="add-chat-component-form__input" placeholder="Chat name...">
    </div>
</div>
`;
