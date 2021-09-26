export interface State {
  authState: AuthState;
}

export interface AuthState {
  user: User;
}

export interface User {
  id: string;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}
