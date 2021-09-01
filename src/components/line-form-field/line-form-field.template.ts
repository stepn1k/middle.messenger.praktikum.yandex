export default `
 <div class="line-form-field" data-id="{{ componentId }}">
    <label for="{{id}}" class="line-form-field__label">{{ labelText }}</label>
    <input required value="{{value}}" id="{{id}}" type="{{type}}" name="{{id}}" class="line-form-field__value">
 </div>
`;
