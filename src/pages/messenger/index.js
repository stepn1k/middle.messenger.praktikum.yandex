import MessengerTemplate from './messenger.template';
import { DividerComponent } from '../../components/divider';

const chats = [
    { name: 'Alina', message: 'Hello Stepan!' },
    { name: 'Daniel', message: 'How are you?' },
    { name: 'Gerald', message: 'We will start in 15 minutes' },
    { name: 'Valentin', message: 'gif' },
];

export const MessengerPage = (props) => {
    return {
        template: MessengerTemplate,
        context: {...props, chats},
        declaredComponents: [DividerComponent]
    }
};
