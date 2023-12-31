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

type Validator = (
  element: HTMLInputElement,
  ...rest: any[]
) => (form: Form) => string;
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

export const requiredValidator: Validator =
  (element: HTMLInputElement) =>
  (form: Form): string => {
    const { value, name } = element;

    return value.length === 0 ? `${niceName(name)} is required` : '';
  };

export const minLengthValidator: Validator =
  (element: HTMLInputElement, minLength: number = 7) =>
  (form: Form): string => {
    const { value, name } = element;

    return value.length === 0 || value.length > minLength
      ? ''
      : `${niceName(name)} should be more than ${minLength} characters`;
  };

export const maxLengthValidator: Validator =
  (element: HTMLInputElement, maxLength: number = 7) =>
  (form: Form): string => {
    const { value, name } = element;

    return !(value.length === 0 || value.length < maxLength)
      ? `${niceName(name)} should be less than ${maxLength} characters`
      : '';
  };

export const firstUppercaseLetter: Validator =
  (element: HTMLInputElement) =>
  (form: Form): string => {
    const { value, name } = element;

    return !value.length
      ? ''
      : value[0] !== value[0].toLocaleUpperCase()
      ? `${niceName(name)} first letter should be uppercased`
      : '';
  };

export const compareWith: Validator =
  (element: HTMLInputElement, fieldName: string) =>
  (form: Form): string => {
    const { value, name } = element;

    return !value
      ? ''
      : value !== form[fieldName]
      ? `${niceName(name)} should be same as ${niceName(fieldName)}`
      : '';
  };

const useForm = <T extends Form>(initialForm: T) => {
  const [form, setForm] = createStore<T>(initialForm);
  const [errors, setErrors] = createStore<FormErrors>();
  const validatorFields: { [key: string]: ValidatorConfig } = {};

  const isValid = (): boolean => {
    const keys = Object.keys(errors);
    return !!keys.length && !keys.some((errorKey) => !!errors[errorKey].length);
  };

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

      if (isValid()) {
        submitCallback(form);
      }
    };

  const validate = (ref: HTMLInputElement, accessor: Accessor<Validator[]>) => {
    const validators = accessor() || [];
    let config: ValidatorConfig;
    validatorFields[ref.name] = config = { element: ref, validators };

    ref.onblur = checkValidity(config);

    ref.oninput = () => {
      if (errors[ref.name]) {
        checkValidity(config)();
      }
    };
  };

  const checkValidity =
    ({ element, validators }: ValidatorConfig) =>
    () => {
      setErrors(element.name, []);

      for (const validator of validators) {
        const message: string = validator(element)(form);

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
