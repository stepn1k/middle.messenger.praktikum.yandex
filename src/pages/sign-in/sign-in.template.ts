export default `
<div class="sign-in">
    <form class="sign-in-form">
        <h2 class="sign-in-form__title">Log in to your account</h2>
        <div class="sign-in-form-inputs">
          {{ loginInput }}
          {{ passwordInput }}
        </div>
         <div class="sign-in-form-buttons">
          {{ loginButton }}
          {{ createAccountButton }}
        </div>
    </form>
</div>`;
