// profile
export default `
<div class="profile {{ type }}">
    <section class="profile-form">
        <div class="profile-form-avatar">
            <div class="profile-form-avatar__image"> / Photo / </div>
            <input type="file" id="avatar" class="profile-form-avatar__input">
        </div>
        <h3 class="profile-form__name">{{ header }}</h3>
        <form class="profile-form-table">
        <!--  FORM   -->
         {{ formTemplate }}
        <!--  Buttons   -->
        <div class="profile-form-buttons">
         {{ buttonsTemplate }}
        </div>
    </form>
</section>`;
