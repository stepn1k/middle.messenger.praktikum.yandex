export const EmailValidator = (value: string): null | { validatorMessage: string } => {
  const regExp = /^[\w\d\S\-+\\]{1,40}[@][\w]{1,20}.[\w]{2,10}$/;
  const validatorMessage = 'Invalid email format.';
  const isValid = regExp.test(value);
  return isValid ? null : { validatorMessage };
};

export const LoginValidator = (value: string): null | { validatorMessage: string } => {
  const regExp = /^[a-zA-z\d\-_]{3,20}$/;
  const containsLetter = /[a-zA-Z]+/;
  const validatorMessage = 'Invalid login format.';
  const isValid = regExp.test(value) && containsLetter.test(value);
  return isValid ? null : { validatorMessage };
};

export const NameValidator = (value: string): null | { validatorMessage: string } => {
  const regExp = /^[А-ЯA-Z][a-zа-я-]{1,30}$/;
  const validatorMessage = 'The name must begin with a capital letter. Only letters are allowed.';
  const isValid = regExp.test(value);
  return isValid ? null : { validatorMessage };
};

export const NotEmptyValidator = (value: string): null | { validatorMessage: string } => {
  const validatorMessage = 'This field is required.';
  const isValid = value.trim().length > 0;
  return isValid ? null : { validatorMessage };
};

export const PasswordValidator = (value: string): null | { validatorMessage: string } => {
  const regExp = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,39})\S$/;
  const validatorMessage = 'Password has a minimum of 8 characters and a maximum of 40, at least 1 uppercase letter, 1 lowercase letter and a number.';
  const isValid = regExp.test(value);
  return isValid ? null : { validatorMessage };
};

export const PhoneValidator = (value: string): null | { validatorMessage: string } => {
  const regExp = /^([+]?[\d]{10,15})$/;
  const validatorMessage = 'Invalid phone format.';
  const isValid = regExp.test(value);
  return isValid ? null : { validatorMessage };
};
