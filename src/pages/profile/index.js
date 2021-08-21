import { ProfilePageTemplate, ChangePasswordPageTemplate } from './profile.template';
import { ButtonComponent } from '../../components/button';
import { LineFormFieldComponent } from '../../components/line-form-field';
import { DividerComponent } from '../../components/divider';

export const ProfilePage = (props = {}) => {
    // temporary object
    const user = {
        email: 'example@yandex.by',
        login: 'exampleLogin',
        first_name: 'Stepan',
        second_name: 'Kalutsky',
        username: 'Stepan K.',
        phone_number: '+37529999999'
    }

    let pageTemplate;
    let buttonsTemplate;

    switch (props.type) {
        case 'profile':
            pageTemplate = ProfilePageTemplate;
            buttonsTemplate = `
            <button-component props="'{ label: 'Edit', link: '/edit_profile', type: 'basic' }'"/>
            <divider-component />
            <button-component props="'{ label: 'Change Password', link: '/change_password', type: 'basic' }'"/>
            <divider-component />
            <button-component props="'{ label: 'Logout', link: '/sign_in', type: 'basic', color: 'red' }'"/>`
            break;
        case 'changePassword':
            pageTemplate = ChangePasswordPageTemplate;
            buttonsTemplate = `
           <button-component props="'{ label: 'Save', link: '/profile', type: 'raised' }'"/>
           <button-component props="'{ label: 'Go Back', link: '/profile', type: 'basic' }'"/>`
           break;
        case 'editProfile':
            pageTemplate = ProfilePageTemplate;
            buttonsTemplate = `
           <button-component props="'{ label: 'Save', link: '/profile', type: 'raised' }'"/>
            <button-component props="'{ label: 'Go Back', link: '/profile', type: 'basic' }'"/>
        `
    }

    return {
        template: pageTemplate,
        context: { user, ...props, buttonsTemplate },
        declaredComponents: [ButtonComponent, LineFormFieldComponent, DividerComponent]
    }
};