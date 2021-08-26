import { ProfilePageTemplate } from './profile.template';
import { ButtonComponent } from '../../components/button';
import { LineFormFieldComponent } from '../../components/line-form-field';
import { DividerComponent } from '../../components/divider';
import { ComponentInterface } from '../../models/component.interface';

export const ProfilePage = (props: { type: 'changePassword' | 'profile' | 'editProfile' }): ComponentInterface => {
    // temporary object
    const user = {
        email: 'example@yandex.by',
        login: 'exampleLogin',
        first_name: 'Stepan',
        second_name: 'Kalutsky',
        username: 'Stepan K.',
        phone_number: '+37529999999'
    }

    const header = props.type === 'changePassword' ? 'Change your password' : user.first_name;
    const formArray = [];
    const buttons = [];

    switch (props.type) {
        // Profile Page
        case 'profile':
            formArray.push(
                `{ labelText: 'Email', value: '${user.email}', id: 'email', type: 'email' }`,
                `{ labelText: 'Login', value: '${user.login}', id: 'login', type: 'text' }`,
                `{ labelText: 'First Name', value: '${user.first_name}', id: 'first_name', type: 'text' }`,
                `{ labelText: 'Second Name', value: '${user.second_name}', id: 'second_name', type: 'text' }`,
                `{ labelText: 'Username', value: '${user.username}', id: 'display_name', type: 'text' }`,
                `{ labelText: 'Phone', value: '${user.phone_number}', id: 'phone', type: 'tel' }`
            );
            buttons.push(
                `{ label: 'Edit', link: '/edit_profile', type: 'basic' }`,
                `{ label: 'Change Password', link: '/change_password', type: 'basic' }`,
                `{ label: 'Logout', link: '/sign_in', type: 'basic', color: 'red' }`
            );
            break;
        // Change Password Page
        case 'changePassword':
            formArray.push(
                `{ labelText: 'Old password', value: '', id: 'oldPassword', type: 'password' }`,
                `{ labelText: 'New password', value: '', id: 'newPassword', type: 'password' }`,
                `{ labelText: 'Confirm New Password', value: '', id: 'confirmPassword', type: 'password' }`
            );
            buttons.push(
                `{ label: 'Save', link: '/profile', type: 'raised' }`,
                `{ label: 'Go Back', link: '/profile', type: 'basic' }`
            );
            break;
        // Edit Profile Page
        case 'editProfile':
            formArray.push(
                `{ labelText: 'Email', value: '${user.email}', id: 'email', type: 'email' }`,
                `{ labelText: 'Login', value: '${user.login}', id: 'login', type: 'text' }`,
                `{ labelText: 'First Name', value: '${user.first_name}', id: 'first_name', type: 'text' }`,
                `{ labelText: 'Second Name', value: '${user.second_name}', id: 'second_name', type: 'text' }`,
                `{ labelText: 'Username', value: '${user.username}', id: 'display_name', type: 'text' }`,
                `{ labelText: 'Phone', value: '${user.phone_number}', id: 'phone', type: 'tel' }`
            );
            buttons.push(
                `{ label: 'Save', link: '/profile', type: 'raised' }`,
                `{ label: 'Go Back', link: '/profile', type: 'basic' }`
            );
            break;
    }

    return {
        template: ProfilePageTemplate,
        context: {...props, buttons, formArray, header, user},
        declaredComponents: [ButtonComponent, LineFormFieldComponent, DividerComponent]
    }
};