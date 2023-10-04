import { createSignal } from 'solid-js';
import { FirebaseError } from 'firebase/app';
import { AuthType, authenticate } from '../api/auth';
import { AuthForm } from '../types/form';
import { useUIDispatch } from '../context/ui';

const useAuth = (authType: AuthType) => {
  const [isLoading, setIsLoading] = createSignal<boolean>(false);
  const { addSnackbar } = useUIDispatch();

  const authUser = async (form: AuthForm) => {
    setIsLoading(true);
    try {
      await authenticate(form, authType);
      addSnackbar({ message: 'Welcome to Glider', type: 'success' });
    } catch (error) {
      const message = (error as FirebaseError).message;
      addSnackbar({ message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return { authUser, isLoading };
};

export default useAuth;
