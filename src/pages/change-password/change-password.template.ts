export default `
<div class="profile change-password" data-id="{{ componentId }}">
    <section class="profile-form">
        <h3 class="profile-form__name">Change your password</h3>
        <form class="profile-form-table">
        <!--  FORM   -->
        {{ oldPasswordInput }}
        {{ newPasswordInput }}
        {{ confirmPasswordInput }}
        <!--  Buttons   -->
        <div class="profile-form-buttons">
        {{ saveButton }}
        {{ goBackButton }}
        </div>
    </form>
</section>`;
