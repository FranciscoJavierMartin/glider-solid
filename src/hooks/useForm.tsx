import { createStore } from 'solid-js/store';
import {
  GliderInputEvent,
  RegisterForm,
  SubmitCallback,
  SubmitFormEvent,
} from '../types/form';

const useForm = (initialForm: RegisterForm) => {
  const [form, setForm] = createStore<RegisterForm>(initialForm);

  const handleInput = (e: GliderInputEvent): void => {
    const { name, value } = e.currentTarget;
    setForm(name as keyof RegisterForm, value);
  };

  const submitForm =
    (submitCallback: SubmitCallback) => (e: SubmitFormEvent) => {
      e.preventDefault();
      submitCallback(form);
    };

  return { handleInput, submitForm };
};

export default useForm;
