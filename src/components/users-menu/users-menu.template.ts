export default `
<div class="users-menu-component-container" data-id="{{ componentId }}">
    <div class="users-menu-component">
        <h4 class="users-menu-component__header">User Management</h4>
        <div class="users-menu-component-add-user">
            <input class="users-menu-component-add-user__input" placeholder="Add user...">
        </div>
        <div class="divider"></div>
        <div class="users-menu-component__list">{{ userListComponent }}</div>
    </div>
</div>
`;
