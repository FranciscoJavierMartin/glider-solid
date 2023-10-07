import { createStore } from 'solid-js/store';
import { GliderInputEvent, MessengerForm } from '../types/form';
import { useAuthState } from '../context/auth';
import { useUIDispatch } from '../context/ui';
import { createSignal } from 'solid-js';
import { createGlide } from '../api/glide';
import { FirebaseError } from 'firebase/app';
import { Glide } from '../types/glide';

const useMessenger = () => {
  const { isAuthenticated, user } = useAuthState()!;
  const { addSnackbar } = useUIDispatch();
  const [isLoading, setIsLoading] = createSignal<boolean>(false);
  const [form, setForm] = createStore<MessengerForm>({ content: '' });

  const handleInput = (e: GliderInputEvent) => {
    const { name, value } = e.currentTarget;
    setForm(name, value);
  };

  const handleSubmit = async () => {
    if (isAuthenticated) {
      setIsLoading(true);

      const glide = {
        ...form,
        uid: user!.uid,
      };

      try {
        const newGlide = await createGlide(glide);
        setForm({ content: '' });
        return newGlide;
      } catch (error) {
        const message = (error as FirebaseError).message;
        addSnackbar({ message, type: 'error' });
      } finally {
        setIsLoading(false);
      }
    } else {
      addSnackbar({ message: 'You are not authenticated', type: 'error' });
    }
  };

  return { handleInput, handleSubmit, form, isLoading };
};

export default useMessenger;
