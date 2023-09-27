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
      validate: number;
    }
  }
}

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

  const validate = (ref: HTMLInputElement, accessor: Accessor<number>) => {
    const value = accessor();

    ref.onblur = checkValidity(ref);
  };

  const maxLengthValidator = (
    element: HTMLInputElement,
    maxLength: number = 7
  ): string => {
    return !(element.value.length === 0 || element.value.length < maxLength)
      ? `${element.name} should be less than ${maxLength} characters`
      : '';
  };

  const checkValidity = (element: HTMLInputElement) => () => {
    const message: string = maxLengthValidator(element, 10);

    if (!message) {
      setErrors(element.name, message);
    } else {
      setErrors(element.name, '');
    }
  };

  return { handleInput, submitForm, validate };
};

export default useForm;
