import MessengerTemplate from './messenger.template';
import { DividerComponent } from '../../components/divider';

export const MessengerPage = (props) => {
    const chats = [
        { name: 'Alina', message: 'Hello Stepan!' },
        { name: 'Daniel', message: 'How are you?' },
        { name: 'Gerald', message: 'We will start in 15 minutes' },
        { name: 'Valentin', message: 'gif' },
    ];

    return {
        template: MessengerTemplate,
        context: {chats, ...props},
        declaredComponents: [DividerComponent]
    }
};
