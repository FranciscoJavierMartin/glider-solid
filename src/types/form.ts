export type SubmitFormEvent = Event & {
  submitter: HTMLElement;
} & {
  currentTarget: HTMLFormElement;
  target: Element;
};

export type GliderInputEvent = InputEvent & {
  currentTarget: HTMLInputElement;
  target: Element;
};

export type Form = { [key: string]: string };
export type FormErrors = { [key: string]: string[] };

export type AuthForm = {
  email: string;
  password: string;
} & Form;

export type RegisterForm = {
  fullName: string;
  nickName: string;
  email: string;
  password: string;
  avatar: string;
  passwordConfirmation: string;
} & AuthForm;

export type SubmitCallback<T extends Form> = (f: T) => void;
