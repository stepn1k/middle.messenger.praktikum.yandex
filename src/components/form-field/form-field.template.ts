export default `
<div class="form-field-container form-field-container_type-{{ viewType }}" data-id="{{ componentId }}">
    <div class="form-field">
        <label class="form-field__label" for="{{ id }}"> {{ labelText }} </label>
        <input class="form-field__value" required value="{{ value }}" placeholder="{{ placeholder }}" id="{{ id }}" type="{{ type }}" name="{{ id }}">
     </div>
     <div class="form-field__error-message"></div>
 </div>
`;
