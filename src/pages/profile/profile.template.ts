// profile view
export const ProfileViewTemplate = `
<div class="profile profile_view" data-id="{{ componentId }}">
    <section class="profile-form">
        {{ avatar }}
        <h3 class="profile-form__name">Profile</h3>
        <form class="profile-form-table">
            <!--  FORM   -->
            {{ emailInput }}
            {{ loginInput }}
            {{ firstNameInput }}
            {{ secondNameInput }}
            {{ usernameInput }}
            {{ phoneInput }}
        <!--  Buttons   -->
        <div class="profile-form-buttons">
            {{ editButton }}
            <div class="divider"></div>
            {{ changePasswordButton }}
            <div class="divider"></div>
            {{ logoutButton }}
        </div>
    </form>

<!-- ASIDE  -->
{{ backAside }}

</section>`;

// profile edit
export const ProfileEditTemplate = `
<div class="profile profile_edit" data-id="{{ componentId }}">
    <section class="profile-form">
        {{ avatar }}
        <h3 class="profile-form__name">Change your personal data</h3>
        <form class="profile-form-table">
            <!--  FORM   -->
            {{ emailInput }}
            {{ loginInput }}
            {{ firstNameInput }}
            {{ secondNameInput }}
            {{ usernameInput }}
            {{ phoneInput }}
        <!--  Buttons   -->
        <div class="profile-form__info-block"></div>
        <div class="profile-form-buttons">
            {{ saveButton }}
            {{ goBackButton }}
        </div>
    </form>

<!-- ASIDE  -->
{{ backAside }}

<!-- File Chooser -->
{{ imageChooser }}
</section>`;
