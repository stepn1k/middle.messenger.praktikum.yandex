export interface SignUpBodyRequest {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  display_name?: string;
}

export interface SignInBodyRequest {
  login: string;
  password: string;
}
