import { Accessor } from 'solid-js';
import { createStore } from 'solid-js/store';
import {
  Form,
  GliderInputEvent,
  SubmitCallback,
  SubmitFormEvent,
} from '../types/form';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      validate: Validator[];
    }
  }
}

type Validator = (element: HTMLInputElement, ...rest: any[]) => string;

export const maxLengthValidator: Validator = (
  element: HTMLInputElement,
  maxLength: number = 7
): string => {
  return !(element.value.length === 0 || element.value.length < maxLength)
    ? `${element.name} should be less than ${maxLength} characters`
    : '';
};

export const firstUppercaseLetter: Validator = (element: HTMLInputElement) => {
  const { value } = element;

  return value.length
    ? ''
    : value[0] !== value[0].toLocaleUpperCase()
    ? `${element.name} first letter should be uppercased`
    : '';
};

const useForm = <T extends Form>(initialForm: T) => {
  const [form, setForm] = createStore<T>(initialForm);
  const [errors, setErrors] = createStore<Form>();

  const handleInput = (e: GliderInputEvent): void => {
    const { name, value } = e.currentTarget;
    setForm(name as any, value as any);
  };

  const submitForm =
    (submitCallback: SubmitCallback<T>) => (e: SubmitFormEvent) => {
      e.preventDefault();
      submitCallback(form);
    };

  const validate = (ref: HTMLInputElement, accessor: Accessor<Validator[]>) => {
    const validators = accessor() || [];

    ref.onblur = checkValidity(ref, validators);
  };

  const checkValidity =
    (element: HTMLInputElement, validators: Validator[]) => () => {
      for (const validator of validators) {
        const message: string = maxLengthValidator(element, 10);

        if (!message) {
          setErrors(element.name, message);
        } else {
          setErrors(element.name, '');
        }
      }
    };

  return { handleInput, submitForm, validate };
};

export default useForm;
