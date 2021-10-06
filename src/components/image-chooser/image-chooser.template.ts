export default `
<div class="image-chooser-component" data-id="{{ componentId }}">
    <section class="image-chooser">
        <h3 class="image-chooser__title">Upload avatar</h3>
        <input class="image-chooser__input" type="file">
        <img class="image-chooser__preview" src="#" alt="avatar-image">
        {{ chooseButton }}
        <div class="image-chooser__error-block">Error</div>
        {{ changeButton }}
    </section>
</div>
`;
