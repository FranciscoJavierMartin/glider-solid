import { createStore } from 'solid-js/store';
import {
  Form,
  GliderInputEvent,
  SubmitCallback,
  SubmitFormEvent,
} from '../types/form';

const useForm = <T extends Form>(initialForm: T) => {
  const [form, setForm] = createStore<T>(initialForm);

  const handleInput = (e: GliderInputEvent): void => {
    const { name, value } = e.currentTarget;
    setForm(name as any, value as any);
  };

  const submitForm =
    (submitCallback: SubmitCallback<T>) => (e: SubmitFormEvent) => {
      e.preventDefault();
      submitCallback(form);
    };

  return { handleInput, submitForm };
};

export default useForm;
