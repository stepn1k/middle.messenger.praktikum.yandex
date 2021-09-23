// profile view
export const ProfileViewTemplate = `
<div class="profile profile_view" data-id="{{ componentId }}">
    <section class="profile-form">
        <div class="profile-form-avatar">
            <div class="profile-form-avatar__image"> / Photo / </div>
            <input type="file" id="avatar" class="profile-form-avatar__input" disabled>
        </div>
        <h3 class="profile-form__name">{{ header }}</h3>
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

// profile view
export const ProfileEditTemplate = `
<div class="profile profile_edit" data-id="{{ componentId }}">
    <section class="profile-form">
        <div class="profile-form-avatar">
            <div class="profile-form-avatar__image"> / Photo / </div>
            <input type="file" id="avatar" class="profile-form-avatar__input" disabled>
        </div>
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
        <div class="profile-form-buttons">
            {{ saveButton }}
            {{ goBackButton }}
        </div>
    </form>

<!-- ASIDE  -->
{{ backAside }}
</section>`;
