import Block from '../../../core/block';
import AvatarTemplate from './avatar.template';

export interface AvatarProps {
  clickable: boolean;
  src: string;
  events?: Record<string, (event: Event) => void>;
}

export interface AvatarContext {
  className: string;
  imageSource: string;
  events?: Record<string, (event: Event) => void>;
}

export default class Avatar extends Block {
  private static baseImageUrl = 'https://ya-praktikum.tech/api/v2/resources';

  private static baseImageSource = '/cd3d988d-e13d-4c52-96a4-122c24d1b1f0/094ef3eb-a813-4d55-8086-99eb46e919ff_FjvGm9YyWS8.jpg';

  constructor(props: AvatarProps) {
    const context: AvatarContext = {
      events: props.events,
      imageSource: Avatar.baseImageUrl + (props.src ? props.src : Avatar.baseImageSource),
      className: props.clickable ? 'clickable' : 'disabled',
    };
    super(context, AvatarTemplate);
  }

  componentDidUpdate(): boolean {
    this.props.imageSource = Avatar.baseImageUrl + this.props.src;
    return true;
  }
}
