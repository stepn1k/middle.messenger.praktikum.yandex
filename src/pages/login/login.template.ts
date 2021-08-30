export default `
<div class="sign-in">
    <form class="sign-in-form">
        <h2 class="sign-in-form__title">{{ header }}</h2>
        <div class="sign-in-form-inputs">
          {{ formTemplate }}
        </div>
         <div class="sign-in-form-buttons">
          {{ buttonsTemplate }}
        </div>
    </form>
</div>`;
