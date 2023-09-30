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
type ValidatorConfig = { element: HTMLInputElement; validators: Validator[] };

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

const niceName = (text: string): string => {
  return text
    .split(/(?=[A-Z])/)
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(' ');
};

export const requiredValidator: Validator = (element: HTMLInputElement) => {
  return element.value.length === 0
    ? `${niceName(element.name)} is required`
    : '';
};

export const minLengthValidator: Validator = (
  element: HTMLInputElement,
  minLength: number = 7
) => {
  return element.value.length === 0 || element.value.length > minLength
    ? ''
    : `${niceName(element.name)} should be more than ${minLength} characters`;
};

export const maxLengthValidator: Validator = (
  element: HTMLInputElement,
  maxLength: number = 7
): string => {
  return !(element.value.length === 0 || element.value.length < maxLength)
    ? `${niceName(element.name)} should be less than ${maxLength} characters`
    : '';
};

export const firstUppercaseLetter: Validator = (element: HTMLInputElement) => {
  const { value } = element;

  return !value.length
    ? ''
    : value[0] !== value[0].toLocaleUpperCase()
    ? `${niceName(element.name)} first letter should be uppercased`
    : '';
};

const useForm = <T extends Form>(initialForm: T) => {
  const [form, setForm] = createStore<T>(initialForm);
  const [errors, setErrors] = createStore<FormErrors>();
  const validatorFields: { [key: string]: ValidatorConfig } = {};

  const handleInput = (e: GliderInputEvent): void => {
    const { name, value } = e.currentTarget;
    setForm(name as any, value as any);
  };

  const submitForm =
    (submitCallback: SubmitCallback<T>) => (e: SubmitFormEvent) => {
      e.preventDefault();

      for (const field in validatorFields) {
        checkValidity(validatorFields[field])();
      }

      submitCallback(form);
    };

  const validate = (ref: HTMLInputElement, accessor: Accessor<Validator[]>) => {
    const validators = accessor() || [];
    let config: ValidatorConfig;
    validatorFields[ref.name] = config = { element: ref, validators };

    ref.onblur = checkValidity(config);
  };

  const checkValidity =
    ({ element, validators }: ValidatorConfig) =>
    () => {
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
