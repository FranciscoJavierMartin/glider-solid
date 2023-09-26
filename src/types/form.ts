export type SubmitFormEvent = Event & {
  submitter: HTMLElement;
} & {
  currentTarget: HTMLFormElement;
  target: Element;
};


export type GliderInputEvent = InputEvent & {
  currentTarget: HTMLInputElement;
  target: Element;
}