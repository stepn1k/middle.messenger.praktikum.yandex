export default `
<div class="users-menu-list-item-component" data-id="{{ componentId }}">
    <img class="users-menu-list-item__avatar" src="{{ user.imageSource }}">
    <div class="users-menu-list-item__fullname">
      <span class="first-name">{{ user.first_name }}</span>
      <span class="second_name">{{ user.second_name }}</span>
    </div>
    <div class="users-menu-list-item__login">
       ( {{ user.login }} )
    </div>
    <div class="users-menu-list-item__remove">
        <i class="fas fa-user-times"></i>
    </div>
</div>
`;
