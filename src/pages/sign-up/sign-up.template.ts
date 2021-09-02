export default `
<div class="sign-in">
    <form class="sign-in-form">
        <h2 class="sign-in-form__title">Create an account</h2>
        <div class="sign-in-form-inputs">
          {{ emailInput }}
          {{ loginInput }}
          {{ firstNameInput }}
          {{ secondNameInput }}
          {{ phoneInput }}
          {{ passwordInput }}
          {{ confirmPasswordInput }}
        </div>
         <div class="sign-in-form-buttons">
          {{ createButton }}
          {{ backButton }}
        </div>
    </form>
</div>`;
