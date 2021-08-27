// profile
export default `
<div class="profile {{type}}">
    <section class="profile-form">
        <div class="profile-form-avatar">
            <div class="profile-form-avatar__image"> / Photo / </div>
            <input type="file" id="avatar" class="profile-form-avatar__input">
        </div>
        <h3 class="profile-form__name">{{ header }}</h3>
        <form class="profile-form-table">
        <!--  FORM   -->
          <FOR_STRUCTURE ARRAY="formArray">
              <line-form-field-component props="{{ formArray.INDEX }}"/>
              <divider-component />
          </FOR_STRUCTURE>
        <!--  Buttons   -->
        <div class="profile-form-buttons">
           <FOR_STRUCTURE ARRAY="buttons">
              <button-component props="{{ buttons.INDEX }}" />
              <divider-component />
           </FOR_STRUCTURE>
        </div>
    </form>
</section>`;
