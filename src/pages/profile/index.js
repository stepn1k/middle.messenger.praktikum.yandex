import ProfileTemplate from './profile.template';
import { ButtonComponent } from '../../components/button';
import { LineFormFieldComponent } from '../../components/line-form-field';
import { DividerComponent } from '../../components/divider';

export const ProfilePage = (props = null) => {
    // temporary object
    const user = {
        email: 'example@yandex.by',
        login: 'exampleLogin',
        first_name: 'Stepan',
        second_name: 'Kalutsky',
        username: 'Stepan K.',
        phone_number: '+37529999999'
    }
    return {
        template: ProfileTemplate,
        context: { user, ...props },
        declaredComponents: [ButtonComponent, LineFormFieldComponent, DividerComponent]
    }
};