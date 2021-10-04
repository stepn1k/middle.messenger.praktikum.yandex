export default `
<div class="message message_{{ theme }}" data-id="{{ componentId }}">
   <h4 class="message__author">{{ author }}</h4>
   <p class="message__text">{{ content }} <span class="message__time">{{ time }}</span></p>
</div>
`;
