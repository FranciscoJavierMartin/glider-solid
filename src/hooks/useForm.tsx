import { Accessor, For, ParentComponent, Show } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import {
  Form,
  FormErrors,
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

export const FormError: ParentComponent = (props) => {
  const errors = () => (props.children as string[]) || [];
  return (
    <Show when={errors().length > 0}>
      <div class='flex-it grow text-xs bg-red-400 text-white p-3 pl-3 mt-1 rounded-md'>
        <For each={errors()}>{(error) => <div>{error}</div>}</For>
      </div>
    </Show>
  );
};

export const requiredValidator: Validator = (element: HTMLInputElement) => {
  return element.value.length === 0 ? `${element.name} is required` : '';
};

export const minLengthValidator: Validator = (
  element: HTMLInputElement,
  minLength: number = 7
) => {
  return element.value.length === 0 || element.value.length > minLength
    ? ''
    : `${element.name} should be more than ${minLength} characters`;
};

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

  return !value.length
    ? ''
    : value[0] !== value[0].toLocaleUpperCase()
    ? `${element.name} first letter should be uppercased`
    : '';
};

const useForm = <T extends Form>(initialForm: T) => {
  const [form, setForm] = createStore<T>(initialForm);
  const [errors, setErrors] = createStore<FormErrors>();

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
      setErrors(element.name, []);

      for (const validator of validators) {
        const message: string = validator(element, 10);

        if (!!message) {
          setErrors(
            produce((errors) => {
              errors[element.name].push(message);
            })
          );
        }
      }
    };

  return { handleInput, submitForm, validate, errors };
};

export default useForm;
