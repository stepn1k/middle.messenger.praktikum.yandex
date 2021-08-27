export default `
<div class="sign-in">
    <form class="sign-in-form">
        <h2 class="sign-in-form__title">{{ header }}</h2>
        <div class="sign-in-form-inputs">
          <FOR_STRUCTURE ARRAY="formArray">
              <form-field-component props="{{ formArray.INDEX }}"/>
          </FOR_STRUCTURE>
        </div>
         <div class="sign-in-form-buttons">
          <FOR_STRUCTURE ARRAY="buttons">
              <button-component props="{{ buttons.INDEX }}"/>
          </FOR_STRUCTURE>
        </div>
    </form>   
</div>`;
