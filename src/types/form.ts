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

export type RegisterForm = {
  fullName: string;
  nickName: string;
  email: string;
  password: string;
  avatar: string;
  passwordConfirmation: string;
};

export type SubmitCallback = (f: any) => void;
