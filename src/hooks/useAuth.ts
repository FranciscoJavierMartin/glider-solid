import { createSignal } from 'solid-js';
import { AuthType, authenticate } from '../api/auth';
import { AuthForm } from '../types/form';
import { FirebaseError } from 'firebase/app';

const useAuth = (authType: AuthType) => {
  const [isLoading, setIsLoading] = createSignal<boolean>(false);

  const authUser = async (form: AuthForm) => {
    setIsLoading(true);
    try {
      await authenticate(form, authType);
    } catch (error) {
      const message = (error as FirebaseError).message;
      console.log(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { authUser, isLoading };
};

export default useAuth;
