export default `
<div class="sign-in">
    <form class="sign-in-form">
        <div class="sign-in-form__title">Log in to your account</div>
        <div class="sign-in-form-inputs">
            <!--  Login  -->
            <label for="login" class="sign-in-form-inputs__label">Login</label>
            <input required id="login" type="email" name="login" 
                   class="sign-in-form-inputs__input">
            <!--  Password  -->
            <label for="password" class="sign-in-form-inputs__label">Password</label>
            <input required minlength="6" id="password" type="password" name="password" 
                   class="sign-in-form-inputs__input">
        </div>
        <div class="sign-in-form-buttons">
             <!-- Sign in -->
            <button-component props="'{ label: 'Sign in', link: '/sign_in', type: 'raised' }'" />
             <!-- Create account -->
            <button-component props="'{ label: 'Create account', link: '/sign_up', type: 'basic' }'"/>
        </div>
    </form>
</div>`;