export default `
<div class="profile change-password" data-id="{{ componentId }}">
  <section class="profile-form">
    <h3 class="profile-form__name">Change your password</h3>
    <!--  FORM   -->
    <form class="profile-form-table">
      <div class="profile-form-table__inputs">
        {{ oldPasswordInput }}
        {{ newPasswordInput }}
        {{ confirmPasswordInput }}
      </div>
      <div class="profile-form-table__info-message"></div>
      <!--  Buttons   -->
      <div class="profile-form-table__buttons">
        {{ saveButton }}
        {{ goBackButton }}
      </div>
    </form>
  </section>

<!--  ASIDE  -->
{{ backAside }}
</div>
`;
