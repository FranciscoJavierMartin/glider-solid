import { createStore } from 'solid-js/store';
import { GliderInputEvent, MessengerForm } from '../types/form';

const useMessenger = () => {
  const [form, setForm] = createStore<MessengerForm>({ content: '' });

  const handleInput = (e: GliderInputEvent) => {
    const { name, value } = e.currentTarget;
    setForm(name, value);
  };

  const handleSubmit = () => {
    const glide = {
      ...form
    }
  };

  return { handleInput, handleSubmit };
};

export default useMessenger;
